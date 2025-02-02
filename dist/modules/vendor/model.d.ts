import mongoose from "mongoose";
import { VendorDocument } from "./type.js";
declare const Vendor: mongoose.Model<VendorDocument, {}, {}, {}, mongoose.Document<unknown, {}, VendorDocument> & mongoose.Document<unknown, any, any> & {
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
}> & {
    __v: number;
}, any>;
export default Vendor;
