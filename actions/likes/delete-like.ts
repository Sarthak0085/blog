"use server";

import { getLikeById } from "@/data/like";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { DeleteLikeSchema } from "@/schemas";
import { validateDeleteLike } from "@/validations";
import * as z from "zod";

export const deleteLike = async (values: z.infer<typeof DeleteLikeSchema>) => {
    try {
        const validatedData = validateDeleteLike(values);
        const { likeId } = validatedData;

        const like = await getLikeById(likeId);

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
                    id: likeId
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
                        id: likeId,
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