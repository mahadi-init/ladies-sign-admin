import getData from "@/actions/get";
import { BACKEND_URL } from "@/site-info";
import { OrderSummaryType } from "@/types/order.t";

export const getOrders = async (): Promise<OrderSummaryType[]> => {
  const data = await getData<OrderSummaryType[]>(
    `${BACKEND_URL}/api/order/orders`,
    true,
    10,
    ["orders", "order"]
  );

  return data;
};
