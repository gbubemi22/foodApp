import { OrderData } from "./type.js";
import mongoose from "mongoose";
export declare const create: (userId: string, payload: OrderData) => Promise<{
    order: mongoose.Document<unknown, {}, import("./type.js").OrderDocument> & mongoose.Document<unknown, any, any> & {
        userId: mongoose.Types.ObjectId;
        vendorId: mongoose.Types.ObjectId;
        orderStatus: string;
        orderId: string;
        items: {
            itemId: mongoose.Types.ObjectId;
            quantity: number;
        }[];
        extras?: {
            itemId: mongoose.Types.ObjectId;
            quantity: number;
        }[];
        deliveryAddress: string;
        latitude: {
            type: Number;
            required: true;
        };
        longitude: {
            type: Number;
            required: true;
        };
        totalAmount: number;
        deliveryFee: number;
        discount?: number;
        vat: number;
        paymentMethod?: string;
        paymentStatus: string;
        deliveryInstructions?: string;
        estimatedDeliveryTime: string;
        actualDeliveryTime?: string;
        reference: string;
        statusHistory: {
            status: string;
            time: Date;
        }[];
        createdAt: Date;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
    paymentUrl: string | null;
}>;
export declare const listOneCustomerOrder: (orderId: string, userId: string) => Promise<{
    success: boolean;
    message: string;
    data: mongoose.Document<unknown, {}, import("./type.js").OrderDocument> & mongoose.Document<unknown, any, any> & {
        userId: mongoose.Types.ObjectId;
        vendorId: mongoose.Types.ObjectId;
        orderStatus: string;
        orderId: string;
        items: {
            itemId: mongoose.Types.ObjectId;
            quantity: number;
        }[];
        extras?: {
            itemId: mongoose.Types.ObjectId;
            quantity: number;
        }[];
        deliveryAddress: string;
        latitude: {
            type: Number;
            required: true;
        };
        longitude: {
            type: Number;
            required: true;
        };
        totalAmount: number;
        deliveryFee: number;
        discount?: number;
        vat: number;
        paymentMethod?: string;
        paymentStatus: string;
        deliveryInstructions?: string;
        estimatedDeliveryTime: string;
        actualDeliveryTime?: string;
        reference: string;
        statusHistory: {
            status: string;
            time: Date;
        }[];
        createdAt: Date;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const listCustomerOrders: (userId: string) => Promise<{
    success: boolean;
    message: string;
    count: number;
    data: (mongoose.Document<unknown, {}, import("./type.js").OrderDocument> & mongoose.Document<unknown, any, any> & {
        userId: mongoose.Types.ObjectId;
        vendorId: mongoose.Types.ObjectId;
        orderStatus: string;
        orderId: string;
        items: {
            itemId: mongoose.Types.ObjectId;
            quantity: number;
        }[];
        extras?: {
            itemId: mongoose.Types.ObjectId;
            quantity: number;
        }[];
        deliveryAddress: string;
        latitude: {
            type: Number;
            required: true;
        };
        longitude: {
            type: Number;
            required: true;
        };
        totalAmount: number;
        deliveryFee: number;
        discount?: number;
        vat: number;
        paymentMethod?: string;
        paymentStatus: string;
        deliveryInstructions?: string;
        estimatedDeliveryTime: string;
        actualDeliveryTime?: string;
        reference: string;
        statusHistory: {
            status: string;
            time: Date;
        }[];
        createdAt: Date;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const trackOrder: (trackId: string, userId: string) => Promise<{
    success: boolean;
    message: string;
    data: {
        order: string;
        statusHistory: {
            status: string;
            time: Date;
        }[];
    };
}>;
export declare const listOneVendorOrder: (orderId: string, vendorId: string) => Promise<{
    success: boolean;
    message: string;
    data: mongoose.Document<unknown, {}, import("./type.js").OrderDocument> & mongoose.Document<unknown, any, any> & {
        userId: mongoose.Types.ObjectId;
        vendorId: mongoose.Types.ObjectId;
        orderStatus: string;
        orderId: string;
        items: {
            itemId: mongoose.Types.ObjectId;
            quantity: number;
        }[];
        extras?: {
            itemId: mongoose.Types.ObjectId;
            quantity: number;
        }[];
        deliveryAddress: string;
        latitude: {
            type: Number;
            required: true;
        };
        longitude: {
            type: Number;
            required: true;
        };
        totalAmount: number;
        deliveryFee: number;
        discount?: number;
        vat: number;
        paymentMethod?: string;
        paymentStatus: string;
        deliveryInstructions?: string;
        estimatedDeliveryTime: string;
        actualDeliveryTime?: string;
        reference: string;
        statusHistory: {
            status: string;
            time: Date;
        }[];
        createdAt: Date;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const listVendorsOrders: (vendorId: string) => Promise<{
    success: boolean;
    message: string;
    data: (mongoose.Document<unknown, {}, import("./type.js").OrderDocument> & mongoose.Document<unknown, any, any> & {
        userId: mongoose.Types.ObjectId;
        vendorId: mongoose.Types.ObjectId;
        orderStatus: string;
        orderId: string;
        items: {
            itemId: mongoose.Types.ObjectId;
            quantity: number;
        }[];
        extras?: {
            itemId: mongoose.Types.ObjectId;
            quantity: number;
        }[];
        deliveryAddress: string;
        latitude: {
            type: Number;
            required: true;
        };
        longitude: {
            type: Number;
            required: true;
        };
        totalAmount: number;
        deliveryFee: number;
        discount?: number;
        vat: number;
        paymentMethod?: string;
        paymentStatus: string;
        deliveryInstructions?: string;
        estimatedDeliveryTime: string;
        actualDeliveryTime?: string;
        reference: string;
        statusHistory: {
            status: string;
            time: Date;
        }[];
        createdAt: Date;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const updateOrderStatus: (orderId: string, vendorId: string, status: string) => Promise<{
    success: boolean;
    message: string;
    data: (mongoose.Document<unknown, {}, import("./type.js").OrderDocument> & mongoose.Document<unknown, any, any> & {
        userId: mongoose.Types.ObjectId;
        vendorId: mongoose.Types.ObjectId;
        orderStatus: string;
        orderId: string;
        items: {
            itemId: mongoose.Types.ObjectId;
            quantity: number;
        }[];
        extras?: {
            itemId: mongoose.Types.ObjectId;
            quantity: number;
        }[];
        deliveryAddress: string;
        latitude: {
            type: Number;
            required: true;
        };
        longitude: {
            type: Number;
            required: true;
        };
        totalAmount: number;
        deliveryFee: number;
        discount?: number;
        vat: number;
        paymentMethod?: string;
        paymentStatus: string;
        deliveryInstructions?: string;
        estimatedDeliveryTime: string;
        actualDeliveryTime?: string;
        reference: string;
        statusHistory: {
            status: string;
            time: Date;
        }[];
        createdAt: Date;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null;
}>;
