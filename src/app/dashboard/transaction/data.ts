import { connectDB } from "@/db/connect";
import { TransactionModel } from "@/models/transaction.model";
import { TransactionType } from "@/types/transaction";

export const transactionPagination = async (
  filterBy: "default" | "type" | "search" = "default",
  index: number = 1,
  limit: number = 25,
  q: string,
  type: "DEPOSIT" | "PAYMENT"
) => {
  connectDB()

  const skip = (index - 1) * limit;

  let result: TransactionType[] = [];
  let length = 0;

  // filter by default
  if (filterBy === "default") {
    length = await TransactionModel.find().countDocuments();
    result = await TransactionModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  // filter by type
  if (filterBy === "type") {
    length = await TransactionModel.find({ type: type }).countDocuments();
    result = await TransactionModel.find({ type: type })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  // filter by search
  if (filterBy === "search") {
    // length count
    length = await TransactionModel.find({
      $or: [
        { customerID: { $regex: q, $options: "i" } },
        { amount: { $regex: q, $options: "i" } },
        { paymentID: { $regex: q, $options: "i" } },
        { merchantInvoiceNumber: { $regex: q, $options: "i" } },
      ],
    }).countDocuments();

    // find
    result = await TransactionModel.find({
      $or: [
        { customerID: { $regex: q, $options: "i" } },
        { amount: { $regex: q, $options: "i" } },
        { paymentID: { $regex: q, $options: "i" } },
        { merchantInvoiceNumber: { $regex: q, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  const totalPages = Math.ceil(length / limit);
  return JSON.stringify({
    data: result,
    totalPages: totalPages,
  });
};

export const getTransactiondata = async (_id?: string) => {
  connectDB()

  const data = await TransactionModel.findById(_id);
  return JSON.stringify(data);
};
