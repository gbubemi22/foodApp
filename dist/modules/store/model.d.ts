import mongoose from "mongoose";
export type ItemDocument = mongoose.Document & {
    vendorId: mongoose.Types.ObjectId;
    itemName: string;
    description: string;
    price: number;
    category: string;
    preparationTime: string;
    image: string;
};
export type ItemData = {
    itemName: string;
    description: string;
    price: number;
    category: string;
    preparationTime: string;
};
export type UpdateItemData = {
    itemName?: string;
    description?: string;
    price?: number;
    category?: string;
    preparationTime: number;
    image?: string;
};
declare const Item: mongoose.Model<ItemDocument, {}, {}, {}, mongoose.Document<unknown, {}, ItemDocument> & mongoose.Document<unknown, any, any> & {
    vendorId: mongoose.Types.ObjectId;
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
}, any>;
export default Item;
