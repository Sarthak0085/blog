"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { ChangePasswordSchema } from "@/schemas";
import { validateChangePassword } from "@/validations";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const changePassword = async (values: z.infer<typeof ChangePasswordSchema>) => {
    try {
        const validatedData = validateChangePassword(values);
        const { oldPassword, newPassword } = validatedData;
        const user = await currentUser();

        if (!user) {
            throw new CustomError("Unauthorized. Please login to access this", 401);
        }

        const dbUser = await getUserById(user?.id as string);

        if (!dbUser) {
            throw new CustomError("Unauthorized. Please login to access this!", 401);
        }

        if (user?.OAuth) {
            throw new CustomError("Foridden. You are not allowed to do this!", 403);
        }

        if (dbUser.password && dbUser.password !== newPassword) {
            const isPasswordMatch = await bcrypt.compare(
                oldPassword,
                dbUser?.password
            );

            if (!isPasswordMatch) {
                throw new CustomError("Password doesn't match", 404);
            }

            const hashPassword = await bcrypt.hash(newPassword, 10);

            await db.user.update({
                where: {
                    id: dbUser?.id,
                },
                data: {
                    password: hashPassword,
                }
            });

            return {
                success: "Password updated successfully"
            }
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