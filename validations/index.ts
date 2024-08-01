import {
    CreateCategorySchema,
    UpdateCategorySchema,
    DeleteCategorySchema,
    DislikeSchema,
    LikeSchema,
    FavouriteSchema,
    SavedPostSchema,
    DeleteLikeSchema,
    DeleteDislikeSchema,
    DeleteFavouriteSchema,
    DeleteSavedPostSchema,
    FavouritePinnedSchema,
} from "@/schemas";
import CustomError from "@/lib/customError";
import * as z from "zod";

export const validateCreateCategoryInput = (values: z.infer<typeof CreateCategorySchema>) => {
    const validatedFields = CreateCategorySchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateUpdateCategoryInput = (values: z.infer<typeof UpdateCategorySchema>) => {
    const validatedFields = UpdateCategorySchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateDeleteCategoryInput = (values: z.infer<typeof DeleteCategorySchema>) => {
    const validatedFields = DeleteCategorySchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateLikeInput = (values: z.infer<typeof LikeSchema>) => {
    const validatedFields = LikeSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateDislikeInput = (values: z.infer<typeof DislikeSchema>) => {
    const validatedFields = DislikeSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateFavouriteInput = (values: z.infer<typeof FavouriteSchema>) => {
    const validatedFields = FavouriteSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateSavedPost = (values: z.infer<typeof SavedPostSchema>) => {
    const validatedFields = SavedPostSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateDeleteLike = (values: z.infer<typeof DeleteLikeSchema>) => {
    const validatedFields = DeleteLikeSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateDeleteDislike = (values: z.infer<typeof DeleteDislikeSchema>) => {
    const validatedFields = DeleteDislikeSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateDeleteFavourite = (values: z.infer<typeof DeleteFavouriteSchema>) => {
    const validatedFields = DeleteFavouriteSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateDeleteSavedPost = (values: z.infer<typeof DeleteSavedPostSchema>) => {
    const validatedFields = DeleteSavedPostSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateFavouritePinned = (values: z.infer<typeof FavouritePinnedSchema>) => {
    const validatedFields = FavouritePinnedSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};