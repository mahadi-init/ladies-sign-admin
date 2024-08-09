import { connectDB } from "@/db/connect";
import { AdminModel } from "@/models/admin.model";
import { AdminType } from "@/types/admin";

export const adminPagination = async (
  filterBy: "default" | "search" = "default",
  index: number = 1,
  limit: number = 25,
  q: string,
) => {
  connectDB()

  const skip = (index - 1) * limit;

  let result: AdminType[] = [];
  let length = 0;

  // filter by default
  if (filterBy === "default") {
    length = await AdminModel.find().countDocuments();
    result = await AdminModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  // filter by search
  if (filterBy === "search") {
    // length count
    length = await AdminModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ],
    }).countDocuments();

    // find
    result = await AdminModel.find({
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
};

export const getAdmindata = async (_id?: string) => {
  connectDB()

  const data = await AdminModel.findById(_id);
  return JSON.stringify(data);
};
