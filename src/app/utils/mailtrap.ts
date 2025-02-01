import * as dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';



// Load environment variables
const SMTP_HOST = process.env.SMTP_HOST as string;
const SMTP_PORT = parseInt(process.env.SMTP_PORT as string);
const SMTP_USERNAME = process.env.SMTP_USERNAME as string;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;
const SMTP_AUTH_METHOD = process.env.SMTP_AUTH_METHOD as string;
const SMTP_STARTTLS_REQUIRED = process.env.SMTP_STARTTLS_REQUIRED === 'true';

const sendEmail = async (email: string, subject: string, html: string) => {
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
    } as nodemailer.TransportOptions);

    await transporter.sendMail({
      from: `"Quick-Food" ${process.env.SENDERS_EMAIL}`,
      to: email,
      subject: subject,
      html: html,
    });
    console.log('email sent successfully');
  } catch (error) {
    console.log('email not sent');
    console.log('the Error', error);
  }
};

export default sendEmail;

// Create a nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: SMTP_HOST,
//   port: SMTP_PORT,
//   auth: {
//     user: SMTP_USERNAME,
//     pass: SMTP_PASSWORD,
//   },
//   secure: SMTP_STARTTLS_REQUIRED,
// });

// Send mail function
// export const sendMail = async ({
//   html,
//   subject,
//   to: [{ email: toEmail }],
// }: PrepareMailDataType) => {
//   try {
//     // Define the mail options
//     const mailOptions: nodemailer.SendMailOptions = {
//       from: SMTP_USERNAME,
//       to: toEmail,
//       subject: subject,
//       html: html
//     };

//     // Send the mail
//     const info = await transporter.sendMail(mailOptions);

//     console.log('Email sent successfully:', info.response);
//     return { status: 'success', message: 'Email sent successfully', response: info.response };
//   } catch (error) {
//     console.error('Failed to send email:', error);
//     return { status: 'error', message: 'Failed to send email', error };
//   }
// };




// import * as dotenv from "dotenv";
// dotenv.config();
// import nodemailer from "nodemailer";

// // Load environment variables
// const SMTP_HOST = (process.env.SMTP_HOST as string) || "smtp.zoho.com";
// const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
// const SMTP_USERNAME = process.env.SMTP_USERNAME as string;
// const SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;
// const SMTP_AUTH_METHOD = process.env.SMTP_AUTH_METHOD as string;
// const SMTP_STARTTLS_REQUIRED = process.env.SMTP_STARTTLS_REQUIRED === "true";

// const sendEmail = async (email: string, subject: string, html: string) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: SMTP_HOST,
//       port: SMTP_PORT,
//       auth: {
//         user: SMTP_USERNAME,
//         pass: SMTP_PASSWORD,
//       },
//       secure: SMTP_PORT === 465, // Use true for SSL (port 465), false for TLS (port 587)
//       tls: {
//         rejectUnauthorized: SMTP_STARTTLS_REQUIRED,
//       },
//     } as nodemailer.TransportOptions);

//     await transporter.sendMail({
//       from: `"QuickFoodShop" ${process.env.SENDERS_EMAIL}`,
//       to: email,
//       subject: subject,
//       html: html,
//     });
//     console.log("email sent successfully");
//   } catch (error) {
//     console.log("email not sent");
//     console.log("the Error", error);
//   }
// };

// export default sendEmail;
