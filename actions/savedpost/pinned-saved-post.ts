"use server";

import { getSavedPostById } from "@/data/savepost";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { SavedPostPinnedSchema } from "@/schemas";
import { validateSavedPostPinned } from "@/validations";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const pinnedSavedPost = async (values: z.infer<typeof SavedPostPinnedSchema>) => {
    try {
        const validatedData = validateSavedPostPinned(values);
        const { savedPostId } = validatedData;

        const savedPost = await getSavedPostById(savedPostId);

        if (!savedPost || !savedPost?.id) {
            throw new CustomError("Saved Post not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        const isPinned = savedPost.isPinned;

        if (savedPost.userId === user?.id) {
            await db.savedPost.update({
                where: {
                    id: savedPostId
                },
                data: {
                    isPinned: !isPinned
                }
            });

            revalidatePath(`/${user?.id}/get-saved-posts`, "page");
            revalidatePath('/admin/get-saved-posts', "page");

            return {
                success: isPinned ? "Saved Post UnPinned Successfully" : "Saved Post Pinned Successfully"
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