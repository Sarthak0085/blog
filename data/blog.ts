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
        const blog = await db.blog.findFirst({
            where: {
                slug: slug
            },
            include: {
                category: true,
                likes: true,
                comments: true,
                user: true,
            }
        });

        console.log(blog);

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

        console.log("blog", blog);

        return blog;
    } catch (error) {
        return null
    }
}