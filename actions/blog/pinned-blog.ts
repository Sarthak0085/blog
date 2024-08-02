"use server";

import { getBlogById } from "@/data/blog";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { PinnedBlogSchema } from "@/schemas";
import { validatePinnedBlog } from "@/validations";
import * as z from "zod";

export const pinnedBlog = async (values: z.infer<typeof PinnedBlogSchema>) => {
    try {
        const validatedData = validatePinnedBlog(values);
        const { blogId } = validatedData;

        const blog = await getBlogById(blogId);

        if (!blog) {
            throw new CustomError("Blog not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        const isPinned = blog.isPinned;

        if (blog.userId === user?.id) {
            await db.blog.update({
                where: {
                    id: blogId
                },
                data: {
                    isPinned: !isPinned
                }
            });

            return {
                success: isPinned ? "Blog UnPinned Successfully" : "Blog Pinned Successfully"
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