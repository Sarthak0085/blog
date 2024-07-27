import { db } from "@/lib/db";

export const getBlogByTitle = async (title: string) => {
    try {
        const blog = await db.blog.findUnique({
            where: {
                title
            }
        });
        return blog;
    } catch (error) {
        return null
    }
}

export const getBlogBySlug = async (slug: string) => {
    try {
        const blog = await db.blog.findUnique({
            where: {
                slug
            }
        });

        return blog;
    } catch (error) {
        return null
    }
}

export const getBlogById = async (id: string) => {
    try {
        const blog = await db.blog.findUnique({
            where: {
                id
            }
        });

        return blog;
    } catch (error) {
        return null
    }
}