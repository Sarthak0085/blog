"use server";

import { db } from "@/lib/db"

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
