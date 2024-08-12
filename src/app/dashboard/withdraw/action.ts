"use server";
import { connectDB } from "@/db/connect";
import { WithdrawModel } from "@/models/withdraw.model";

export const remove = async (_id?: string) => {
  connectDB();

  try {
    await WithdrawModel.findByIdAndDelete(_id);

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};
