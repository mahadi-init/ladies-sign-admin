import { connectDB } from "@/db/connect";
import { ProductModel } from "@/models/product.model";
import { ProductType } from "@/types/product";
import { cache } from "react";

export const productPagination = cache(async (
  filterBy: "default" | "status" | "search" = "default",
  index: number = 1,
  limit: number = 25,
  q: string,
  status: "IN-STOCK" | "OUT-OF-STOCK" | "DISCONTINUED",
) => {
  connectDB()

  const skip = (index - 1) * limit;

  let result: ProductType[] = [];
  let length = 0;

  // filter by default
  if (filterBy === "default") {
    length = await ProductModel.find().countDocuments();
    result = await ProductModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  // filter by default
  if (filterBy === "status") {
    length = await ProductModel.find({ status: status }).countDocuments();
    result = await ProductModel.find({ status: status })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  // filter by search
  if (filterBy === "search") {
    // length count
    length = await ProductModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { sku: { $regex: q, $options: "i" } },
      ],
    }).countDocuments();

    // find
    result = await ProductModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { sku: { $regex: q, $options: "i" } },
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
})

export const getProductdata = cache(async (_id?: string) => {
  connectDB()

  const data = await ProductModel.findById(_id);
  return JSON.stringify(data);
});
