"use server";

import { getBlogById } from "@/data/blog";
import { getDislikeByUserIdAndBlogId } from "@/data/dislike";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { DislikeSchema } from "@/schemas";
import { validateDislikeInput } from "@/validations/";
import * as z from "zod";

export const dislikeBlog = async (values: z.infer<typeof DislikeSchema>) => {
    try {
        const validatedData = validateDislikeInput(values);

        const { blogId } = validatedData;
        const user = await currentUser();

        if (!user || user.isBlocked || !user?.id) {
            throw new CustomError("Unauthorized. Please login to access this.", 403);
        }

        const existedBlog = await getBlogById(blogId);

        if (!existedBlog) {
            throw new CustomError("Blog not found", 404);
        }

        const isDisliked = await getDislikeByUserIdAndBlogId(user?.id, blogId);

        if (isDisliked) {
            await db.dislike.delete({
                where: {
                    userId_blogId: {
                        userId: user?.id,
                        blogId: blogId,
                    },
                },
            });

            return {
                success: "Dislike removed.",
            };
        } else {
            const dislike = await db.dislike.create({
                data: {
                    userId: user?.id,
                    blogId: blogId,
                },
            });

            if (!dislike) {
                throw new CustomError("An unexpected error occurred. Please try again later.", 500);
            }

            return {
                success: "You disliked this blog.",
                data: dislike
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
