import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";
import CustomError from "./customError";

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

    let emailHtml;
    if (template && data) {
        const templatePath = `https://vortex-vista.vercel.app/mails/${template}` ?? path.resolve('public', 'mails', template);
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