"use server";

import { getCommentById } from "@/data/comment";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { DeleteCommentSchema } from "@/schemas";
import { validateCommentDelete } from "@/validations";
import * as z from "zod";

export const deleteComment = async (values: z.infer<typeof DeleteCommentSchema>) => {
    try {
        const validatedData = validateCommentDelete(values);
        const { commentId } = validatedData;

        const comment = await getCommentById(commentId);

        if (!comment) {
            throw new CustomError("Comment not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        if (comment.userId === user?.id) {
            await db.comment.deleteMany({
                where: {
                    OR: [
                        { id: commentId },
                        { parentId: commentId },
                    ]
                }
            });

            return {
                success: "Comment Deleted Successfully"
            }
        }
        else {
            if (user?.role === "ADMIN") {
                await db.comment.deleteMany({
                    where: {
                        OR: [
                            { id: commentId },
                            { parentId: commentId },
                        ]
                    }
                });

                return {
                    success: "Comment deleted successfully"
                }
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