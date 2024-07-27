"use server";

import { getBlogBySlug, getBlogByTitle } from "@/data/blog";
import { getCategoryByName } from "@/data/category";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { AddBlogSchema } from "@/schemas";
import * as z from "zod";

export const createBlog = async (values: z.infer<typeof AddBlogSchema>) => {
    const validatedFields = AddBlogSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid Fields"
        }
    }

    const { title, slug, shortSummary, category, tags, status, content } = validatedFields.data;

    const user = await currentUser();

    if (!user) {
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

    console.log(values, transformedTags);

    // const blog = await db.blog.create({
    //     data: {
    //         title,
    //         slug,
    //         categoryId: existedCategory.id,
    //         content,
    //         tags: transformedTags,
    //         shortSummary,
    //         status
    //     }
    // });


    return {
        success: "Blog Created Successfully.",
    }
}