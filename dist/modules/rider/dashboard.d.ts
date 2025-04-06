import mongoose from "mongoose";
export declare const allOrders: (riderId: string) => Promise<{
    status: boolean;
    message: string;
    data: (mongoose.Document<unknown, {}, import("../order/type.js").OrderDocument> & mongoose.Document<unknown, any, any> & {
        userId: mongoose.Types.ObjectId;
        vendorId: mongoose.Types.ObjectId;
        riderId?: mongoose.Types.ObjectId;
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
export declare const stat: (riderId: string) => Promise<{
    totalOrders: number;
    requests: number;
}>;
export declare const getUserAverageRating: (riderId: string) => Promise<{
    status: boolean;
    message: string;
    averageRating: any;
}>;
export declare const activeDelivery: (riderId: string) => Promise<{
    status: boolean;
    message: string;
    data: (mongoose.Document<unknown, {}, import("../track/model.js").TrackDocument> & mongoose.Document<unknown, any, any> & {
        orderId: mongoose.Types.ObjectId;
        riderId: mongoose.Types.ObjectId;
        vendorId: mongoose.Types.ObjectId;
        customerId: mongoose.Types.ObjectId;
        status: string;
        pickupLocation: {
            latitude: number;
            longitude: number;
        };
        currentLocation: {
            latitude: number;
            longitude: number;
        };
        destination: {
            latitude: number;
            longitude: number;
        };
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
