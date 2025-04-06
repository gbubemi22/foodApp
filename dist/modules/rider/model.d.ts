import mongoose from "mongoose";
import { RiderDocument } from "./type.js";
declare const Rider: mongoose.Model<RiderDocument, {}, {}, {}, mongoose.Document<unknown, {}, RiderDocument> & mongoose.Document<unknown, any, any> & {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    otp: string;
    expired_at: Date;
    verifiedEmail: boolean;
    verifiedPhoneNumber: boolean;
    status: boolean;
    image?: string;
    address: string;
    location: {
        latitude: number;
        longitude: number;
    };
    isAvailable: string;
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
export default Rider;
