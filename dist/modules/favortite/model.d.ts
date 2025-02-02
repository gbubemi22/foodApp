import mongoose from "mongoose";
export type FavoriteDocument = mongoose.Document & {
    userId: mongoose.Types.ObjectId;
    itemId: mongoose.Types.ObjectId;
};
declare const Favorite: mongoose.Model<FavoriteDocument, {}, {}, {}, mongoose.Document<unknown, {}, FavoriteDocument> & mongoose.Document<unknown, any, any> & {
    userId: mongoose.Types.ObjectId;
    itemId: mongoose.Types.ObjectId;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Favorite;
