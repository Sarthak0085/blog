"use server";

import { getFavouriteById } from "@/data/favourite";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { FavouritePinnedSchema } from "@/schemas";
import { validateFavouritePinned } from "@/validations";
import * as z from "zod";

export const pinnedFavourite = async (values: z.infer<typeof FavouritePinnedSchema>) => {
    try {
        const validatedData = validateFavouritePinned(values);
        const { favouriteId } = validatedData;

        const favourite = await getFavouriteById(favouriteId);

        if (!favourite || !favourite?.id) {
            throw new CustomError("Favourite not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id || user.isBlocked === "BLOCK") {
            throw new CustomError("Unauthorized. Please login first.", 401);
        }

        const isPinned = favourite.isPinned;

        if (favourite.userId === user?.id) {
            await db.favourite.update({
                where: {
                    id: favouriteId
                },
                data: {
                    isPinned: !isPinned
                }
            });

            return {
                success: isPinned ? "Favourite UnPinned Successfully" : "Favourite Pinned Successfully"
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