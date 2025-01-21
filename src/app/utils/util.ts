import otpGenerator from "otp-generator";
import mongoose from "mongoose";
import { encodeJwt } from "./constant.js";
import { v1 as uuidV1, v4 as uuidV4, validate as UUIDValidation } from "uuid";
import mime from "mime-types";
import axios from 'axios';

export const connectDB = (url: string) => {
  mongoose.set("strictQuery", false);

  return mongoose.connect(url);
};

const generateOTP = () => {
  const OTP = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return OTP;
};

export const generateReferralCode = (): string => {
  // Generate 3 random lowercase letters
  const letters = Array(3)
    .fill(null)
    .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
    .join('');

  // Generate 3 random numbers
  const numbers = Array(3)
    .fill(null)
    .map(() => Math.floor(Math.random() * 10))
    .join('');

  return `${letters}-${numbers}`;
};

const getOtpExpiryTime = () => {
  const expiredAtDate = new Date(new Date().getTime() + 1000 * 60 * 10); // 10 minutes
  return expiredAtDate;
};

const validateFileType = (file: any): boolean => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
  const fileMimeType = mime.lookup(file.originalname); // Lookup MIME type by filename

  // Check if MIME type is valid and within the allowed list
  fileMimeType && allowedMimeTypes.includes(fileMimeType);

  return true;
};

export type VerifyEmailDataType = {
  token: string;
  subject: string;
  name: string;
};

export type OtpDataType = {
  otp: string;
  name: string;
  subject: string;
};

export type PrepareMailDataType = {
  mailRecipients: string[] | string;
  mailSubject?: string;
  mailBody: string;
  senderName: string;
  senderEmail: string;
};

export type SendMailDataType = {
  senderName: string;
  senderEmail: string;
  mailRecipients: string[] | string;
  mailSubject?: string;
  mailBody: string;
  mailAttachments?: string;
};

// export const sendSMS = async (phoneNumber: string, token: string) => {
//   try {
//     const message = `Hello, your Insurance authentication code is ${token}. Expires in 10 minutes. PLEASE DO NOT SHARE.`;
//     const fullPhoneNumber = `234${phoneNumber.slice(1)}`;
//     const data = {
//       to: fullPhoneNumber,
//       sms: message,
//       channel: 'generic',
//       type: 'plain',
//       from: process.env.TERMII_SENDER_ID,
//       api_key: process.env.TERMII_API_KEY as string,
//     };

//     // Send the SMS using the Termii API
//     const response = await axios.post(
//       'https://api.ng.termii.com/api/sms/send',
//       data,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log('SMS sent successfully:', response.data);
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//     throw new Error('Error sending SMS');
//   }
// };

export const sendSMS = async (phoneNumber: string, message: any) => {
  const fullPhoneNumber = `234${phoneNumber.slice(1)}`;

  const url = "https://api.sendchamp.com/api/v1/sms/send";
  const headers = {
    Accept: "application/json,text/plain,*/*",
    "Content-Type": "application/json",
    Authorization:
      "Bearer sendchamp_live_$2a$10$rZKsZeYMKCEtjB203tI.zeLgW1M1B2EZvM3NLdJ6mOebED0zYvy5y",
  };
  const data = {
    to: fullPhoneNumber,
    message,
    sender_name: "SAlert",
    route: "dnd",
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log("SMS sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

export { generateOTP, getOtpExpiryTime, validateFileType };
