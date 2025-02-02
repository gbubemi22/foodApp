import mongoose from "mongoose";
export type UserDocument = mongoose.Document & {
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
};
export type UserDataType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    otp: string;
    expired_at: Date;
};
