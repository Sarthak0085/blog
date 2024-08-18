"use server";

import { getCommentById } from "@/data/comment";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { PinnedCommentSchema } from "@/schemas";
import { validatePinnedComment } from "@/validations";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const pinnedComment = async (values: z.infer<typeof PinnedCommentSchema>) => {
    try {
        const validatedData = validatePinnedComment(values);
        const { commentId } = validatedData;
        console.log("commentId", commentId);

        if (!commentId) {
            throw new CustomError("Comment Id is empty", 400);
        }

        const comment = await getCommentById(commentId);

        if (!comment) {
            throw new CustomError("Comment not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        const isPinned = comment.isPinned;

        if (comment.userId === user?.id) {
            await db.comment.update({
                where: {
                    id: commentId
                },
                data: {
                    isPinned: !isPinned
                }
            });

            revalidatePath(`/${user?.id}/get-comments`);
            revalidatePath(`/admin/get-comments`);

            return {
                success: isPinned ? "Comment UnPinned Successfully" : "Comment Pinned Successfully"
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