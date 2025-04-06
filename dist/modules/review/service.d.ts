import mongoose from 'mongoose';
export declare const getUserAverageRating: (profileId: string) => Promise<{
    status: boolean;
    message: string;
    averageRating: any;
}>;
export declare const getUserReviews: (userId: string) => Promise<{
    status: boolean;
    message: string;
    data: (mongoose.FlattenMaps<import("./model.js").ReviewDocument> & Required<{
        _id: mongoose.FlattenMaps<unknown>;
    }> & {
        __v: number;
    })[];
}>;
export declare const updateReview: (reviewId: string, profileId: string, rating: number, comment?: string) => Promise<{
    status: boolean;
    message: string;
    data: mongoose.Document<unknown, {}, import("./model.js").ReviewDocument> & mongoose.Document<unknown, any, any> & {
        riderId: mongoose.Schema.Types.ObjectId;
        reviewer: mongoose.Schema.Types.ObjectId;
        rating: number;
        comment: string;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
