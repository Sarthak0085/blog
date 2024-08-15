"use server";

import { getCategoryByName } from "@/data/category";
import { getUserById } from "@/data/user";
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


export const getAllPublishedBlogs = async ({ category = "", tags = "", author = "", time = "", date = "", limit = 10, page = 1, orderby = "" }) => {
    try {
        const whereConditions: any = {
            status: BlogStatus.PUBLISHED,
        };

        const orderByConditions: any = {}

        if (orderby === "recommendation") {
            const user = await currentUser();

            if (user) {
                const getUserFavourites = await db.favourite.findMany({
                    where: {
                        userId: user?.id,
                    },
                    include: {
                        blog: true
                    }
                });

                console.log("favourites", getUserFavourites);

                const categoryIds = new Set(
                    getUserFavourites.map(favourite => favourite.blog.categoryId)
                );

                if (categoryIds.size > 0) {
                    whereConditions.categoryId = {
                        in: Array.from(categoryIds)
                    };
                }

            } else {
                orderByConditions.views = "desc";
            }
        }

        if (orderby === "most_recent") {
            orderByConditions.createdAt = "desc";
        }

        if (orderby === "most_oldest") {
            orderByConditions.createdAt = "asc";
        }

        if (category && category !== "") {
            const existedCategory = await getCategoryByName(category)
            if (!existedCategory) {
                throw new CustomError("Category Not Found", 404);
            }

            whereConditions.categoryId = existedCategory?.id;
        }

        if (tags && tags !== "") {
            const updatedTags = tags.split(",");
            whereConditions.tags = { hasSome: updatedTags };
        }

        if (author && author !== "") {
            whereConditions.userId = author;
        }

        if (time && time !== "") {
            const updatedTime = time.split(",");
            const [gte, lte] = updatedTime.map(v => parseInt(v));
            whereConditions.read_time = {
                gte: gte,
                lte: isNaN(lte) ? gte : lte,
            };
        }

        if (date && date !== "") {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            whereConditions.createdAt = { gte: startOfDay, lte: endOfDay };
        }

        const skip = (page - 1) * limit;

        const blogs = await db.blog.findMany({
            where: whereConditions,
            include: {
                category: true,
                favourites: true,
                savedPosts: true,
                likes: true,
                _count: {
                    select: {
                        likes: true
                    }
                },
                comments: true,
                user: true,
            },
            skip: skip,
            take: limit,
            orderBy: orderByConditions,
        });

        let sortedBlogs = [...blogs];

        if (orderby === "most_liked") {
            sortedBlogs = blogs.sort((a, b) => b._count.likes - a._count.likes);
        }


        if (!blogs) {
            throw new CustomError("Error While fetching blogs", 400);
        }

        return { success: true, blogs: sortedBlogs };
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

export const getAllRelatedPublishedBlogs = async ({ categoryId = "" }) => {
    try {
        const blogs = await db.blog.findMany({
            where: {
                categoryId: categoryId,
                status: BlogStatus.PUBLISHED,
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

export const getAllBlogsByUserId = async (userId: string) => {
    try {
        const user = await currentUser();
        const existedUser = await getUserById(userId);

        if (!existedUser) {
            throw new CustomError("User not found", 404);
        }

        if (!user || user.isBlocked === "BLOCK") {
            throw new CustomError("UnAuthorized. Please login to access this.", 401);
        }

        if (user?.id !== existedUser?.id) {
            throw new CustomError("Forbidden. You are not allowed for this", 403);
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
            orderBy: [
                {
                    isPinned: "desc"
                },
                {
                    createdAt: "desc"
                }
            ]
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