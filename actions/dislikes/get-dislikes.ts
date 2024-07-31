"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db"

export const getAllDislikes = async () => {
    try {
        const dislikes = await db.dislike.findMany({
            include: {
                blog: true,
                user: true,
            }
        })
        if (!dislikes) {
            return {
                error: "No Like Present"
            }
        }

        return {
            data: dislikes
        }
    } catch (error) {
        return {
            error: "Error while fetching categories."
        }
    }
}

export const getAllDislikesByUserId = async () => {
    try {
        const user = await currentUser();
        if (!user || user.isBlocked === "BLOCK" || !user?.id) {
            throw new CustomError("Unauthorized! Please login to access this", 401);
        }
        const dislikes = await db.dislike.findMany({
            where: {
                userId: user?.id
            },
            include: {
                blog: true,
                user: true,
            }
        })
        if (!dislikes) {
            return {
                error: "No Dislikes Present"
            }
        }

        return {
            data: dislikes
        }
    } catch (error) {
        return {
            error: "Error while fetching dislikes."
        }
    }
}