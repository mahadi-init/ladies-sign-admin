import { connectDB } from "@/db/connect";
import { ReviewModel } from "@/models/review.model";
import { ReviewType } from "@/types/review";
import { cache } from "react";

export const reviewPagination = cache(
  async (
    filterBy: "default" | "rating" | "search" = "default",
    index: number = 1,
    limit: number = 25,
    rating: 1 | 2 | 3 | 4 | 5,
    q: string,
  ) => {
    connectDB();

    const skip = (index - 1) * limit;

    let result: ReviewType[] = [];
    let length = 0;

    // filter by default
    if (filterBy === "default") {
      length = await ReviewModel.find().countDocuments();
      result = await ReviewModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    // filter by default
    if (filterBy === "rating") {
      length = await ReviewModel.find({ rating: rating }).countDocuments();
      result = await ReviewModel.find({ rating: rating })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    // filter by search
    if (filterBy === "search") {
      // length count
      length = await ReviewModel.find({
        $or: [
          { comment: { $regex: q, $options: "i" } },
          { by: { $regex: q, $options: "i" } },
          { rating: { $regex: q, $options: "i" } },
        ],
      }).countDocuments();

      // find
      result = await ReviewModel.find({
        $or: [
          { comment: { $regex: q, $options: "i" } },
          { by: { $regex: q, $options: "i" } },
          { rating: { $regex: q, $options: "i" } },
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
  },
);

export const getAdmindata = cache(async (_id?: string) => {
  connectDB();

  const data = await ReviewModel.findById(_id);
  return JSON.stringify(data);
});
