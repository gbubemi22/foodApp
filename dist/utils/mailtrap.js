import * as dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
// Load environment variables
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT);
const SMTP_USERNAME = process.env.SMTP_USERNAME;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_AUTH_METHOD = process.env.SMTP_AUTH_METHOD;
const SMTP_STARTTLS_REQUIRED = process.env.SMTP_STARTTLS_REQUIRED === 'true';
const sendEmail = async (email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST || 'live.smtp.mailtrap.io',
            port: SMTP_PORT || 587,
            //secure: true,
            auth: {
                user: SMTP_USERNAME || 'api',
                pass: process.env.SMTP_PASSWORD || '5a2460ef951e4415adaa5e16f50e8a3a',
                authMethod: 'PLAIN,LOGIN',
            },
            debug: true,
            STARTTLS: SMTP_STARTTLS_REQUIRED,
        });
        await transporter.sendMail({
            from: `"Swapspace" ${process.env.SENDERS_EMAIL}`,
            to: email,
            subject: subject,
            html: html,
        });
        console.log('email sent successfully');
    }
    catch (error) {
        console.log('email not sent');
        console.log('the Error', error);
    }
};
export default sendEmail;
