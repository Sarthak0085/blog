"use server";

import { db } from "@/lib/db"

export const getAllTags = async () => {
    try {
        const tags = await db.tag.findMany({
            orderBy: [
                { count: "desc" },
                { createdAt: "desc" }
            ]
        })
        if (!tags) {
            return {
                error: "No Tag Present"
            }
        }

        return {
            data: tags
        }
    } catch (error) {
        return {
            error: "Error while fetching tags."
        }
    }
}
