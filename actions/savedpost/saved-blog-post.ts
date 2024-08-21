"use server";

import { getBlogById } from "@/data/blog";
import { getFavouriteByUserIdAndBlogId } from "@/data/favourite";
import { getSavedPostByUserIdAndBlogId } from "@/data/savepost";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { SavedPostSchema } from "@/schemas";
import { validateSavedPost } from "@/validations";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const savedBlogPost = async (values: z.infer<typeof SavedPostSchema>) => {
    try {
        const validatedData = validateSavedPost(values);

        const { blogId } = validatedData;
        const user = await currentUser();

        if (!user || user.isBlocked === "BLOCK" || !user?.id) {
            throw new CustomError("Unauthorized. Please login to access this.", 403);
        }

        const existedBlog = await getBlogById(blogId);

        if (!existedBlog) {
            throw new CustomError("Blog not found", 404);
        }

        const isSaved = await getSavedPostByUserIdAndBlogId(user?.id, blogId);

        if (isSaved) {
            const savedPost = await db.savedPost.delete({
                where: {
                    userId_blogId: {
                        userId: user?.id,
                        blogId: blogId,
                    },
                },
            });

            if (!savedPost) {
                throw new CustomError("An unexpected error occurred. Please try again later.", 500);
            }

            revalidatePath(`/blogs`, "page");
            revalidatePath(`/blog/${existedBlog?.slug}`, "page")
            revalidatePath(`/${user?.id}/get-saved-posts`, "page");
            revalidatePath('/admin/get-saved-posts', "page");

            return {
                success: "Remove From Saved Posts.",
            };
        } else {
            const savedPost = await db.savedPost.create({
                data: {
                    userId: user?.id,
                    blogId: blogId,
                },
            });

            if (!savedPost) {
                throw new CustomError("An unexpected error occurred. Please try again later.", 500);
            }

            revalidatePath(`/blogs`, "page");
            revalidatePath(`/blog/${existedBlog?.slug}`, "page")
            revalidatePath(`/${user?.id}/get-saved-posts`, "page");
            revalidatePath('/admin/get-saved-posts', "page");

            return {
                success: "Add to Saved Post.",
                data: savedPost
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