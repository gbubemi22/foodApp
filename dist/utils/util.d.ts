import mongoose from "mongoose";
export declare const connectDB: (url: string) => Promise<typeof mongoose>;
declare const generateOTP: () => string;
export declare const generateReferralCode: () => string;
declare const getOtpExpiryTime: () => Date;
declare const validateFileType: (file: any) => boolean;
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
export declare const sendSMS: (phoneNumber: string, message: any) => Promise<void>;
export { generateOTP, getOtpExpiryTime, validateFileType };
