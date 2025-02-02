import mongoose from "mongoose";
import { UserDocument } from "./type.js";
declare const User: mongoose.Model<UserDocument, {}, {}, {}, mongoose.Document<unknown, {}, UserDocument> & mongoose.Document<unknown, any, any> & {
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
}, any>;
export default User;
