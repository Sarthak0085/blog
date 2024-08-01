"use server";

import { getDislikeById } from "@/data/dislike";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { PinnedDislikeSchema } from "@/schemas";
import { validatePinnedDislike } from "@/validations";
import * as z from "zod";

export const pinnedDislike = async (values: z.infer<typeof PinnedDislikeSchema>) => {
    try {
        const validatedData = validatePinnedDislike(values);
        const { dislikeId } = validatedData;

        const dislike = await getDislikeById(dislikeId);

        if (!dislike) {
            throw new CustomError("Dislike not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        const isPinned = dislike.isPinned;

        if (dislike.userId === user?.id) {
            await db.dislike.update({
                where: {
                    id: dislikeId
                },
                data: {
                    isPinned: !isPinned
                }
            });

            return {
                success: isPinned ? "Dislike UnPinned Successfully" : "Dislike Pinned Successfully"
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