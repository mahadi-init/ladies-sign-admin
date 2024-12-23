import { connectDB } from "@/db/connect";
import { UserModel } from "@/models/user.model";
import { UserType } from "@/types/user";
import { cache } from "react";

export const userPagination = cache(async (
  filterBy: "default" | "search" = "default",
  index: number = 1,
  limit: number = 25,
  q: string,
) => {
  connectDB()

  const skip = (index - 1) * limit;

  let result: UserType[] = [];
  let length = 0;

  // filter by default
  if (filterBy === "default") {
    length = await UserModel.find().countDocuments();
    result = await UserModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  // filter by search
  if (filterBy === "search") {
    // length count
    length = await UserModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ],
    }).countDocuments();

    // find
    result = await UserModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
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
});

export const getUserdata = cache(async (_id?: string) => {
  connectDB()

  const data = await UserModel.findById(_id);
  return JSON.stringify(data);
})
