"use server";

import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { BlogStatus } from "@prisma/client";

export const getBlogDetailsBySlug = async (slug: string) => {
    try {
        const blog = await db.blog.findUnique({
            where: {
                slug: slug,
                status: BlogStatus.PUBLISHED,
            },
            include: {
                user: true,
                category: true,
                likes: true,
                comments: {
                    include: {
                        user: true,
                    },
                },
                dislikes: true,
                favourites: true,
                savedPosts: true,
            }
        });

        if (!blog) {
            throw new CustomError("Something went wrong", 400);
        }

        return { data: blog };
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "Could not able fetch blog data.",
            code: 500,
        };
    }
}