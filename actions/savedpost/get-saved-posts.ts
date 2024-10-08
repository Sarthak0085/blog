"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db"

export const getAllSavedPosts = async () => {
    try {
        const savedPosts = await db.savedPost.findMany({
            include: {
                blog: true,
                user: true,
            },
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ],
        });
        if (!savedPosts) {
            throw new CustomError("No Saved Posts Present", 400);
        }

        return {
            data: savedPosts
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

export const getAllSavedPostsByUserId = async (userId: string) => {
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

        const savedPosts = await db.savedPost.findMany({
            where: {
                userId: user?.id
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
        if (!savedPosts) {
            throw new CustomError("No Saved Posts Present", 404);
        }

        return {
            data: savedPosts
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