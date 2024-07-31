"use server";

import { getFavouriteById } from "@/data/favourite";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { DeleteFavouriteSchema } from "@/schemas";
import { validateDeleteFavourite } from "@/validations";
import * as z from "zod";

export const deleteFavourite = async (values: z.infer<typeof DeleteFavouriteSchema>) => {
    try {
        const validatedData = validateDeleteFavourite(values);
        const { favouriteId } = validatedData;

        const favourite = await getFavouriteById(favouriteId);

        if (!favourite || !favourite?.id) {
            throw new CustomError("Favourite not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        if (favourite.userId === user?.id) {
            await db.favourite.delete({
                where: {
                    id: favouriteId
                }
            });

            return {
                success: "Favourite Deleted Successfully"
            }
        }
        else {
            if (user?.role === "ADMIN") {
                await db.favourite.delete({
                    where: {
                        id: favouriteId,
                    }
                })

                return {
                    success: "Favourite deleted successfully"
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