"use server";

import { getUserByEmail } from "@/data/user";
import CustomError from "@/lib/customError";
import { domain } from "@/lib/domain";
import sendEmail from "@/lib/send-mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  try {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid Fields",
      };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      throw new CustomError("User doesn't exist", 404);
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    if (!passwordResetToken) {
      throw new CustomError("Error while generating token", 400);
    }

    const confirmLink = `${domain}/auth/new-password?token=${passwordResetToken.token}`;

    await sendEmail({
      email: email,
      subject: "Confirm your Email",
      html: `<p>Please click <a href="${confirmLink}">here</a> to reset your password.</p>`,
    });

    return {
      success: "Reset Email Sent!",
    };
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
};
