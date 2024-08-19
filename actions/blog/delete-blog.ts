"use server";

import { getBlogById } from "@/data/blog";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { DeleteBlogSchema } from "@/schemas";
import { deleteImageFromCloudinary } from "@/utils/helpers";
import { validateDeleteBlog } from "@/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const extractImageUrls = (content: string): string[] => {
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    const urls = [];
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
        urls.push(match[1]);
    }
    return urls;
};

const extractPublicId = (url: string) => {
    // Parse the URL to get its pathname
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    // The pathname of the URL typically looks like `/v<version>/<public_id>.<format>`
    // We need to strip the leading '/'
    const pathSegments = pathname.substring(1).split('/');

    // The public_id is typically the second segment in the path, after the version and the 'image/upload'
    // For example, in `/v1633024464/blog/slug.jpg`, 'blog/slug' is the public_id
    const publicIdWithExtension = pathSegments.slice(2).join('/');
    const publicId = publicIdWithExtension.split('.')[0];

    return publicId;
}


export const deleteBlog = async (values: z.infer<typeof DeleteBlogSchema>) => {
    try {
        const validatedData = validateDeleteBlog(values);

        const { blogId } = validatedData;

        const blog = await getBlogById(blogId);

        if (!blog) {
            throw new CustomError("Blog not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        if (blog.userId === user?.id) {
            const extractImages = extractImageUrls(blog.content);

            for (const url of extractImages) {
                const publicId = extractPublicId(url);
                console.log(publicId)
                if (publicId) {
                    await deleteImageFromCloudinary(String(publicId));
                }
            }

            await deleteImageFromCloudinary(String(blog?.imagePublicId));

            await db.blog.delete({
                where: {
                    id: blogId
                }
            });

            revalidatePath(`/blogs`, "page");
            revalidatePath(`/${user?.id}/get-blogs`, "page");
            revalidatePath(`/admin/get-blogs`, "page");

            return {
                success: "Blog deleted successfully",
            }
        } else {
            if (user?.role === "ADMIN") {
                const extractImages = extractImageUrls(blog.content);

                for (const url of extractImages) {
                    const publicId = extractPublicId(url);
                    console.log(publicId)
                    if (publicId) {
                        await deleteImageFromCloudinary(String(publicId));
                    }
                }

                await deleteImageFromCloudinary(String(blog?.imagePublicId));

                await db.blog.delete({
                    where: {
                        id: blogId
                    }
                });

                revalidatePath(`/blogs`, "page");
                revalidatePath(`/${blog?.userId}/get-blogs`, "page");
                revalidatePath(`/admin/get-blogs`, "page");

                return {
                    success: "Blog deleted successfully",
                }
            }
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