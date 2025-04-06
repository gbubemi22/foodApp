import mongoose from 'mongoose';
export type ReviewDocument = mongoose.Document & {
    riderId: mongoose.Schema.Types.ObjectId;
    reviewer: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: string;
};
declare const Review: mongoose.Model<ReviewDocument, {}, {}, {}, mongoose.Document<unknown, {}, ReviewDocument> & mongoose.Document<unknown, any, any> & {
    riderId: mongoose.Schema.Types.ObjectId;
    reviewer: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: string;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Review;
