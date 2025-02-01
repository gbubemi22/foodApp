import mongoose from "mongoose";
import Order from "../order/model.js";
import { NotFoundError } from "../../utils/error.js";

export const getVendorPerformance = async (vendorId: string) => {
  try {
    // Aggregate to calculate total income, total customers, and total orders
    const result = await Order.aggregate([
      {
        $match: { vendorId: new mongoose.Types.ObjectId(vendorId) }, // Filter by vendorId
      },
      {
        $group: {
          _id: "$vendorId", // Group by vendorId
          totalIncome: { $sum: "$totalAmount" }, // Calculate total income
          totalOrders: { $sum: 1 }, // Count total orders
          totalCustomers: { $addToSet: "$userId" }, // Collect unique customer IDs
        },
      },
      {
        $project: {
          vendorId: "$_id",
          totalIncome: 1,
          totalOrders: 1,
          totalCustomers: { $size: "$totalCustomers" }, // Count unique customers
          _id: 0, // Exclude the default _id field
        },
      },
    ]);

    // If no orders are found, return default values
    if (result.length === 0) {
      return {
        success: true,
        message: "No orders found for this vendor",
        data: {
          vendorId,
          totalIncome: 0,
          totalOrders: 0,
          totalCustomers: 0,
        },
      };
    }

    return {
      success: true,
      message: "Vendor performance metrics fetched successfully",
      data: result[0], // Return the first (and only) result
    };
  } catch (error) {
    console.error("Error fetching vendor performance metrics:", error);
    return {
      success: false,
      message: "Failed to fetch vendor performance metrics",
      error,
    };
  }
};

export const getRecentOrdersForVendor = async (vendorId: string, limit = 5) => {
  try {
    // Fetch recent orders for the vendor
    const orders = await Order.find({ vendorId })
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .limit(limit) // Limit the number of results
      .populate({
        path: "userId",
        model: "User",
        select: "firstName lastName email",
      }) // Populate customer details
      .populate({ path: "items.itemId", model: "Item", select: "name price" }); // Populate item details

    // Format the response data
    const formattedOrders = orders.map((order) => ({
      orderId: order._id,
      customer: {
        name: `${(order.userId as any).firstName} ${
          (order.userId as any).lastName
        }`,
        email: (order.userId as any).email,
      },
      orderStatus: order.orderStatus,
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        itemName: (item.itemId as any).itemName,
        itemPrice: (item.itemId as any).price,
        quantity: item.quantity,
      })),
      totalAmount: order.totalAmount,
    }));

    return {
      success: true,
      message: "Recent orders fetched successfully",
      data: formattedOrders,
    };
  } catch (error) {
    console.error("Error fetching recent orders for vendor:", error);
    return {
      success: false,
      message: "Failed to fetch recent orders for vendor",
      error,
    };
  }
};

export const topSellingItemForVendor = async (vendorId: string) => {
  const topItem = await Order.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
        vendorId: new mongoose.Types.ObjectId(vendorId),
      },
    }, // Filter by vendor and paid orders
    { $unwind: "$items" }, // Expand items array
    {
      $group: {
        _id: {
          name: "$items.name", // Group by item name
          price: "$items.price", // Include item price
        },
        totalSold: { $sum: "$items.quantity" }, // Sum quantity sold
        totalRevenue: {
          $sum: { $multiply: ["$items.quantity", "$items.price"] }, // Calculate total revenue
        },
      },
    },
    { $sort: { totalSold: -1 } }, // Sort by total sold in descending order
    { $limit: 1 }, // Get top-selling item
  ]);

  if (!topItem.length) {
    return {
      success: true,
      message: "No sales data available for this vendor",
      data: null,
    };
  }

  return {
    success: true,
    message: "Fetched top-selling item successfully",
    data: {
      name: topItem[0]._id.name,
      price: topItem[0]._id.price,
      totalSold: topItem[0].totalSold,
      totalRevenue: topItem[0].totalRevenue,
    },
  };
};

export const trackOrder = async (trackId: string, vendorId: string) => {
  const order = await Order.findOne({ orderId: trackId, vendorId: vendorId });

  if (!order)
    throw new NotFoundError(`Order not found for this Vendor ${vendorId}`);
  return {
    success: true,
    message: `Fetched Successfully`,
    data: {
      order: order.orderStatus,
      statusHistory: order.statusHistory,
    },
  };
};
