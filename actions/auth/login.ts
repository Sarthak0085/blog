"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import sendEmail from "@/lib/send-mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { domain } from "@/lib/domain";
import { UserBlock } from "@prisma/client";
import CustomError from "@/lib/customError";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser?.email || !existingUser?.password) {
    throw new CustomError("User doesn't exist", 404);
  }

  if (existingUser?.isBlocked === UserBlock.BLOCK) {
    throw new CustomError("Your account have been blocked. Please contact us to know the reason.", 403);
  }

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordMatch) {
    throw new CustomError("Invalid Credentials", 400);
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    const confirmLink = `${domain}/auth/verification?token=${verificationToken.token}`;

    await sendEmail({
      email: email,
      subject: "Confirm your Email",
      html: `<p>Please click <a href="${confirmLink}">here</a> to confirm your Email.</p>`,
    });

    return {
      success: "Confirmation Email Sent!",
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        throw new CustomError("Invalid Code", 400)
      }

      if (twoFactorToken.token.toString() !== code.toString()) {
        throw new CustomError("Invalid Code", 400)
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        throw new CustomError("Code expired", 401)
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendEmail({
        email: twoFactorToken.email,
        subject: "Two Factor Enabled Code",
        html: `<p>2FA code: ${twoFactorToken.token}</p>`,
      });

      return {
        twoFactor: true,
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    return {
      success: "Logged In Successfully."
    }

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error?.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid Credentials",
            code: 409
          };
        default:
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
  }
};
