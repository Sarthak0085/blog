"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import sendEmail from "@/lib/send-mail";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values);
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  console.log(existingUser);

  if (existingUser) {
    return { error: "User Already Exists" };
  }

  //Send Verification Token Email
  const verificationToken = await generateVerificationToken(email);

  if (!verificationToken) {
    return {
      error: "Error while generating token",
    };
  }

  const confirmLink = `http://localhost:3000/auth/verification?token=${verificationToken.token}`;

  await sendEmail({
    email: email,
    subject: "Confirm your Email",
    html: `<p>Please click <a href="${confirmLink}">here</a> to confirm your Email.</p>`,
  });

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      error: "Something went wrong!",
    };
  }

  return { success: "Confirmation Email Sent!" };
};
