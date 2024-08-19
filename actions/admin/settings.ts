"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import sendEmail from "@/lib/send-mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "Unauthorized!",
    };
  }

  const dbUser = await getUserById(user?.id as string);

  if (!dbUser) {
    return {
      error: "Unauthorized!",
    };
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
      email: values.email,
      subject: "Confirm your Email",
      html: `<p>Please click <a href="${confirmLink}">here</a> to confirm your Email.</p>`,
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
      return {
        error: "InCorrect Password",
      };
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
};
