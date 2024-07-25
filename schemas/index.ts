import { UserRole } from "@prisma/client";
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