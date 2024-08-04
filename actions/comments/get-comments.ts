"use server";

import { getBlogById } from "@/data/blog";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db"

export const getAllComments = async () => {
    try {
        const comments = await db.comment.findMany({
            include: {
                blog: true,
                user: true,
            },
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ],
        });

        if (!comments) {
            throw new CustomError("No comments present", 404);
        }

        return {
            data: comments
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

export const getAllCommentsByUserId = async (userId: string) => {
    try {
        const existedUser = await getUserById(userId);

        if (!existedUser) {
            throw new CustomError("User Not Found", 404);
        }

        const user = await currentUser();
        if (!user || user.isBlocked === "BLOCK" || !user?.id) {
            throw new CustomError("Unauthorized! Please login to access this", 401);
        }

        if (existedUser?.id !== user?.id) {
            throw new CustomError("Forbidden. You are not allowed to do this", 403);
        }

        const comments = await db.comment.findMany({
            where: {
                userId: user?.id
            },
            include: {
                blog: true,
                user: true,
            },
            orderBy: [
                {
                    isPinned: 'desc',
                },
                {
                    createdAt: 'desc',
                },
            ],
        })
        if (!comments) {
            throw new CustomError("No comments present", 404);
        }

        return {
            data: comments
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

export const getAllCommentsByBlogId = async (blogId: string) => {
    try {
        const blog = await getBlogById(blogId);

        if (!blog) {
            throw new CustomError("Blog Not Found", 404);
        }

        const comments = await db.comment.findMany({
            where: {
                blogId: blogId
            },
            include: {
                blog: true,
                user: true,
                likes: true,
            },
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ],
        })
        if (!comments) {
            throw new CustomError("No comments present", 404);
        }

        return {
            data: comments
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