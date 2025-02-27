export declare const listAll: () => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("../store/model.js").ItemDocument> & import("mongoose").Document<unknown, any, any> & {
        vendorId: import("mongoose").Types.ObjectId;
        itemName: string;
        description: string;
        price: number;
        category: string;
        preparationTime: string;
        image: string;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const listOneForCustomer: (itemId: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("../store/model.js").ItemDocument> & import("mongoose").Document<unknown, any, any> & {
        vendorId: import("mongoose").Types.ObjectId;
        itemName: string;
        description: string;
        price: number;
        category: string;
        preparationTime: string;
        image: string;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const listFreshFoodForCustomer: () => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("../store/model.js").ItemDocument> & import("mongoose").Document<unknown, any, any> & {
        vendorId: import("mongoose").Types.ObjectId;
        itemName: string;
        description: string;
        price: number;
        category: string;
        preparationTime: string;
        image: string;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const listFoodForCustomer: () => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("../store/model.js").ItemDocument> & import("mongoose").Document<unknown, any, any> & {
        vendorId: import("mongoose").Types.ObjectId;
        itemName: string;
        description: string;
        price: number;
        category: string;
        preparationTime: string;
        image: string;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const listExtrasForCustomer: () => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("../store/model.js").ItemDocument> & import("mongoose").Document<unknown, any, any> & {
        vendorId: import("mongoose").Types.ObjectId;
        itemName: string;
        description: string;
        price: number;
        category: string;
        preparationTime: string;
        image: string;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
