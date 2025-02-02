import { Types } from 'mongoose';
export declare type DefaultResponseInterface = {
    success: boolean;
    message: string;
    error?: string;
    data?: any;
    HttpStatusCode?: number;
};
export type DecodedUser = {
    id: Types.ObjectId;
    email: string;
    phone_number?: string;
};
export declare const createSession: (id: string, payload: DecodedUser) => Promise<string>;
export declare const getSession: (id: string) => Promise<any>;
export declare const deleteSession: (id: string) => Promise<boolean>;
