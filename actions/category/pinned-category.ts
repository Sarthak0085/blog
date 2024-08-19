"use server";

import { getCategoryById } from "@/data/category";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { PinnedCategorySchema } from "@/schemas";
import { validatePinnedCategory } from "@/validations";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const pinnedCategory = async (values: z.infer<typeof PinnedCategorySchema>) => {
    try {
        const validatedData = validatePinnedCategory(values);
        const { categoryId } = validatedData;

        const category = await getCategoryById(categoryId);

        if (!category) {
            throw new CustomError("Category not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        const isPinned = category.isPinned;

        if (category.userId === user?.id) {
            await db.category.update({
                where: {
                    id: categoryId
                },
                data: {
                    isPinned: !isPinned
                }
            });

            revalidatePath(`/admin/get-categories`, "page");

            return {
                success: isPinned ? "Category UnPinned Successfully" : "Category Pinned Successfully"
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