"use server";

import * as z from "zod";
import { PublishBlogSchema } from "@/schemas";
import { validatePublishBlog } from "@/validations";
import { getBlogById } from "@/data/blog";
import CustomError from "@/lib/customError";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { BlogStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const publishBlog = async (values: z.infer<typeof PublishBlogSchema>) => {
    try {
        const validatedData = validatePublishBlog(values);

        const { id } = validatedData;

        const blog = await getBlogById(id);

        if (!blog) {
            throw new CustomError("Blog Not Found", 404);
        }

        const user = await currentUser();

        if (!user) {
            throw new CustomError("Unauthorized.Please login", 401);
        }

        if (user?.id !== blog.userId) {
            throw new CustomError("Forbidden. You are not allowed to do this", 403);
        }

        await db.blog.update({
            where: {
                id: id
            },
            data: {
                status: BlogStatus.PUBLISHED,
            }
        });

        revalidatePath(`/${user?.id}/get-blogs`);

        return {
            success: "Blog Published successfully"
        }
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error?.message,
                code: error?.code
            }
        }
        return {
            error: "An unexpected error occurred.",
            code: 500,
        };
    }
}