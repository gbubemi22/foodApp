import mongoose from "mongoose";
export type UserDocument = mongoose.Document & {
    email: string;
    password: string;
    phoneNumber: string;
    fullName: string;
    otp: string;
    expired_at: Date;
    verifiedEmail: boolean;
    verifiedPhoneNumber: boolean;
    image?: string;
    lastLoginDevice: {
        userAgent: String;
        appVersion: String;
        platform: String;
        platformVersion: String;
        device: String;
        notificationToken: String;
        expoPushNotificationToken: String;
        devicePushNotificationToken: String;
    };
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateJWT(): Promise<string>;
};
export type UserDataType = {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    otp: string;
    expired_at: Date;
};
