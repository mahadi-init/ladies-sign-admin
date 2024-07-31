import { OrderModel } from "@/models/order.model";
import { OrderType } from "@/types/order";

export const orderPagination = async (
  filterBy: "default" | "status" | "search" = "default",
  index: number = 1,
  limit: number = 25,
  q: string,
  status: "WAITING" | "PROCESSING" | "DELIVERED" | "CANCELLED",
) => {
  const skip = (index - 1) * limit;

  let result: OrderType[] = [];
  let length = 0;

  // filter by default
  if (filterBy === "default") {
    length = await OrderModel.find().countDocuments();
    result = await OrderModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  // filter by status
  if (filterBy === "status") {
    length = await OrderModel.find({ status: status }).countDocuments();
    result = await OrderModel.find({ status: status })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  // filter by search
  if (filterBy === "search") {
    // length count
    length = await OrderModel.find({
      $or: [
        { _id: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } },
        { sku: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ],
    }).countDocuments();

    // find
    result = await OrderModel.find({
      $or: [
        { _id: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } },
        { sku: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } },
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

export const getOrderdata = async (_id?: string) => {
  const data = await OrderModel.findById(_id);
  return JSON.stringify(data);
};
