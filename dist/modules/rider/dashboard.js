import mongoose from "mongoose";
import Order from "../order/model.js";
import Review from "../review/model.js";
import Track from "../track/model.js";
export const allOrders = async (riderId) => {
    const orders = await Order.find({ riderId: riderId });
    return {
        status: true,
        message: `Fetched Successfully`,
        data: orders,
    };
};
export const stat = async (riderId) => {
    const totalOrders = await Order.countDocuments({ riderId: riderId });
    const requests = await Track.countDocuments({ riderId: riderId });
    return {
        totalOrders,
        requests
    };
};
export const getUserAverageRating = async (riderId) => {
    const result = await Review.aggregate([
        { $match: { profileId: new mongoose.Types.ObjectId(riderId) } }, // Filter reviews by userId
        { $group: { _id: null, averageRating: { $avg: "$rating" } } }, // Calculate average rating
    ]);
    return {
        status: true,
        message: "Average rating fetched successfully",
        averageRating: result.length > 0 ? result[0].averageRating : 0,
    };
};
export const activeDelivery = async (riderId) => {
    const result = await Track.find({
        riderId: riderId,
        status: { $ne: "DELIVERED" },
    });
    return {
        status: true,
        message: "Active delivery fetched successfully",
        data: result,
    };
};
