"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";

export const verification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      throw new CustomError("token doesn't exist", 404);
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      throw new CustomError("Token Expired", 400);
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      throw new CustomError("User doesn't exist", 404);
    }

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: "Email Verified",
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
