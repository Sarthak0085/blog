import { db } from "@/lib/db";

export const getCategoryByName = async (name: string) => {
    try {
        const category = await db.category.findUnique({
            where: {
                name
            }
        });

        return category;
    } catch (error) {
        return null
    }
}

export const getCategoryById = async (id: string) => {
    try {
        const category = await db.category.findUnique({
            where: {
                id
            }
        });

        return category;
    } catch (error) {
        return null
    }
}