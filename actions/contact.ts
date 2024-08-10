"use server";

import { getUserById } from "@/data/user";
import CustomError from "@/lib/customError";
import sendEmail from "@/lib/send-mail";
import { ContactSchema } from "@/schemas";
import { validateContact } from "@/validations";
import * as z from "zod";

export const contact = async (values: z.infer<typeof ContactSchema>) => {
    try {
        const validateData = validateContact(values);
        const { name, email, subject, message, authorId } = validateData;

        let recipientEmail = "s74078961@gmail.com";

        if (authorId) {
            const author = await getUserById(authorId as string);
            if (!author) {
                throw new CustomError("Author Not Found", 404);
            }
            recipientEmail = author.email;
        }

        await sendEmail({
            email: recipientEmail,
            subject: subject,
            template: "contact.ejs",
            data: {
                name: name,
                email: email,
                subject: subject,
                message: message,
            }
        });

        await sendEmail({
            email: email,
            subject: subject,
            template: "thank.ejs",
            data: {
                name: name,
                email: email,
                subject: subject,
                message: message,
            }
        });

        return {
            success: "Form Submission successfully. You will get reply in few days."
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