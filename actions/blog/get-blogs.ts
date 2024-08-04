"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { BlogStatus } from "@prisma/client";

export const getAllBlogs = async () => {
    try {
        const blogs = await db.blog.findMany({
            include: {
                category: true,
                likes: true,
                comments: true,
                user: true,
                dislikes: true,
                favourites: true,
                savedPosts: true,
            },
            orderBy: [
                { isPinned: "desc" },
                { createdAt: "desc" },
            ]
        });

        if (!blogs) {
            throw new CustomError("Error While fetching blogs", 400);
        }

        return { data: blogs };
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "Error while fetching blogs",
            code: 500,
        };
    }
}

export const getBlogById = async (id: string) => {
    try {
        const blog = await db.blog.findUnique({
            where: {
                id: id
            },
            include: {
                category: true
            }
        });

        if (!blog) {
            throw new CustomError("Error while fetching blog", 402);
        }

        return {
            data: blog
        }
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "Error while fetching blogs",
            code: 500,
        };
    }
}


export const getAllPublishedBlogs = async () => {
    try {
        const blogs = await db.blog.findMany({
            where: {
                status: BlogStatus.PUBLISHED,
            },
            include: {
                category: true,
                likes: true,
                comments: true,
                user: true,
            },
        });

        if (!blogs) {
            throw new CustomError("Error While fetching blogs", 400);
        }

        return { success: true, blogs };
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "Error while fetching blogs",
            code: 500,
        };
    }
}

export const getAllDraftBlogsByUserId = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            throw new CustomError("UnAuthorized. Please login to access this.", 401);
        }
        const blogs = await db.blog.findMany({
            where: {
                status: BlogStatus.DRAFT,
                userId: user.id,
            },
            include: {
                category: true,
                likes: true,
                comments: true,
                user: true,
                dislikes: true,
                favourites: true,
                savedPosts: true,
            },
        });

        if (!blogs) {
            throw new CustomError("Error While fetching blogs", 400);
        }

        return { success: true, blogs };
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "Error while fetching blogs",
            code: 500,
        };
    }
}

export const getAllPublishedBlogsByUserId = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            throw new CustomError("UnAuthorized. Please login to access this.", 401);

        }
        const blogs = await db.blog.findMany({
            where: {
                status: BlogStatus.PUBLISHED,
                userId: user.id,
            },
            include: {
                category: true,
                likes: true,
                comments: true,
                user: true,
                dislikes: true,
                favourites: true,
                savedPosts: true,
            },
        });

        if (!blogs) {
            throw new CustomError("Error While fetching blogs", 400);
        }

        return { success: true, blogs };
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "Error while fetching blogs",
            code: 500,
        };
    }
}

export const getAllBlogsByUserId = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            throw new CustomError("UnAuthorized. Please login to access this.", 401);
        }
        const blogs = await db.blog.findMany({
            where: {
                userId: user.id,
            },
            include: {
                category: true,
                likes: true,
                comments: true,
                user: true,
                dislikes: true,
                favourites: true,
                savedPosts: true,
            },
        });

        if (!blogs) {
            throw new CustomError("Error While fetching blogs", 400);
        }

        return { success: true, blogs };
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "Error while fetching blogs",
            code: 500,
        };
    }
}

export const incrementViewCount = async (blogId: string) => {
    try {
        await db.blog.update({
            where: { id: blogId },
            data: {
                views: {
                    increment: 1,
                },
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Error incrementing view count:", error);
        return { success: false, error: "Could not increment view count." };
    }
};