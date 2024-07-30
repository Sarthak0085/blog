"use server";

import { getBlogBySlug, getBlogByTitle } from "@/data/blog";
import { getCategoryByName } from "@/data/category";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { AddBlogSchema } from "@/schemas";
import { uploadFilesToCloudinary } from "@/utils/helpers";
import { BlogStatus } from "@prisma/client";
import * as z from "zod";

export const createBlog = async (values: z.infer<typeof AddBlogSchema>) => {
    const validatedFields = AddBlogSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid Fields"
        }
    }

    const { title, slug, shortSummary, category, tags, status, content, image } = validatedFields.data;

    const user = await currentUser();

    if (!user || !user?.id) {
        return {
            error: "Unauthorized. Please login to do this"
        }
    }

    const existedBlogByTitle = await getBlogByTitle(title);
    const existedBlogBySlug = await getBlogBySlug(slug);


    if (existedBlogByTitle || existedBlogBySlug) {
        return {
            error: "Blog Already Exist"
        }
    }

    const existedCategory = await getCategoryByName(category);

    if (!existedCategory) {
        return {
            error: `Category ${category} doesn't exist.`
        }
    }

    const transformedTags = tags?.split(",").map(tag => tag.trim()).filter(tag => tag);

    const result = await uploadFilesToCloudinary(image, slug);

    if (!result) {
        return {
            error: "Error while uploading Image"
        }
    }

    console.log(values, transformedTags);

    const blog = await db.blog.create({
        data: {
            title,
            slug,
            categoryId: existedCategory.id,
            content,
            tags: transformedTags,
            shortSummary,
            status,
            imageUrl: result?.url,
            imagePublicId: result?.public_id,
            userId: user?.id as string
        }
    });

    if (!blog) {
        return {
            error: "Error while creating blog."
        }
    }

    return {
        success: "Blog Created Successfully.",
    }
}

export const getAllBlogs = async () => {
    try {
        const blogs = await db.blog.findMany({
            include: {
                category: true,
                likes: true,
                comments: true,
                user: true,
            },
        });

        if (!blogs) {
            return {
                error: "Error while fetching blogs."
            }
        }

        return { data: blogs };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { success: false, error: "Could not fetch blogs." };
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
            return {
                error: "Error while fetching blogs."
            }
        }

        return { success: true, blogs };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { success: false, error: "Could not fetch blogs." };
    }
}

export const getAllDraftBlogsByUserId = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return {
                error: "UnAuthorized. Please login to access this."
            }
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
            },
        });

        if (!blogs) {
            return {
                error: "Error while fetching blogs."
            }
        }

        return { success: true, blogs };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { success: false, error: "Could not fetch blogs." };
    }
}

export const getAllPublishedBlogsByUserId = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return {
                error: "UnAuthorized. Please login to access this."
            }
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
            },
        });

        if (!blogs) {
            return {
                error: "Error while fetching blogs."
            }
        }

        return { success: true, blogs };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { success: false, error: "Could not fetch blogs." };
    }
}

export const getAllBlogsByUserId = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return {
                error: "UnAuthorized. Please login to access this."
            }
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
            },
        });

        if (!blogs) {
            return {
                error: "Error while fetching blogs."
            }
        }

        return { success: true, blogs };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { error: "Could not fetch blogs." };
    }
}

export const getBlogDetailsBySlug = async (slug: string) => {
    try {
        const blog = await db.blog.findUnique({
            where: {
                slug: slug,
            },
            include: {
                user: true,
                category: true,
                likes: true,
                comments: true,
                dislikes: true,
                favourites: true,
            }
        });

        if (!blog) {
            return {
                error: "Blog Not found"
            }
        }

        return { data: blog };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { error: "Could not fetch blog data." };
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