"use server";
import { connectDB } from "@/db/connect";
import { ReviewModel } from "@/models/review.model";

export const remove = async (_id?: string) => {
  connectDB();

  try {
    await ReviewModel.findByIdAndDelete(_id);

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
