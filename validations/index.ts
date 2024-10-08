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
    SavedPostPinnedSchema,
    DeleteCommentSchema,
    PinnedCommentSchema,
    CreateCommentSchema,
    UpdateCommentSchema,
    PinnedDislikeSchema,
    PinnedLikeSchema,
    LikeCommentSchema,
    PinnedCategorySchema,
    AddBlogSchema,
    UpdateBlogSchema,
    DeleteBlogSchema,
    PinnedBlogSchema,
    DeleteUserSchema,
    EditUserSchema,
    PublishBlogSchema,
    ProfileSchema,
    ContactSchema,
    ChangePasswordSchema,
    RegisterSchema,
    LoginSchema,
    ResetSchema,
    SettingsSchema,
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

export const validateUserProfile = (values: z.infer<typeof ProfileSchema>) => {
    const validatedFields = ProfileSchema.safeParse(values);

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

export const validateSavedPostPinned = (values: z.infer<typeof SavedPostPinnedSchema>) => {
    const validatedFields = SavedPostPinnedSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateComment = (values: z.infer<typeof CreateCommentSchema>) => {
    const validatedFields = CreateCommentSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateCommentDelete = (values: z.infer<typeof DeleteCommentSchema>) => {
    const validatedFields = DeleteCommentSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validatePinnedComment = (values: z.infer<typeof PinnedCommentSchema>) => {
    const validatedFields = PinnedCommentSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validatePinnedCategory = (values: z.infer<typeof PinnedCategorySchema>) => {
    const validatedFields = PinnedCategorySchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateLikeComment = (values: z.infer<typeof LikeCommentSchema>) => {
    const validatedFields = LikeCommentSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validatePinnedDislike = (values: z.infer<typeof PinnedDislikeSchema>) => {
    const validatedFields = PinnedDislikeSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validatePinnedLike = (values: z.infer<typeof PinnedLikeSchema>) => {
    const validatedFields = PinnedLikeSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateUpdateComment = (values: z.infer<typeof UpdateCommentSchema>) => {
    const validatedFields = UpdateCommentSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateCreateBlog = (values: z.infer<typeof AddBlogSchema>) => {
    const validatedFields = AddBlogSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateUpdateBlog = (values: z.infer<typeof UpdateBlogSchema>) => {
    const validatedFields = UpdateBlogSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateDeleteBlog = (values: z.infer<typeof DeleteBlogSchema>) => {
    const validatedFields = DeleteBlogSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateDeleteUser = (values: z.infer<typeof DeleteUserSchema>) => {
    const validatedFields = DeleteUserSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};


export const validatePinnedBlog = (values: z.infer<typeof PinnedBlogSchema>) => {
    const validatedFields = PinnedBlogSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validatePublishBlog = (values: z.infer<typeof PublishBlogSchema>) => {
    const validatedFields = PublishBlogSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateEditUser = (values: z.infer<typeof EditUserSchema>) => {
    const validatedFields = EditUserSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateContact = (values: z.infer<typeof ContactSchema>) => {
    const validatedFields = ContactSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateChangePassword = (values: z.infer<typeof ChangePasswordSchema>) => {
    const vaidatedFields = ChangePasswordSchema.safeParse(values);

    if (!vaidatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return vaidatedFields.data;
}

export const validateRegistration = (values: z.infer<typeof RegisterSchema>) => {
    const vaidatedFields = RegisterSchema.safeParse(values);

    if (!vaidatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return vaidatedFields.data;
}

export const validateLogin = (values: z.infer<typeof LoginSchema>) => {
    const vaidatedFields = LoginSchema.safeParse(values);

    if (!vaidatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return vaidatedFields.data;
}

export const validateResetPassword = (values: z.infer<typeof ResetSchema>) => {
    const vaidatedFields = ResetSchema.safeParse(values);

    if (!vaidatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return vaidatedFields.data;
}

export const validateSettings = (values: z.infer<typeof SettingsSchema>) => {
    const vaidatedFields = SettingsSchema.safeParse(values);

    if (!vaidatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return vaidatedFields.data;
}