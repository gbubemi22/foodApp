import mongoose from "mongoose";
import { OrderDocument } from "./type.js";
declare const Order: mongoose.Model<OrderDocument, {}, {}, {}, mongoose.Document<unknown, {}, OrderDocument> & mongoose.Document<unknown, any, any> & {
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
}, any>;
export default Order;
