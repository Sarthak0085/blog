"use server";

import { getDislikeById } from "@/data/dislike";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { DeleteDislikeSchema } from "@/schemas";
import { validateDeleteDislike } from "@/validations";
import * as z from "zod";

export const deleteDislike = async (values: z.infer<typeof DeleteDislikeSchema>) => {
    try {
        const validatedData = validateDeleteDislike(values);
        const { dislikeId } = validatedData;

        const like = await getDislikeById(dislikeId);

        if (!like || !like?.id) {
            throw new CustomError("Like not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        if (like.userId === user?.id) {
            await db.like.delete({
                where: {
                    id: dislikeId
                }
            });

            return {
                success: "Like Deleted Successfully"
            }
        }
        else {
            if (user?.role === "ADMIN") {
                await db.like.delete({
                    where: {
                        id: dislikeId,
                    }
                })

                return {
                    success: "Like deleted successfully"
                }
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