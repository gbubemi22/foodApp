import { VendorDataType } from "./type.js";
export declare const create: (payload: VendorDataType) => Promise<{
    status: boolean;
    message: string;
    data: never[];
}>;
export declare const login: (phoneNumber: string, password: string) => Promise<{
    success: boolean;
    message: string;
    user: {
        id: unknown;
        phoneNumber: string;
    };
    token: string;
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
export declare const getProfile: (vendorId: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        businessName: string;
        businessDescription: string;
        password: string;
        businessAddress: string;
        location: {
            latitude: number;
            longitude: number;
        };
        role: string;
        status: string;
        block?: boolean;
        otp?: string;
        expired_at: Date;
        image?: string;
        deviceType: string;
        deviceToken: string;
        deviceName: string;
        comparePassword(candidatePassword: string): Promise<boolean>;
        generateJWT(): Promise<string>;
    } & Required<{
        _id: unknown;
    }>>;
}>;
