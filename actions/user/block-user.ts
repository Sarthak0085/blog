"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { BlockUserSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import * as z from "zod";

export const blockUnblockUser = async (values: z.infer<typeof BlockUserSchema>) => {
    const validatedFields = BlockUserSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid Fields"
        }
    }

    const { userId, isBlocked } = validatedFields.data;

    const existedUser = await getUserById(userId);

    if (!existedUser) {
        return {
            error: "User not found",
        }
    }

    const user = await currentUser();

    if (!user || !user?.id) {
        return {
            error: "UnAuthorized. Please login to access this"
        }
    }

    if (userId === user?.id || user?.role !== UserRole.ADMIN || existedUser?.role === UserRole.ADMIN) {
        return {
            error: "You are not allowed to this."
        }
    }

    await db.user.update({
        where: {
            id: userId
        },
        data: {
            isBlocked: isBlocked,
        }
    });

    return {
        success: "User blocked successfully."
    }
}