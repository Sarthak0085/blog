"use server";

import CustomError from "@/lib/customError";
import { db } from "@/lib/db";

export const getAllUsers = async () => {
    try {
        const users = await db.user.findMany({});

        if (!users) {
            return {
                error: "Error while fetching users."
            }
        }

        return { data: users };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, error: "Could not fetch users." };
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new CustomError("User not found", 404);
        }

        return { data: user };
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

