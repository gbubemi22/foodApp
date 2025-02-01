import mongoose from "mongoose";
export type VendorDocument = mongoose.Document & {
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
};
export type VendorDataType = {
    vendorName: string;
    vendorDescription: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
};
export declare enum StatusEnum {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
