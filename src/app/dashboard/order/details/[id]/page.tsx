import { OrderType } from "@/types/order";
import { getOrderdata } from "../../data";
import { OrderSummary } from "./order-summary";

export default async function OrderDetails({
  params,
}: {
  params: { id: string };
}) {
  const data = await getOrderdata(params.id);
  const parsed = JSON.parse(data);

  return <OrderSummary order={parsed as OrderType} />;
}
