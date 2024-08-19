"use server";

import { getUserByEmail } from "@/data/user";
import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import sendEmail from "@/lib/send-mail";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const { name, email, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new CustomError("User Already Exists", 409);
    }

    //Send Verification Token Email
    const verificationToken = await generateVerificationToken(email);

    if (!verificationToken) {
      throw new CustomError("Error while generating token", 400);
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
      throw new CustomError("Something went wrong", 400);
    }

    return { success: "Confirmation Email Sent!" };
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
