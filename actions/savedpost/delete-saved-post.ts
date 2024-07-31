"use server";

import { getSavedPostById } from "@/data/savepost";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { DeleteSavedPostSchema } from "@/schemas";
import { validateDeleteSavedPost } from "@/validations";
import * as z from "zod";

export const deleteSavedPost = async (values: z.infer<typeof DeleteSavedPostSchema>) => {
    try {
        const validatedData = validateDeleteSavedPost(values);
        const { savedPostId } = validatedData;

        const savePost = await getSavedPostById(savedPostId);

        if (!savePost || !savePost?.id) {
            throw new CustomError("Saved Post not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        if (savePost.userId === user?.id) {
            await db.savedPost.delete({
                where: {
                    id: savedPostId
                }
            });

            return {
                success: "Saved Post Deleted Successfully"
            }
        }
        else {
            if (user?.role === "ADMIN") {
                await db.savedPost.delete({
                    where: {
                        id: savedPostId,
                    }
                })

                return {
                    success: "Sabe Post deleted successfully"
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