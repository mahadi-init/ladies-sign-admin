import { SellerModel } from "@/models/seller.model";
import { SellerType } from "@/types/seller";

export const sellerPagination = async (
  filterBy: "default" | "search" = "default",
  index: number = 1,
  limit: number = 25,
  q: string,
) => {
  const skip = (index - 1) * limit;

  let result: SellerType[] = [];
  let length = 0;

  // filter by default
  if (filterBy === "default") {
    length = await SellerModel.find().countDocuments();
    result = await SellerModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  // filter by search
  if (filterBy === "search") {
    // count
    length = await SellerModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ],
    }).countDocuments();

    // find
    result = await SellerModel.find({
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

export const getSellerData = async (_id?: string) => {
  const data = await SellerModel.findById(_id);
  return JSON.stringify(data);
};