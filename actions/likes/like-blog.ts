"use server";

import { getBlogById } from "@/data/blog";
import { getLikeByUserIdAndBlogId } from "@/data/like";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { LikeSchema } from "@/schemas";
import { validateLikeInput } from "@/validations";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const likeBlog = async (values: z.infer<typeof LikeSchema>) => {
    try {
        const validatedData = validateLikeInput(values);

        const { blogId } = validatedData;
        const user = await currentUser();

        if (!user || user.isBlocked === "BLOCK" || !user?.id) {
            throw new CustomError("Unauthorized. Please login to access this.", 403);
        }

        const existedBlog = await getBlogById(blogId);

        if (!existedBlog) {
            throw new CustomError("Blog not found", 404);
        }

        const isLiked = await getLikeByUserIdAndBlogId(user?.id, blogId);

        if (isLiked) {
            await db.like.delete({
                where: {
                    userId_blogId: {
                        userId: user?.id,
                        blogId: blogId,
                    },
                },
            });

            revalidatePath(`/blog/${existedBlog?.slug}`, "page")

            return {
                success: "Like removed.",
            };
        } else {
            const like = await db.like.create({
                data: {
                    userId: user?.id,
                    blogId: blogId,
                },
            });

            if (!like) {
                throw new CustomError("An unexpected error occurred. Please try again later.", 500);
            }

            revalidatePath(`/blog/${existedBlog?.slug}`, "page")

            return {
                success: "You liked this blog.",
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
