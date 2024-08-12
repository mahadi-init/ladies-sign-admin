import { connectDB } from "@/db/connect";
import { WithdrawModel } from "@/models/withdraw.model";
import { WithdrawType } from "@/types/withdraw";
import { cache } from "react";

export const withdrawPagination = cache(
  async (
    filterBy: "default" | "search" = "default",
    index: number = 1,
    limit: number = 25,
    q: string,
  ) => {
    connectDB();

    const skip = (index - 1) * limit;

    let result: WithdrawType[] = [];
    let length = 0;

    // filter by default
    if (filterBy === "default") {
      length = await WithdrawModel.find().countDocuments();
      result = await WithdrawModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    // filter by search
    if (filterBy === "search") {
      // length count
      length = await WithdrawModel.find({
        $or: [{ sellerID: { $regex: q, $options: "i" } }],
      }).countDocuments();

      // find
      result = await WithdrawModel.find({
        $or: [{ sellerID: { $regex: q, $options: "i" } }],
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
  },
);

export const getAdmindata = cache(async (_id?: string) => {
  connectDB();

  const data = await WithdrawModel.findById(_id);
  return JSON.stringify(data);
});
