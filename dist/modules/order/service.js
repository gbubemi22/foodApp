import { haversineDistance } from "../../utils/distanceCal.js";
import { generateRandomNumber, generateRandomString, } from "../../utils/constant.js";
import { initiatePayment } from "../../utils/strip.js";
import Item from "../store/model.js";
import Order from "./model.js";
import { OrderStatusEnum } from "./type.js";
import Vendor from "../vendor/model.js";
import { NotFoundError } from "../../utils/error.js";
import mongoose from "mongoose";
import Transaction from "../transaction/model.js";
export const create = async (userId, payload) => {
    // Step 2: Fetch all items from the database
    const itemIds = payload.items.map((item) => item.itemId);
    const items = await Item.find({ _id: { $in: itemIds } });
    if (items.length !== payload.items.length) {
        throw new NotFoundError("One or more items are invalid or unavailable");
    }
    // Step 3: Validate item details and calculate total amount
    let totalAmount = 0;
    let vendorId = null;
    for (const payloadItem of payload.items) {
        const dbItem = items.find((item) => new mongoose.Types.ObjectId(item._id).toString() ===
            new mongoose.Types.ObjectId(payloadItem.itemId).toString());
        if (!dbItem) {
            throw new NotFoundError(`Item with ID ${payloadItem.itemId} not found`);
        }
        // Apply discount if available
        const discount = dbItem.discount ? dbItem.discount : 0; // Assume discount is in absolute value
        const finalPrice = dbItem.price - discount > 0 ? dbItem.price - discount : 0;
        totalAmount += finalPrice * payloadItem.quantity;
        vendorId = dbItem.vendorId;
    }
    // Handle Extras
    // Calculate total amount for extras
    if (payload.extras?.length > 0) {
        for (const payloadExtra of payload.extras) {
            const dbExtra = items.find((item) => new mongoose.Types.ObjectId(item._id).toString() ===
                new mongoose.Types.ObjectId(payloadExtra.itemId).toString());
            if (!dbExtra)
                throw new NotFoundError(`Extra item with ID ${payloadExtra.itemId} not found`);
            totalAmount += dbExtra.price * payloadExtra.quantity;
        }
    }
    // Step 5: Fetch vendor location
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
        throw new NotFoundError(`Vendor with ID ${vendorId} not found`);
    }
    // Step 6: Calculate distance between vendor and user
    const userLocation = {
        latitude: payload.latitude,
        longitude: payload.longitude,
    };
    const distanceInKm = haversineDistance({
        latitude: vendor.location.latitude,
        longitude: vendor.location.longitude,
    }, userLocation);
    console.log(`Distance: ${distanceInKm.toFixed(2)} km`);
    // Step 7: Calculate delivery fee (e.g., $50 per km)
    const deliveryFeePerKm = 300;
    const deliveryFee = distanceInKm * deliveryFeePerKm;
    // Step 8: Calculate VAT (7% of total amount)
    const vat = 0.07 * totalAmount;
    // Step 9: Update total amount with delivery fee and VAT
    totalAmount += deliveryFee + vat;
    console.log(`Total Amount: ${totalAmount.toFixed(2)}`);
    console.log(`VAT: ${vat.toFixed(2)}`);
    console.log(`Delivery Fee: ${deliveryFee.toFixed(2)}`);
    // Step 10: Generate order number and reference
    const orderNumber = generateRandomNumber();
    const ref = generateRandomString();
    // Step 11: Create a new order instance
    const newOrder = new Order({
        userId,
        ...payload,
        totalAmount: totalAmount.toFixed(2),
        deliveryFee: deliveryFee.toFixed(2),
        vat: vat.toFixed(2),
        vendorId: vendor._id,
        estimatedDeliveryTime: "30 minutes",
        orderId: orderNumber,
        reference: ref,
    });
    const totalAmountInKobo = Math.round(totalAmount * 100);
    console.log(`Total Amount in Kobo: ${totalAmountInKobo}`);
    // Step 12: Save the order to the database
    const savedOrder = await newOrder.save();
    await Transaction.create({
        amount: totalAmount,
        currency: "ngn",
        status: "PENDING",
        orderId: savedOrder._id,
        userId: userId,
        paymentMethod: "Card",
        referenceId: ref,
    });
    // Step 13: Initiate the payment process
    const paymentUrl = await initiatePayment(totalAmountInKobo, "ngn", newOrder.reference);
    // Step 14: Return the created order and payment URL
    return {
        order: savedOrder,
        paymentUrl,
    };
};
/////// Customers  ///////
export const listOneCustomerOrder = async (orderId, userId) => {
    const order = await Order.findOne({ _id: orderId, userId: userId }).populate("vendorId");
    if (!order)
        throw new NotFoundError(`Order not found for this Customer ${userId}`);
    return {
        success: true,
        message: `Fetched Successfully`,
        data: order,
    };
};
export const listCustomerOrders = async (userId) => {
    const orders = await Order.find({ userId: userId });
    return {
        success: true,
        message: `Fetched Successfully`,
        count: orders.length,
        data: orders,
    };
};
export const trackOrder = async (trackId, userId) => {
    const order = await Order.findOne({ orderId: trackId, userId: userId });
    if (!order)
        throw new NotFoundError(`Order not found for this Customer ${userId}`);
    return {
        success: true,
        message: `Fetched Successfully`,
        data: {
            order: order.orderStatus,
            statusHistory: order.statusHistory,
        },
    };
};
/////// Vendors  ///////
export const listOneVendorOrder = async (orderId, vendorId) => {
    const order = await Order.findOne({
        _id: orderId,
        vendorId: vendorId,
    }).populate("vendorId");
    if (!order)
        throw new NotFoundError(`Order not found for this Vendor ${vendorId}`);
    return {
        success: true,
        message: `Fetched Successfully`,
        data: order,
    };
};
export const listVendorsOrders = async (vendorId) => {
    const orders = await Order.find({ vendorId: vendorId });
    return {
        success: true,
        message: `Fetched Successfully`,
        data: orders,
    };
};
export const updateOrderStatus = async (orderId, vendorId, status) => {
    console.log("Received status:", status);
    if (!Object.values(OrderStatusEnum).includes(status)) {
        throw new Error(`Invalid order status: ${status}`);
    }
    console.log("Updating order status with:", typeof status, status);
    const order = await Order.findOneAndUpdate({ _id: orderId, vendorId: vendorId }, { $set: { orderStatus: status } }, { new: true, runValidators: true });
    const updates = await Order.findOneAndUpdate({ _id: orderId, vendorId: vendorId }, {
        $push: {
            statusHistory: {
                status: status,
                time: new Date(),
            },
        },
    }, { new: true });
    if (!order)
        throw new NotFoundError(`Order not found for this Vendor ${vendorId}`);
    if (order.paymentStatus !== "PAID")
        throw new NotFoundError(`Payment not completed for this order`);
    return {
        success: true,
        message: `Order status updated successfully`,
        data: updates,
    };
};
