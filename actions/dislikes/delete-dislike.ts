"use server";

import { getDislikeById } from "@/data/dislike";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { DeleteDislikeSchema } from "@/schemas";
import { validateDeleteDislike } from "@/validations";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const deleteDislike = async (values: z.infer<typeof DeleteDislikeSchema>) => {
    try {
        const validatedData = validateDeleteDislike(values);
        const { dislikeId } = validatedData;

        const dislike = await getDislikeById(dislikeId);

        if (!dislike || !dislike?.id) {
            throw new CustomError("Dislike not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        if (dislike.userId === user?.id) {
            await db.dislike.delete({
                where: {
                    id: dislikeId
                }
            });

            revalidatePath(`/${user?.id}/get-dislikes`, "page");
            revalidatePath('/admin/get-dislikes', "page");

            return {
                success: "Dislike Deleted Successfully"
            }
        }
        else {
            if (user?.role === "ADMIN") {
                await db.dislike.delete({
                    where: {
                        id: dislikeId,
                    }
                });

                revalidatePath(`/${dislike?.userId}/get-dislikes`, "page");
                revalidatePath('/admin/get-dislikes', "page");

                return {
                    success: "Dislike deleted successfully"
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