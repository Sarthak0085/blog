"use server";

import { getBlogById } from "@/data/blog";
import { getFavouriteByUserIdAndBlogId } from "@/data/favourite";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { FavouriteSchema } from "@/schemas";
import { validateFavouriteInput } from "@/validations";
import * as z from "zod";

export const addOrRemoveToFavourite = async (values: z.infer<typeof FavouriteSchema>) => {
    try {
        const validatedData = validateFavouriteInput(values);

        const { blogId } = validatedData;
        const user = await currentUser();

        if (!user || user.isBlocked === "BLOCK" || !user?.id) {
            throw new CustomError("Unauthorized. Please login to access this.", 403);
        }

        const existedBlog = await getBlogById(blogId);

        if (!existedBlog) {
            throw new CustomError("Blog not found", 404);
        }

        const isFavourite = await getFavouriteByUserIdAndBlogId(user?.id, blogId);

        if (isFavourite) {
            await db.favourite.delete({
                where: {
                    userId_blogId: {
                        userId: user?.id,
                        blogId: blogId,
                    },
                },
            });

            return {
                success: "Removed from Favourite",
            };
        } else {
            const favourite = await db.favourite.create({
                data: {
                    userId: user?.id,
                    blogId: blogId,
                },
            });

            if (!favourite) {
                throw new CustomError("An unexpected error occurred. Please try again later.", 500);
            }

            return {
                success: "Added to Favourite.",
                data: favourite
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