import Transaction from "./model.js";
export const list = async (userId) => {
    const transactions = await Transaction.find({ userId: userId })
        .populate("orderId")
        .populate("userId");
    return {
        success: true,
        message: `Fetched Successfully`,
        count: transactions.length,
        data: transactions,
    };
};
export const listOne = async (trxId, userId) => {
    const transaction = await Transaction.findOne({ _id: trxId, userId: userId })
        .populate("orderId")
        .populate("userId");
    return {
        success: true,
        message: `Fetched Successfully`,
        data: transaction,
    };
};
