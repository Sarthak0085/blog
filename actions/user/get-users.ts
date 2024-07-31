"use server";

import { db } from "@/lib/db";

export const getAllUsers = async () => {
    try {
        const users = await db.user.findMany({});

        if (!users) {
            return {
                error: "Error while fetching users."
            }
        }

        return { data: users };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, error: "Could not fetch users." };
    }
}