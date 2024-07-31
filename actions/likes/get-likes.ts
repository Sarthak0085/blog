"use server";

import { db } from "@/lib/db"

export const getAllLikes = async () => {
    try {
        const likes = await db.like.findMany({
            include: {
                blog: true,
                user: true,
            }
        })
        if (!likes) {
            return {
                error: "No Like Present"
            }
        }

        return {
            data: likes
        }
    } catch (error) {
        return {
            error: "Error while fetching categories."
        }
    }
}
