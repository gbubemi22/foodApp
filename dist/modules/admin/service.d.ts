import { AdminDataType } from "./model.js";
export declare const create: (payload: AdminDataType) => Promise<{
    status: boolean;
    message: string;
    data: {
        id: unknown;
        email: string;
        fullName: string;
        role: string;
    };
}>;
export declare const login: (email: string, password: string) => Promise<{
    success: boolean;
    message: string;
    data: {
        id: unknown;
        email: string;
    };
    token: string;
}>;
export declare const getProfile: (adminId: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
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
    }>>;
}>;
export declare const logout: (id: string) => Promise<{
    status: boolean;
    message: string;
    data: {};
}>;
export declare const forgetPassword: (email: string) => Promise<{
    success: boolean;
    message: string;
    data: never[];
}>;
export declare const resetPassword: (email: string, password: string, otp_token: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
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
    }>>;
}>;
