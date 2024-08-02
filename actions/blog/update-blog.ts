"use server";

import { getBlogById, getBlogBySlug, getBlogByTitle } from "@/data/blog";
import { getCategoryByName } from "@/data/category";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { AddBlogSchema, UpdateBlogSchema } from "@/schemas";
import { deleteImageFromCloudinary, uploadFilesToCloudinary } from "@/utils/helpers";
import { validateCreateBlog, validateUpdateBlog } from "@/validations";
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

function extractPublicId(url: string) {
    // Parse the URL to get its pathname
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    // The pathname of the URL typically looks like `/v<version>/<public_id>.<format>`
    // We need to strip the leading '/'
    const pathSegments = pathname.substring(1).split('/');

    // The public_id is typically the second segment in the path, after the version and the 'image/upload'
    // For example, in `/v1633024464/blog/slug.jpg`, 'blog/slug' is the public_id
    const publicIdWithExtension = pathSegments.slice(2).join('/'); // Remove the first two segments: 'v<version>' and 'image/upload'
    const publicId = publicIdWithExtension.split('.')[0];

    return publicId;
}



export const EditBlog = async (values: z.infer<typeof UpdateBlogSchema>) => {
    try {
        const validateData = validateUpdateBlog(values);

        const { id, title, slug, shortSummary, category, tags, status, content, image } = validateData;

        const user = await currentUser();

        if (!user || !user?.id) {
            return {
                error: "Unauthorized. Please login to do this"
            }
        }

        const existedBlog = await getBlogById(id);


        if (!existedBlog) {
            throw new CustomError("Blog doesn't Exists", 404);
        }

        if (user?.id !== existedBlog?.userId) {
            throw new CustomError("Foridden. You are not allowed to do this.", 403);
        }

        const existedCategory = await getCategoryByName(category);

        if (!existedCategory) {
            throw new CustomError(`Category ${category} doesn't exist.`, 404);
        }

        const transformedTags = tags?.split(",").map(tag => tag.trim()).filter(tag => tag);

        // Extract existing image URLs and new images url
        const existingImageUrls = extractImageUrls(existedBlog.content);
        const updatedImageUrls = extractImageUrls(content);

        let updatedContent = existedBlog.content;
        if (existedBlog.content !== content) {
            try {
                updatedContent = await replaceImageUrlsInContent(content);
            } catch (error) {
                throw new CustomError("Error while processing images in content", 400);
            }
        }

        const imagesToDelete = existingImageUrls.filter(url => !updatedImageUrls.includes(url));

        if (imagesToDelete.length > 0) {
            for (const url of imagesToDelete) {
                const publicId = extractPublicId(url);
                console.log(publicId)
                if (publicId) {
                    await deleteImageFromCloudinary(String(publicId));
                }
            }
        }

        let result;

        if (image !== existedBlog.imageUrl) {
            await deleteImageFromCloudinary(String(existedBlog.imagePublicId));
            result = await uploadFilesToCloudinary(image, slug);

            if (!result) {
                throw new CustomError("Error While Uploading Image", 400);
            }
        }

        const blog = await db.blog.update({
            where: { id: id },
            data: {
                title,
                slug,
                categoryId: existedCategory.id,
                content: updatedContent || existedBlog.content,
                tags: transformedTags,
                shortSummary: shortSummary,
                status: status,
                imageUrl: existedBlog?.imageUrl || result?.url,
                imagePublicId: existedBlog?.imagePublicId || result?.public_id,
                userId: user?.id as string
            }
        });

        if (!blog) {
            return {
                error: "Error while creating blog."
            }
        }

        return {
            success: "Blog Updated Successfully.",
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