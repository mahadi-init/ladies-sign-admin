import { WithdrawType } from "@/types/withdraw";
import { model, Model, models, Schema } from "mongoose";

const withdrawSchema: Schema<WithdrawType> = new Schema(
  {
    sellerID: String,
    status: {
      type: String,
      default: "PENDING",
    },
    amount: {
      type: Number,
      requried: true,
    },
    message: String,
    bkash: String,
    nogod: String,
    rocket: String,
  },
  {
    timestamps: true,
  },
);

export const WithdrawModel: Model<WithdrawType> =
  models?.Withdraw || model("Withdraw", withdrawSchema);