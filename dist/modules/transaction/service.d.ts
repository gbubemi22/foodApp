export declare const list: (userId: string) => Promise<{
    success: boolean;
    message: string;
    count: number;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").TransactionDocument> & import("./model.js").TransactionDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const listOne: (trxId: string, userId: string) => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").TransactionDocument> & import("./model.js").TransactionDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null;
}>;
