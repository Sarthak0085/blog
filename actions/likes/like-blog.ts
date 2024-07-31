"use server";

import { getBlogById } from "@/data/blog";
import { getLikeByUserIdAndBlogId } from "@/data/like";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { LikeSchema } from "@/schemas";
import { validateLikeInput } from "@/validations";
import * as z from "zod";

// export const likeBlog = async (values: z.infer<typeof LikeSchema>) => {
//     const validatedFields = LikeSchema.safeParse(values);

//     if (!validatedFields.success) {
//         return {
//             error: "Invalid Fields"
//         }
//     }

//     const { blogId } = validatedFields.data;

//     const user = await currentUser();

//     if (!user || user.isBlocked || !user?.id) {
//         return {
//             error: "UnAuthorized. Please login to access this."
//         }
//     }

//     const existedBlog = await getBlogById(blogId);

//     if (!existedBlog) {
//         return {
//             error: "Blog not found"
//         }
//     }

//     const isLiked = await getLikedBlogByUserIdAndBlogId(user?.id, blogId);

//     if (isLiked) {
//         await db.like.delete({
//             where: {
//                 userId_blogId: {
//                     userId: user?.id,
//                     blogId: blogId
//                 }
//             }
//         });

//         return {
//             success: "Liked Removed."
//         }
//     } else {
//         const like = await db.like.create({
//             data: {
//                 userId: user?.id,
//                 blogId: blogId
//             }
//         });

//         if (!like) {
//             return {
//                 error: "Error while liking blog. Please do it after sometime."
//             }
//         }

//         return {
//             success: "You liked this blog."
//         }
//     }
// }


export const likeBlog = async (values: z.infer<typeof LikeSchema>) => {
    try {
        const validatedData = validateLikeInput(values);

        const { blogId } = validatedData;
        const user = await currentUser();

        if (!user || user.isBlocked === "BLOCK" || !user?.id) {
            throw new CustomError("Unauthorized. Please login to access this.", 403);
        }

        const existedBlog = await getBlogById(blogId);

        if (!existedBlog) {
            throw new CustomError("Blog not found", 404);
        }

        const isLiked = await getLikeByUserIdAndBlogId(user?.id, blogId);

        if (isLiked) {
            await db.like.delete({
                where: {
                    userId_blogId: {
                        userId: user?.id,
                        blogId: blogId,
                    },
                },
            });

            return {
                success: "Like removed.",
            };
        } else {
            const like = await db.like.create({
                data: {
                    userId: user?.id,
                    blogId: blogId,
                },
            });

            if (!like) {
                throw new CustomError("An unexpected error occurred. Please try again later.", 500);
            }

            return {
                success: "You liked this blog.",
            };
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
};
