"use server";

import { getBlogBySlug, getBlogByTitle } from "@/data/blog";
import { getCategoryByName } from "@/data/category";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { AddBlogSchema } from "@/schemas";
import { uploadFilesToCloudinary } from "@/utils/helpers";
import { validateCreateBlog } from "@/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

const extractImageUrls = (content: string): string[] => {
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    const urls = [];
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
        urls.push(match[1]);
    }
    return urls;
};


const replaceImageUrlsInContent = async (content: string): Promise<string> => {
    const imageUrls = extractImageUrls(content);
    let updatedContent = content;

    for (const url of imageUrls) {
        const result = await uploadFilesToCloudinary(url);
        updatedContent = updatedContent.replace(url, result?.url as string);
    }

    return updatedContent;
};

const updateTagCounts = async (tags: string[]) => {
    for (const tagName of tags) {
        await db.tag.upsert({
            where: { name: tagName.toUpperCase() },
            update: { count: { increment: 1 } },
            create: { name: tagName.toUpperCase(), count: 1 }
        });
    }
};

const calculateReadingTime = (text: string, wordsPerMinute: number = 200) => {
    const plainText = text.replace(/<\/?[^>]+(>|$)/g, " ");

    const wordCount = plainText.split(/\s+/).filter(Boolean).length;

    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return minutes;
}


export const createBlog = async (values: z.infer<typeof AddBlogSchema>) => {

    try {
        const validateData = validateCreateBlog(values);

        const { title, slug, shortSummary, category, tags, status, content, image } = validateData;

        const user = await currentUser();

        if (!user || !user?.id) {
            return {
                error: "Unauthorized. Please login to do this"
            }
        }

        const existedBlogByTitle = await getBlogByTitle(title);
        const existedBlogBySlug = await getBlogBySlug(slug);


        if (existedBlogByTitle || existedBlogBySlug) {
            throw new CustomError("Blog Already Exists", 409);
        }

        const existedCategory = await getCategoryByName(category);

        if (!existedCategory) {
            throw new CustomError(`Category ${category} doesn't exist.`, 404);
        }

        const readTime = calculateReadingTime(content);

        const transformedTags = tags?.split(",").map(tag => tag.trim().toUpperCase()).filter(tag => tag);

        let updatedContent;
        try {
            updatedContent = await replaceImageUrlsInContent(content);
        } catch (error) {
            throw new CustomError("Error while processing images in content", 400);
        }

        const result = await uploadFilesToCloudinary(image, slug);

        if (!result) {
            throw new CustomError("Error While Uploading Image", 400);
        }

        console.log(values, transformedTags);

        const blog = await db.blog.create({
            data: {
                title,
                slug,
                categoryId: existedCategory.id,
                content: updatedContent,
                tags: transformedTags,
                shortSummary,
                status,
                read_time: readTime,
                imageUrl: result?.url,
                imagePublicId: result?.public_id,
                userId: user?.id as string
            }
        });


        await updateTagCounts(transformedTags as string[]);

        if (!blog) {
            return {
                error: "Error while creating blog."
            }
        }

        revalidatePath(`/blogs`);

        return {
            success: "Blog Created Successfully.",
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