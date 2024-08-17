"use server";

import { getCommentLikeByUserIdAndCommentId } from "@/data/comment";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { LikeCommentSchema } from "@/schemas";
import { validateLikeComment } from "@/validations";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const likeComment = async (values: z.infer<typeof LikeCommentSchema>) => {
    try {
        const validatedData = validateLikeComment(values);
        const { commentId } = validatedData;

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        const existedCommentLike = await getCommentLikeByUserIdAndCommentId(user?.id, commentId);

        if (existedCommentLike) {
            await db.commentLike.delete({
                where: {
                    id: existedCommentLike.id
                }
            });

            return {
                success: "Comment Liked Removed"
            }
        } else {
            await db.commentLike.create({
                data: {
                    userId: user?.id,
                    commentId,
                },
            });

            return {
                success: "Comment Liked Successfully"
            };
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