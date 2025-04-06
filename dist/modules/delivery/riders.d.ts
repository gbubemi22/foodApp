export declare const findNearbyRiders: (vendorId: string, orderId: any) => Promise<{
    nearbyRiders: (import("mongoose").Document<unknown, {}, import("../rider/type.js").RiderDocument> & import("mongoose").Document<unknown, any, any> & {
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
    })[];
}>;
export declare const acceptOrder: (riderId: string, orderId: string) => Promise<import("mongoose").Document<unknown, {}, import("../order/type.js").OrderDocument> & import("mongoose").Document<unknown, any, any> & {
    userId: import("mongoose").Types.ObjectId;
    vendorId: import("mongoose").Types.ObjectId;
    riderId?: import("mongoose").Types.ObjectId;
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
}>;
export declare const updateRiderLocation: (riderId: string, newLocation: {
    latitude: number;
    longitude: number;
}) => Promise<import("mongoose").Document<unknown, {}, import("../track/model.js").TrackDocument> & import("mongoose").Document<unknown, any, any> & {
    orderId: import("mongoose").Types.ObjectId;
    riderId: import("mongoose").Types.ObjectId;
    vendorId: import("mongoose").Types.ObjectId;
    customerId: import("mongoose").Types.ObjectId;
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
}>;
export declare const getRiderCurrentLocationByOrder: (orderId: string) => Promise<{
    riderId: import("mongoose").Types.ObjectId;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
    order: import("mongoose").Document<unknown, {}, import("../order/type.js").OrderDocument> & import("mongoose").Document<unknown, any, any> & {
        userId: import("mongoose").Types.ObjectId;
        vendorId: import("mongoose").Types.ObjectId;
        riderId?: import("mongoose").Types.ObjectId;
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
