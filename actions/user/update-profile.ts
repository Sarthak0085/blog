"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { domain } from "@/lib/domain";
import sendEmail from "@/lib/send-mail";
import { generateVerificationToken } from "@/lib/tokens";
import { ProfileSchema } from "@/schemas";
import { deleteImageFromCloudinary, uploadFilesToCloudinary } from "@/utils/helpers";
import { validateUserProfile } from "@/validations";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const extractPublicId = (url: string) => {
    // Parse the URL to get its pathname
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    // The pathname of the URL typically looks like `/v<version>/<public_id>.<format>`
    // We need to strip the leading '/'
    const pathSegments = pathname.substring(1).split('/');

    // The public_id is typically the second segment in the path, after the version and the 'image/upload'
    // For example, in `/v1633024464/blog/slug.jpg`, 'blog/slug' is the public_id
    const publicIdWithExtension = pathSegments.slice(2).join('/'); // Remove the first two segments: 'v<version>' and 'image/upload'
    const publicId = publicIdWithExtension.split('.')[0];

    return publicId;
}

export const updateUserProfile = async (values: z.infer<typeof ProfileSchema>) => {
    try {
        const validatedData = validateUserProfile(values);

        const { name, email, bio, image, userId } = validatedData;

        const existedUser = await getUserById(userId);

        if (!existedUser) {
            throw new CustomError("User not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id) {
            throw new CustomError("Unauthorized. Please login to access this", 401);
        }

        if (user?.id !== existedUser?.id || user?.isBlocked === "BLOCK") {
            throw new CustomError("Forbidden. You are not allowed to do this", 403);
        }

        let result;

        if (image && image !== existedUser?.image) {
            if (existedUser?.image) {
                const publicId = extractPublicId(existedUser?.image);
                await deleteImageFromCloudinary(publicId);
            }
            result = await uploadFilesToCloudinary(image, "avatar");

            if (!result) {
                throw new CustomError("Error while Uploading file to cloudinary", 400);
            }
        }

        if (email && email !== user.email) {
            const existingUser = await getUserByEmail(values.email);

            if (existingUser && existingUser.id !== user.id) {
                return {
                    error: "Email already in use by some other person",
                };
            }

            const verificationToken = await generateVerificationToken(values.email);

            const confirmLink = `${domain}/auth/verification?token=${verificationToken.token}`;

            await sendEmail({
                email: values.email,
                subject: "Confirm your Email",
                html: `<p>Please click <a href="${confirmLink}">here</a> to confirm your Email.</p>`,
            });

            revalidatePath("/admin/get-users");
            revalidatePath(`/${existedUser?.id}`);

            return {
                success: "Confirmation Email Sent! Please verify your email.",
                data: confirmLink
            };
        }

        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                name: name ?? existedUser?.name,
                email: email ?? existedUser?.email,
                bio: bio ?? existedUser?.bio,
                image: result?.url ?? existedUser?.image,
            }
        });

        revalidatePath("/admin/get-users");
        revalidatePath(`/${user?.id}`);

        return {
            success: "Profile updated successfully"
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