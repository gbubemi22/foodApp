import mongoose from "mongoose";
export type AdminDocument = mongoose.Document & {
    fullName: string;
    email: string;
    password: string;
    role: string;
    otp: string;
    expired_at: Date;
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
export declare enum Role {
    SUPER_ADMIN = "SUPER-ADMIN",
    ADMIN = "ADMIN",
    SUPPORT = "SUPPORT"
}
declare const Admin: mongoose.Model<AdminDocument, {}, {}, {}, mongoose.Document<unknown, {}, AdminDocument> & mongoose.Document<unknown, any, any> & {
    fullName: string;
    email: string;
    password: string;
    role: string;
    otp: string;
    expired_at: Date;
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
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Admin;
export type AdminDataType = {
    fullName: string;
    email: string;
    password: string;
    role: string;
};
