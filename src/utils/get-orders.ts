import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import { OrderType } from "@/types/order";

export const getOrders = async (): Promise<OrderType[]> => {
  const res = await getData(`${BACKEND_URL}/api/order/orders`, 10, [
    "orders",
    "order",
  ]);

  //@ts-expect-error
  return res.data;
};
