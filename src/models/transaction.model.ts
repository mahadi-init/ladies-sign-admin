import { TransactionType } from "@/types/transaction";
import { model, Model, models, Schema } from "mongoose";

const transactionSchema: Schema<TransactionType> = new Schema(
  {
    customerID: String,
    role: String,
    amount: String,
    type: String,
    merchantInvoiceNumber: String,
    paymentCreateTime: String,
    paymentID: String,
    transactionStatus: String,
  },
  {
    timestamps: true,
  },
);

export const TransactionModel: Model<TransactionType> =
  models?.Transaction || model("Transaction", transactionSchema);
