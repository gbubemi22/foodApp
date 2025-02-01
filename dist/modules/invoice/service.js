import { NotFoundError } from "../../utils/error.js";
import { generateInvoicePDF } from "../../utils/pdfUtils.js";
import Order from "../order/model.js";
import User from "../user/model.js";
export const generateInvoice = async (orderId, userId) => {
    // Fetch order details from the database
    const order = await Order.findOne({ _id: orderId, userId: userId })
        .populate("items.itemId")
        .populate({ path: "userId", select: "firstName lastName" });
    if (!order) {
        throw new NotFoundError(`Order not found`);
    }
    const userInfo = await User.findById(userId);
    if (!userInfo)
        throw new NotFoundError(`User not found`);
    // Prepare data for the invoice
    const customerName = userInfo.firstName + " " + userInfo.lastName;
    const amount = order.totalAmount;
    const items = order.items.map((item) => ({
        name: item.itemId.itemName, // Assuming itemId has a 'name' field
        quantity: item.quantity,
        price: item.itemId.price,
    }));
    const date = order.createdAt;
    // Generate the PDF invoice
    const filePath = await generateInvoicePDF(orderId, customerName, amount, items, date);
    return filePath;
};
