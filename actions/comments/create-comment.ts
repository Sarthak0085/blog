"use server";

import { getBlogById } from "@/data/blog";
import { getCommentById } from "@/data/comment";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { CreateCommentSchema } from "@/schemas";
import { validateComment } from "@/validations";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const createComment = async (values: z.infer<typeof CreateCommentSchema>) => {
    try {
        const validatedData = validateComment(values);

        const { blogId, content, parentId } = validatedData;
        const user = await currentUser();

        if (!user || user.isBlocked === "BLOCK" || !user?.id) {
            throw new CustomError("Unauthorized. Please login to access this.", 403);
        }

        const existedBlog = await getBlogById(blogId);

        if (!existedBlog) {
            throw new CustomError("Blog not found", 404);
        }

        const isComment = await getCommentById(parentId as string);

        if (parentId && isComment) {
            const comment = await db.comment.create({
                data: {
                    userId: user?.id,
                    blogId: blogId,
                    content: content,
                    parentId: parentId,
                }
            });

            revalidatePath("/blogs");
            revalidatePath(`/blog/${existedBlog?.slug}`);

            return {
                success: "Commnet Added",
                data: comment
            };
        } else {
            const comment = await db.comment.create({
                data: {
                    userId: user?.id,
                    blogId: blogId,
                    content: content,
                },
            });

            revalidatePath("/blogs");
            revalidatePath(`/blog/${existedBlog?.slug}`);
            revalidatePath(`/${user?.id}/get-comments`);
            revalidatePath(`/admin/get-comments`);

            return {
                success: "Comment Added",
                data: comment
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
};
