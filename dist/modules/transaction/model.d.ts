import mongoose, { Document } from "mongoose";
export interface TransactionDocument extends Document {
    amount: number;
    currency: string;
    status: string;
    orderId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    paymentMethod: string;
    referenceId: string;
}
declare const Transaction: mongoose.Model<TransactionDocument, {}, {}, {}, mongoose.Document<unknown, {}, TransactionDocument> & TransactionDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Transaction;
