"use server";

import { getCategoryById } from "@/data/category";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { DeleteCategorySchema } from "@/schemas";
import { validateDeleteCategoryInput } from "@/validations";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const deleteCategory = async (values: z.infer<typeof DeleteCategorySchema>) => {
    try {
        const validatedData = validateDeleteCategoryInput(values);
        const user = await currentUser();

        if (!user || !user?.id) {
            throw new CustomError("Unauthorized. Please login first", 401);
        }

        const { categoryId } = validatedData;

        if (!user?.id || user?.role !== UserRole.ADMIN) {
            throw new CustomError("Forbidden. You are not allowed to do this", 403);
        }

        const existedCategory = await getCategoryById(categoryId);

        if (!existedCategory) {
            throw new CustomError("Category not found", 404);
        }

        await db.category.delete({
            where: {
                id: categoryId
            }
        });

        revalidatePath(`/blogs`, "page");
        revalidatePath(`/admin/get-categories`, "page");

        return {
            success: "Category deleted successfully"
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