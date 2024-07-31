"use server";

import { getCategoryById, getCategoryByName } from "@/data/category";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { UpdateCategorySchema } from "@/schemas";
import { validateUpdateCategoryInput } from "@/validations";
import { UserRole } from "@prisma/client";
import * as z from "zod";

export const updateCategory = async (values: z.infer<typeof UpdateCategorySchema>) => {
    try {
        const validatedData = validateUpdateCategoryInput(values);

        const { userId, name, categoryId } = validatedData;

        const user = await currentUser();

        if (!user || !user?.id) {
            throw new CustomError("Unauthorized. Please login first", 401);
        }

        if (user?.id !== userId || user?.role !== UserRole.ADMIN) {
            throw new CustomError("Forbidden. You are not allowed to do this", 403);
        }

        const existedCategory = await getCategoryById(name);

        if (existedCategory && existedCategory?.id !== categoryId) {
            throw new CustomError("Category Already Exists", 409);
        }

        const category = await db.category.update({
            where: {
                id: categoryId
            },
            data: {
                name: name,
                userId: userId,
            }
        });

        return {
            success: "Category updated successfully.",
            data: category
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
