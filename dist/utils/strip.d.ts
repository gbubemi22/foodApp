export declare const initiatePayment: (amount: number, currency: string, referenceId: string) => Promise<string | null>;
export declare const verifyPayment: (sessionId: string) => Promise<{
    message: string;
    order: import("mongoose").Document<unknown, {}, import("../modules/order/type.js").OrderDocument> & import("mongoose").Document<unknown, any, any> & {
        userId: import("mongoose").Types.ObjectId;
        vendorId: import("mongoose").Types.ObjectId;
        orderStatus: string;
        orderId: string;
        items: {
            itemId: import("mongoose").Types.ObjectId;
            quantity: number;
        }[];
        extras?: {
            itemId: import("mongoose").Types.ObjectId;
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
