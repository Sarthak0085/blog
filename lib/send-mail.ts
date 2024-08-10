import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";

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
        //get the path of email template file
        const templatePath = path.resolve(process.cwd(), 'mails', template);
        console.log("template", templatePath);

        try {
            emailHtml = await ejs.renderFile(templatePath, data);
        } catch (error) {
            console.error("Error rendering email template:", error);
            throw new Error("Could not render email template");
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
        throw new Error("Could not send email");
    }
}

export default sendEmail;