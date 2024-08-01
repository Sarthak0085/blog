"use server";

import { getLikeById } from "@/data/like";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { PinnedLikeSchema } from "@/schemas";
import { validatePinnedLike } from "@/validations";
import * as z from "zod";

export const pinnedLike = async (values: z.infer<typeof PinnedLikeSchema>) => {
    try {
        const validatedData = validatePinnedLike(values);
        const { likeId } = validatedData;

        const like = await getLikeById(likeId);

        if (!like) {
            throw new CustomError("Like not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        const isPinned = like.isPinned;

        if (like.userId === user?.id) {
            await db.dislike.update({
                where: {
                    id: likeId
                },
                data: {
                    isPinned: !isPinned
                }
            });

            return {
                success: isPinned ? "Like UnPinned Successfully" : "Like Pinned Successfully"
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