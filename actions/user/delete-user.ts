"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { DeleteUserSchema } from "@/schemas";
import { validateDeleteUser } from "@/validations";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const deleteUser = async (values: z.infer<typeof DeleteUserSchema>) => {
    try {
        const validateData = validateDeleteUser(values);

        const { userId } = validateData;

        const existedUser = await getUserById(userId);

        if (!existedUser) {
            throw new CustomError("User not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id) {
            throw new CustomError("UnAuthorized. Please login to access this", 401);
        }

        if (userId === user?.id || user?.role !== UserRole.ADMIN || existedUser?.role === UserRole.ADMIN) {
            throw new CustomError("Forbidden. You are not allowed to do this.", 403);
        }

        await db.user.delete({
            where: {
                id: userId
            }
        });

        revalidatePath("/admin/get-users");
        revalidatePath(`/${existedUser?.id}`);

        return {
            success: "User deleted successfully."
        }
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "An unexpected error occurred.",
            code: 500,
        };
    }
}