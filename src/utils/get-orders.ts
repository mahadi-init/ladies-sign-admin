import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import { OrderSummaryType } from "@/types/order";

export const getOrders = async (): Promise<OrderSummaryType[]> => {
  const res = await getData(`${BACKEND_URL}/api/order/orders`, 10, [
    "orders",
    "order",
  ]);

  //@ts-expect-error
  return res.data;
};
