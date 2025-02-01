import { NotFoundError } from "../../../utils/error.js";
import Order from "../../order/model.js";
import User from "../../user/model.js";
import Vendor from "../../vendor/model.js";
import { StatusEnum } from "../../vendor/type.js";

export const totals = async () => {
  const totalUsers = await User.countDocuments({});
  const totalVendors = await Vendor.countDocuments({});

  // Aggregate total income from paid orders
  const totalIncomeResult = await Order.aggregate([
    { $match: { paymentStatus: "PAID" } }, // Filter paid orders
    { $group: { _id: null, totalIncome: { $sum: "$totalAmount" } } }, // Use totalAmount
  ]);

  const totalIncome = totalIncomeResult.length > 0 ? totalIncomeResult[0].totalIncome : 0;

  return {
    success: true,
    message: "Fetched successfully",
    data: {
      customers: totalUsers,
      vendors: totalVendors,
      totalIncome,
    },
  };
};


////////////////////   VENDOR  /////////////

export const pendingVendors = async () => {
  const vendors = await Vendor.find({
    status: { $in: [StatusEnum.PENDING, StatusEnum.REJECTED] }, // Use $in operator
  });

  return {
    success: true,
    message: `Fetched Successfully`,
    data: vendors,
  };
};

export const activeVendors = async () => {
  const vendors = await Vendor.find({
    status: StatusEnum.APPROVED,
  });

  return {
    success: true,
    message: `Fetched Successfully`,
    data: vendors,
  };
};

export const getVendor = async (vendorId: string) => {
  const vendor = await Vendor.findOne({
    _id: vendorId,
  });

  return {
    success: true,
    message: `Fetched Successfully`,
    data: vendor,
  };
};

export const approveOrReject = async (vendorId: string, status: StatusEnum) => {
  const vendor = await Vendor.findOne({ _id: vendorId });

  if (!vendor) throw new NotFoundError(`Vendor not found `);

  const result = await Vendor.findByIdAndUpdate(
    { _id: vendorId },
    { $set: { status: status } },
    { new: true, runValidators: true }
  );

  return {
    status: true,
    message: `Vendor ${result?.status} Successfully`,
    data: result,
  };
};

export const blockAndUnblockVendor = async (vendorId: string) => {
  const vendor = await Vendor.findById(vendorId);

  if (!vendor) throw new NotFoundError(`Vendor not found`);

  // Toggle the `block` status
  vendor.block = !vendor.block;
  await vendor.save();

  return {
    status: true,
    message: vendor.block
      ? "Vendor has been blocked"
      : "Vendor has been unblocked",
  };
};

export const getTopPerformingVendors = async (limit = 5) => {
  try {
    // Aggregate to calculate total sales revenue for each vendor
    const topVendors = await Order.aggregate([
      {
        $group: {
          _id: "$vendorId", // Group by vendorId
          totalRevenue: { $sum: "$totalAmount" }, // Calculate total revenue
          totalOrders: { $sum: 1 }, // Count the number of orders
        },
      },
      {
        $lookup: {
          from: "vendors", // Join with the Vendor collection
          localField: "_id",
          foreignField: "_id",
          as: "vendorDetails",
        },
      },
      {
        $unwind: "$vendorDetails", // Unwind the joined vendor details
      },
      {
        $project: {
          vendorId: "$_id",
          vendorName: "$vendorDetails.name", // Include vendor name
          totalRevenue: 1,
          totalOrders: 1,
          _id: 0, // Exclude the default _id field
        },
      },
      {
        $sort: { totalRevenue: -1 }, // Sort by total revenue (descending)
      },
      {
        $limit: limit, // Limit to the top N vendors
      },
    ]);

    return {
      success: true,
      message: "Top-performing vendors fetched successfully",
      data: topVendors,
    };
  } catch (error) {
    console.error("Error fetching top-performing vendors:", error);
    return {
      success: false,
      message: "Failed to fetch top-performing vendors",
      error,
    };
  }
};

//////////// Orders //////////////

export const recentOrders = async () => {
  const orders = await Order.find({})
    .sort({ createdAt: -1 }) // Sort by creation date (newest first)
    .limit(5) // Limit to 5 orders
    .populate("vendorId", "name") // Populate vendor name
    .populate({ path: "userId", select: "email" }) // Populate customer email
    .populate({
      path: "items.itemId",
      model: "Item",
      select: "itemName price",
    }); // Populate item name and price

  // Format the response data
  const formattedOrders = orders.map((order) => ({
    orderId: order._id,
    customerEmail: (order.userId as any).email, // Customer's email
    orderStatus: order.orderStatus, // Order status
    createdAt: order.createdAt, // Order date
    items: order.items.map((item) => ({
      itemName: (item.itemId as any).itemName, // Item name
      itemPrice: (item.itemId as any).price, // Item price
      quantity: item.quantity, // Item quantity
    })),
  }));

  return {
    success: true,
    message: "Fetched successfully",
    data: formattedOrders,
  };
};
