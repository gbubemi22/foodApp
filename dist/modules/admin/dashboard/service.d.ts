import { StatusEnum } from "../../vendor/type.js";
export declare const totals: () => Promise<{
    success: boolean;
    message: string;
    data: {
        customers: number;
        vendors: number;
        totalIncome: any;
    };
}>;
export declare const pendingVendors: () => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("../../vendor/type.js").VendorDocument> & import("mongoose").Document<unknown, any, any> & {
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
    })[];
}>;
export declare const activeVendors: () => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("../../vendor/type.js").VendorDocument> & import("mongoose").Document<unknown, any, any> & {
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
    })[];
}>;
export declare const getVendor: (vendorId: string) => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("../../vendor/type.js").VendorDocument> & import("mongoose").Document<unknown, any, any> & {
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
    }) | null;
}>;
export declare const approveOrReject: (vendorId: string, status: StatusEnum) => Promise<{
    status: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("../../vendor/type.js").VendorDocument> & import("mongoose").Document<unknown, any, any> & {
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
    }) | null;
}>;
export declare const blockAndUnblockVendor: (vendorId: string) => Promise<{
    status: boolean;
    message: string;
}>;
export declare const getTopPerformingVendors: (limit?: number) => Promise<{
    success: boolean;
    message: string;
    data: any[];
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: unknown;
    data?: undefined;
}>;
export declare const recentOrders: () => Promise<{
    success: boolean;
    message: string;
    data: {
        orderId: unknown;
        customerEmail: any;
        orderStatus: string;
        createdAt: Date;
        items: {
            itemName: any;
            itemPrice: any;
            quantity: number;
        }[];
    }[];
}>;
