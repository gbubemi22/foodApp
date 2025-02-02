import { UserDataType } from "./type.js";
export declare const create: (payload: UserDataType) => Promise<{
    status: boolean;
    message: string;
    data: {
        id: unknown;
        email: string;
        phoneNumber: string;
        firstName: string;
        lastName: string;
    };
}>;
export declare const login: (phoneNumber: string, email: string, password: string) => Promise<{
    success: boolean;
    message: string;
    user: {
        id: unknown;
        email: string;
        phoneNumber: string;
        firstName: string;
        lastName: string;
    };
    token: string;
}>;
export declare const verifyEmail: (email: string, otp_token: string) => Promise<{
    success: boolean;
    data: (string | (import("mongoose").Document<unknown, {}, import("./type.js").UserDocument> & import("mongoose").Document<unknown, any, any> & {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        otp: string;
        expired_at: Date;
        verifiedEmail: boolean;
        verifiedPhoneNumber: boolean;
        image?: string;
        address: string;
        location: {
            latitude: number;
            longitude: number;
        };
        deviceType: string;
        deviceToken: string;
        deviceName: string;
        comparePassword(candidatePassword: string): Promise<boolean>;
        generateJWT(): Promise<string>;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }))[];
    message: string;
}>;
export declare const sendOtpToMail: (email: string) => Promise<{
    success: boolean;
    message: string;
    data: never[];
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
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        otp: string;
        expired_at: Date;
        verifiedEmail: boolean;
        verifiedPhoneNumber: boolean;
        image?: string;
        address: string;
        location: {
            latitude: number;
            longitude: number;
        };
        deviceType: string;
        deviceToken: string;
        deviceName: string;
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
export declare const getProfile: (userId: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        otp: string;
        expired_at: Date;
        verifiedEmail: boolean;
        verifiedPhoneNumber: boolean;
        image?: string;
        address: string;
        location: {
            latitude: number;
            longitude: number;
        };
        deviceType: string;
        deviceToken: string;
        deviceName: string;
        comparePassword(candidatePassword: string): Promise<boolean>;
        generateJWT(): Promise<string>;
    } & Required<{
        _id: unknown;
    }>>;
}>;
export declare const updateUserProfile: (userId: string, firstName?: string, phoneNumber?: string, email?: string, lastName?: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        otp: string;
        expired_at: Date;
        verifiedEmail: boolean;
        verifiedPhoneNumber: boolean;
        image?: string;
        address: string;
        location: {
            latitude: number;
            longitude: number;
        };
        deviceType: string;
        deviceToken: string;
        deviceName: string;
        comparePassword(candidatePassword: string): Promise<boolean>;
        generateJWT(): Promise<string>;
    } & Required<{
        _id: unknown;
    }>>;
}>;
export declare const uploadImage: (userId: string, image: any) => Promise<{
    status: boolean;
    message: string;
    data: never[];
}>;
