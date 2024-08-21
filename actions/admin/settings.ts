"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { domain } from "@/lib/domain";
import sendEmail from "@/lib/send-mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import { validateSettings } from "@/validations";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  try {
    const validatedData = validateSettings(values);
    const user = await currentUser();

    if (!user) {
      throw new CustomError("Unauthorized. Please login to access this", 401);
    }

    const dbUser = await getUserById(user?.id as string);

    if (!dbUser) {
      throw new CustomError("Unauthorized. Please login to access this", 401);
    }

    if (user?.OAuth) {
      values.password = undefined;
      values.newPassword = undefined;
      values.isTwoFactorEnabled = undefined;
      values.email = undefined;
    }

    if (values.email && values.email !== user.email) {
      const existingUser = await getUserByEmail(values.email);

      if (existingUser && existingUser.id !== user.id) {
        return {
          error: "Email already in use by some other person",
        };
      }

      const verificationToken = await generateVerificationToken(values.email);

      const confirmLink = `${domain}/auth/verification?token=${verificationToken.token}`;

      await sendEmail({
        email: values?.email,
        subject: "Confirm your Email",
        template: "confirmation.ejs",
        data: {
          name: values?.name,
          confirmLink: confirmLink,
        }
      });

      return {
        success: "Confirmation Email Sent! Please verify your email.",
      };
    }

    if (values.password && values.newPassword && dbUser.password) {
      const isPasswordMatch = await bcrypt.compare(
        values.password,
        dbUser.password
      );

      if (!isPasswordMatch) {
        throw new CustomError("Invalid Credentials", 409);
      }

      const hashPassword = await bcrypt.hash(values.newPassword, 10);

      values.password = hashPassword;
      values.newPassword = undefined;
    }

    const newUser = await db.user.update({
      where: { id: user?.id },
      data: {
        ...values,
      },
    });

    return {
      success: "Settings Updated",
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
