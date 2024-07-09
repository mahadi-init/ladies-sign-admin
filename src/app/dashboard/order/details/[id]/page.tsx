"use client";
import { OrderSummary } from "@/components/native/OrderSummary";
import { fetcher } from "@/https/get-request";
import { OrderType } from "@/types/order.t";
import useSWR from "swr";

export default function OrderDetails({ params }: { params: { id: string } }) {
  const { data: order } = useSWR<OrderType>(`/order/get/${params.id}`, fetcher);

  return <OrderSummary order={order} />;
}
