import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";
import CustomError from "./customError";
import fs from "fs";

interface EmailOptions {
    email: string,
    subject: string,
    template?: string,
    html?: string,
    data?: { [key: string]: any }
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS,
        }
    });

    const { email, subject, template, data, html } = options;

    function listFilesAndDirectories(directoryPath: string) {
        try {
            // Read the contents of the directory
            const items = fs.readdirSync(directoryPath);

            items.forEach(item => {
                // Create the full path of the item
                const fullPath = path.join(directoryPath, item);

                // Check if the item is a directory or file
                const stats = fs.statSync(fullPath);

                if (stats.isDirectory()) {
                    console.log(`Directory: ${fullPath}`);
                } else if (stats.isFile()) {
                    console.log(`File: ${fullPath}`);
                }
            });
        } catch (error) {
            console.error(`Error reading directory: ${error}`);
        }
    }

    let emailHtml;
    if (template && data) {
        console.log(process.cwd());
        console.log(process.cwd(), "mails");
        console.log(listFilesAndDirectories(process.cwd()));
        const templatePath = path.resolve(process.cwd(), "mails", template);
        console.log("template", templatePath);

        try {
            emailHtml = await ejs.renderFile(templatePath, data);
        } catch (error) {
            console.error("Error rendering email template:", error);
            throw new CustomError("Could not render email template", 400);
        }
    } else if (html) {
        emailHtml = html;
    }

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: emailHtml,
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new CustomError("Could not send email", 500);
    }
}

export default sendEmail;