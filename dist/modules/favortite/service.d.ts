export declare const create: (userId: string, itemId: string) => Promise<{
    status: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").FavoriteDocument> & import("mongoose").Document<unknown, any, any> & {
        userId: import("mongoose").Types.ObjectId;
        itemId: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const listAllFavorite: (userId: string) => Promise<{
    status: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").FavoriteDocument> & import("mongoose").Document<unknown, any, any> & {
        userId: import("mongoose").Types.ObjectId;
        itemId: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const listOneFavorite: (itemId: string, userId: string) => Promise<{
    status: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").FavoriteDocument> & import("mongoose").Document<unknown, any, any> & {
        userId: import("mongoose").Types.ObjectId;
        itemId: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const remove: (itemId: string, userId: string) => Promise<{
    status: boolean;
    message: string;
    data: {};
}>;
