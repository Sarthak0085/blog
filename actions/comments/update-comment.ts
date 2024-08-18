"use server";

import { getCommentById } from "@/data/comment";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { UpdateCommentSchema } from "@/schemas";
import { validateUpdateComment } from "@/validations";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const updateComment = async (
    values: z.infer<typeof UpdateCommentSchema>
) => {
    try {
        const validatedData = validateUpdateComment(values);
        const { id, parentId, content, blogId } = validatedData;

        const comment = await getCommentById(id);

        if (!comment) {
            throw new CustomError("Comment not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        if (comment.userId !== user?.id) {
            throw new CustomError("Forbidden. You are not allowed to do this!", 403);
        }

        await db.comment.update({
            where: {
                id,
            },
            data: {
                blogId: comment?.blogId || blogId,
                userId: comment?.userId || user?.id,
                content: content,
                parentId: comment?.parentId || parentId,
            },
        });

        revalidatePath(`/${user?.id}/get-comments`, "page");
        revalidatePath(`/admin/get-comments`, "page");

        return {
            success: "Comment Updated Successfully",
        };
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
};
