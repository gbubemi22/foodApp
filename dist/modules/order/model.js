import mongoose from "mongoose";
import { OrderStatusEnum, PaymentStatusEnum } from "./type.js";
const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
    },
    orderStatus: {
        type: String,
        enum: OrderStatusEnum,
        default: OrderStatusEnum.PENDING,
    },
    orderId: { type: String, required: true },
    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    extras: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
                required: false,
            },
            quantity: { type: Number, required: true },
        },
    ],
    deliveryAddress: {
        type: String,
        required: true,
    },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    vat: { type: Number, required: true },
    paymentMethod: { type: String, required: false },
    paymentStatus: {
        type: String,
        enum: PaymentStatusEnum,
        default: PaymentStatusEnum.PENDING,
    },
    deliveryInstructions: { type: String },
    estimatedDeliveryTime: { type: String },
    actualDeliveryTime: { type: String },
    reference: {
        type: String,
        required: true,
    },
    statusHistory: [
        {
            status: { type: String, required: false },
            timestamp: { type: Date, required: true },
        },
    ],
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
    collection: " Order",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
const Order = mongoose.model("Order", OrderSchema);
export default Order;
