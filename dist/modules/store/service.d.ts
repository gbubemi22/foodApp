import { ItemData, UpdateItemData } from "./model.js";
export declare const add: (vendorId: string, image: string, payload: ItemData) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        vendorId: import("mongoose").Types.ObjectId;
        itemName: string;
        description: string;
        price: number;
        category: string;
        preparationTime: string;
        image: string;
    } & Required<{
        _id: unknown;
    }>>;
}>;
export declare const list: (vendorId: string) => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").ItemDocument> & import("mongoose").Document<unknown, any, any> & {
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
export declare const listOne: (itemId: string, vendorId: string) => Promise<{
    success: boolean;
    message: string;
    data: null;
}>;
export declare const update: (itemId: string, vendorId: string, payload: UpdateItemData) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").ItemDocument> & import("mongoose").Document<unknown, any, any> & {
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
export declare const remove: (itemId: string, vendorId: string) => Promise<{
    success: boolean;
    message: string;
    data: never[];
}>;
