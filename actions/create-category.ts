"use server";

import { getCategoryByName } from "@/data/category";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { CreateCategorySchema } from "@/schemas";
import { validateCreateCategoryInput } from "@/validations";
import { UserRole } from "@prisma/client";
import * as z from "zod";

export const createCategory = async (values: z.infer<typeof CreateCategorySchema>) => {
    try {
        const validatedData = validateCreateCategoryInput(values);

        const { name } = validatedData;

        const user = await currentUser();

        if (!user || !user?.id) {
            throw new CustomError("Unauthorized. Please login to access this", 401);
        }

        if (user?.role !== UserRole.ADMIN) {
            throw new CustomError("Forbidden. You are not allowed to do this", 403);
        }

        const existedCategory = await getCategoryByName(name);

        if (existedCategory) {
            throw new CustomError("Category Alredy Exists", 409)
        }

        const category = await db.category.create({
            data: {
                name,
                userId: user?.id
            }
        });

        return {
            success: "Category Created Successfully.",
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