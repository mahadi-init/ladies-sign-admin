import getData from "@/actions/get";
import { BACKEND_URL } from "../../../site-info";
import { OrderSummaryType } from "@/shared/Orders/order.t";
import { DashboardOrderSummaryType } from "../home/dashboard.t";

export const getOrders = async (): Promise<OrderSummaryType[]> => {
  const data = await getData<OrderSummaryType[]>(
    `${BACKEND_URL}/api/order/orders`,
    true,
    10,
    ["orders", "order"]
  );

  return data;
};
