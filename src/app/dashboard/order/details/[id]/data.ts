import { OrderModel } from "@/models/order.model";
import { cache } from "react";

export const getOrderData = cache(async (_id?: string) => {
  if (!_id) {
    return;
  }

  const order = await OrderModel.findById(_id);
  return JSON.stringify(order);
});
