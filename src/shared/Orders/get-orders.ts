import getData from "@/actions/get";
import { BACKEND_URL } from "../../../site-info";
import { OrderSummaryType } from "@/shared/Orders/order.t";

export const getOrders = async (): Promise<OrderSummaryType[]> => {
  const res = await getData(`${BACKEND_URL}/api/order/orders`, 10, [
    "orders",
    "order",
  ]);

  //@ts-expect-error
  return res.data;
};
