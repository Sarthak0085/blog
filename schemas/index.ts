import { BlogStatus, UserBlock, UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
    password: z.string()
        .min(8, { message: "Password must contains 8 characters" }),
    code: z.optional(z.string().min(6, { message: "Code must have 6 digits" }))
});

export const RegisterSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is Required" }),
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
    password: z.string()
        .min(8, { message: "Password must contains 8 characters" })
});

export const ResetSchema = z.object({
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
});

export const NewPasswordSchema = z.object({
    password: z.string()
        .min(8, { message: "Password must contains 8 characters" }),
});

export const SettingsSchema = z.object({
    name: z.optional(z.string().min(1, "Name is Required.")),
    email: z.optional(z.string().email("Invalid Email")),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
    password: z.optional(z.string().min(8, { message: "Password must contain 8 character" })),
    newPassword: z.optional(z.string().min(8)),
}).refine((data) => {
    if (data.password && !data.newPassword) {
        return false;
    }

    if (!data.password && data.newPassword) {
        return false;
    }

    return true;
}, {
    message: "New Password is required",
    path: ["newPassword"]
});

export const AddBlogSchema = z.object({
    title: z.string().min(3, { message: "Title must be bigger than 3 letters" }),
    slug: z.string().min(3, { message: "Slug must be bigger than 3 letters" }),
    shortSummary: z.string()
        .min(100, { message: "Short Summary must be between 100 to 300 characters" })
        .max(300, { message: "Short Summary must be between 100 to 300 characters" }),
    content: z.string(),
    category: z.string().min(1, "Category is required"),
    tags: z.optional(z.string()),
    image: z.string(),
    status: z.enum([BlogStatus.DRAFT, BlogStatus.PUBLISHED]),
});

export const UpdateBlogSchema = z.object({
    id: z.string().min(1, { message: "Category Id is required" }),
    title: z.string().min(3, { message: "Title must be bigger than 3 letters" }),
    slug: z.string().min(3, { message: "Slug must be bigger than 3 letters" }),
    shortSummary: z.string()
        .min(100, { message: "Short Summary must be between 100 to 300 characters" })
        .max(300, { message: "Short Summary must be between 100 to 300 characters" }),
    content: z.string(),
    category: z.string().min(1, "Category is required"),
    tags: z.optional(z.string()),
    image: z.string(),
    status: z.enum([BlogStatus.DRAFT, BlogStatus.PUBLISHED]),
});

export const PublishBlogSchema = z.object({
    id: z.string().min(1, { message: "Blog Id is required" }),
})

export const DeleteBlogSchema = z.object({
    blogId: z.string().min(1, { message: "Blog Id is required" }),
});

export const PinnedBlogSchema = z.object({
    blogId: z.string().min(1, { message: "Blog Id is required" }),
});

export const CreateCategorySchema = z.object({
    name: z.string().min(2, "Category name is required.")
});

export const UpdateCategorySchema = z.object({
    categoryId: z.string().min(1, "Category Id is required"),
    name: z.string().min(2, "Category name is required."),
    userId: z.string().min(1, "UserId is required")
});

export const DeleteCategorySchema = z.object({
    categoryId: z.string().min(1, "Category id is required."),
});


export const DeleteUserSchema = z.object({
    userId: z.string().min(1, "UserId is required."),
});

export const BlockUserSchema = z.object({
    userId: z.string().min(1, "UserId is required."),
    isBlocked: z.enum([UserBlock.BLOCK, UserBlock.UNBLOCK]),
});

export const LikeSchema = z.object({
    blogId: z.string().min(1, "BlogId is required"),
});

export const DislikeSchema = z.object({
    blogId: z.string().min(1, "BlogId is required"),
});

export const FavouriteSchema = z.object({
    blogId: z.string().min(1, "BlogId is required"),
});

export const FavouritePinnedSchema = z.object({
    favouriteId: z.string().min(1, "BlogId is required"),
});

export const SavedPostSchema = z.object({
    blogId: z.string().min(1, "BlogId is required"),
});

export const SavedPostPinnedSchema = z.object({
    savedPostId: z.string().min(1, "SavedPost Id is required"),
});

export const DeleteLikeSchema = z.object({
    likeId: z.string().min(1, "LikeId is required"),
});

export const DeleteDislikeSchema = z.object({
    dislikeId: z.string().min(1, "DislikeId is required"),
});

export const DeleteSavedPostSchema = z.object({
    savedPostId: z.string().min(1, "Saved Post Id is required"),
});

export const DeleteFavouriteSchema = z.object({
    favouriteId: z.string().min(1, "Favourite Id is required"),
});

export const EditUserSchema = z.object({
    userId: z.string().min(1, { message: "UserId is required" }),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    isBlocked: z.enum([UserBlock.BLOCK, UserBlock.UNBLOCK]),
});

export const CreateCommentSchema = z.object({
    blogId: z.string().min(1, "BlogId is required"),
    content: z.string().min(1, "Content is required"),
    parentId: z.optional(z.string().min(1, "parentId is required")),
});

export const UpdateCommentSchema = z.object({
    id: z.string().min(1, "comment Id is required"),
    blogId: z.string().min(1, "BlogId is required"),
    content: z.string().min(1, "Content is required"),
    parentId: z.union([z.string().min(1, "parentId is required"), z.null()]),
});

export const DeleteCommentSchema = z.object({
    commentId: z.string().min(1, "CommentId is required"),
});

export const PinnedCommentSchema = z.object({
    commentId: z.string().min(1, "CommentId is required"),
});

export const PinnedCategorySchema = z.object({
    categoryId: z.string().min(1, "categoryId is required"),
});

export const LikeCommentSchema = z.object({
    commentId: z.string().min(1, "CommentId is required"),
});

export const PinnedDislikeSchema = z.object({
    dislikeId: z.string().min(1, "DislikeId is required"),
});

export const PinnedLikeSchema = z.object({
    likeId: z.string().min(1, "LikeId is required"),
});