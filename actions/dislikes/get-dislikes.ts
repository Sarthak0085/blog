"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db"

export const getAllDislikes = async () => {
    try {
        const dislikes = await db.dislike.findMany({
            include: {
                blog: true,
                user: true,
            },
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ],
        })
        if (!dislikes) {
            throw new CustomError("No dislikes present", 404);
        }

        return {
            data: dislikes
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

export const getAllDislikesByUserId = async (userId: string) => {
    try {
        const existedUser = await getUserById(userId);

        if (!existedUser) {
            throw new CustomError("User Not Found", 404);
        }

        const user = await currentUser();
        if (!user || user.isBlocked === "BLOCK" || !user?.id) {
            throw new CustomError("Unauthorized! Please login to access this", 401);
        }

        if (existedUser?.id !== user?.id) {
            throw new CustomError("Forbidden. You are not allowed to do this", 403);
        }

        const dislikes = await db.dislike.findMany({
            where: {
                userId: userId
            },
            include: {
                blog: true,
                user: true,
            },
            orderBy: [
                {
                    isPinned: 'desc',
                },
                {
                    createdAt: 'desc',
                },
            ],
        })
        if (!dislikes) {
            throw new CustomError("No dislikes present", 404);
        }

        return {
            data: dislikes
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