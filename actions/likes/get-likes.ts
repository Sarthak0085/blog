"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db"

export const getAllLikes = async () => {
    try {
        const likes = await db.like.findMany({
            include: {
                blog: true,
                user: true,
            }
        });

        if (!likes) {
            throw new CustomError("No dislikes present", 404);
        }

        return {
            data: likes
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

export const getAllLikesByUserId = async () => {
    try {
        const user = await currentUser();
        if (!user || user.isBlocked === "BLOCK" || !user?.id) {
            throw new CustomError("Unauthorized! Please login to access this", 401);
        }
        const likes = await db.like.findMany({
            where: {
                userId: user?.id
            },
            include: {
                blog: true,
                user: true,
            }
        })
        if (!likes) {
            throw new CustomError("No dislikes present", 404);
        }

        return {
            data: likes
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