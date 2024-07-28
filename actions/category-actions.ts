"use server";

import * as z from "zod";
import { CategorySchema } from "@/schemas";
import { getCategoryByName } from "@/data/category";
import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const createCategory = async (values: z.infer<typeof CategorySchema>) => {
    const validatedFields = CategorySchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid Fields"
        }
    }

    const user = await currentUser();

    if (!user) {
        return {
            error: "Unauthorized. Please login first."
        }
    }

    const userRole = await currentRole();

    if (userRole !== UserRole.ADMIN) {
        return {
            error: "Unauthorized. Only Admin allowed to do this."
        }
    }

    const { name } = validatedFields.data;

    const existedCategory = await getCategoryByName(name);

    if (existedCategory) {
        return {
            error: "Category Already Exist."
        }
    }

    const category = await db.category.create({
        data: {
            name,
        }
    });

    if (!category) {
        return {
            error: "Something went wrong!",
        };
    }

    return {
        success: "Category Created Successfully."
    }
}

export const getAllCategories = async () => {
    try {
        const categories = await db.category.findMany({})
        if (!categories) {
            return {
                error: "No Category Present"
            }
        }

        return {
            data: categories
        }
    } catch (error) {
        return {
            error: "Error while fetching categories."
        }
    }
}

export const updateCategory = async (values: z.infer<Cat) => {

}