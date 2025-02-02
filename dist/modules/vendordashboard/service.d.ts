export declare const getVendorPerformance: (vendorId: string) => Promise<{
    success: boolean;
    message: string;
    data: any;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: unknown;
    data?: undefined;
}>;
export declare const getRecentOrdersForVendor: (vendorId: string, limit?: number) => Promise<{
    success: boolean;
    message: string;
    data: {
        orderId: unknown;
        customer: {
            name: string;
            email: any;
        };
        orderStatus: string;
        createdAt: Date;
        items: {
            itemName: any;
            itemPrice: any;
            quantity: number;
        }[];
        totalAmount: number;
    }[];
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: unknown;
    data?: undefined;
}>;
export declare const topSellingItemForVendor: (vendorId: string) => Promise<{
    success: boolean;
    message: string;
    data: null;
} | {
    success: boolean;
    message: string;
    data: {
        name: any;
        price: any;
        totalSold: any;
        totalRevenue: any;
    };
}>;
export declare const trackOrder: (trackId: string, vendorId: string) => Promise<{
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
