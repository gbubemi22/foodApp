import mongoose from "mongoose";

export type OrderDocument = mongoose.Document & {
  userId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  orderStatus: string;
  orderId: string;
  items: {
    itemId: mongoose.Types.ObjectId;
    quantity: number;
  }[];

  extras?: {
    itemId: mongoose.Types.ObjectId;
    quantity: number;
  }[];

  deliveryAddress: string;
  latitude: { type: Number; required: true };
  longitude: { type: Number; required: true };
  totalAmount: number;
  deliveryFee: number;
  discount?: number;
  vat: number;
  paymentMethod?: string;
  paymentStatus: string;
  deliveryInstructions?: string;
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  reference: string;
  statusHistory: {
    status: string;
    time: Date;
  }[];
  createdAt:Date
};

export enum OrderStatusEnum {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  ENROUTE = "ENROUTE",
  READY = "READY",
  CONFIRMED = "CONFIRMED",
  DELIVERED = "DELIVERED",
}

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}

export type OrderData = {
  vendorId: mongoose.Types.ObjectId;
  orderStatus: string;
  orderId: string;
  items: {
    itemId: mongoose.Types.ObjectId;
    quantity: number;
  }[];

  extras: {
    itemId: mongoose.Types.ObjectId;
    quantity: number;
  }[];

  deliveryAddress: string;
  latitude: number;
  longitude: number;
  totalAmount: number;
  deliveryFee: number;
  discount?: number;
  vat: number;
  paymentMethod?: string;
  paymentStatus: string;
  deliveryInstructions: string;
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  reference?: string;
};
