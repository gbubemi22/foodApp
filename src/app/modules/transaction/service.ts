import Transaction from "./model.js";

export const list = async (userId: string) => {
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

export const listOne = async (trxId: string, userId: string) => {
  const transaction = await Transaction.findOne({ _id: trxId, userId: userId })
    .populate("orderId")
    .populate("userId");

  return {
    success: true,
    message: `Fetched Successfully`,
    data: transaction,
  };
};
