import mongoose, { Schema, Document } from "mongoose";
import { PaymentStatusEnum } from "../order/type.js";

export interface TransactionDocument extends Document {
  amount: number;
  currency: string;
  status: string;
  orderId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  paymentMethod: string;
  referenceId: string;
}

const transactionSchema = new Schema<TransactionDocument>(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: {
      type: String,
      enum: PaymentStatusEnum,
      default: PaymentStatusEnum.PENDING,
    },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: { type: String, required: true },
    referenceId: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: " Transaction",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Transaction = mongoose.model<TransactionDocument>(
  "Transaction",
  transactionSchema
);

export default Transaction;
