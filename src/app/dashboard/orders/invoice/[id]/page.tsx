"use client";
import FullPageLoading from "@/components/native/FullPageLoading";
import InvoiceGenerator from "@/components/native/InvoiceGenerator";
import { Button } from "@/components/ui/button";
import { OrderType } from "@/shared/Orders/order.t";
import { fetcher } from "@/utils/fetcher";
import { Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useSWR from "swr";
import { BACKEND_URL } from "../../../../../../site-info";

export default function Invoice({ params }: { params: { id: string } }) {
  const ref = useRef(null);
  const {
    data: value,
    error,
    isLoading,
  } = useSWR<OrderType>(`${BACKEND_URL}/api/order/${params.id}`, fetcher);

  const handlePrint = useReactToPrint({
    documentTitle: `${value?._id}`,
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  if (isLoading) {
    return <FullPageLoading />;
  }

  if (error) {
    return (
      <div>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div ref={ref}>
        {/* @ts-expect-error */}
        <InvoiceGenerator data={value.data} />
      </div>

      <Button
        className="flex gap-2 items-center"
        onClick={() => {
          handlePrint(null, () => ref.current);
        }}
      >
        <Printer size={22} />
        Print Invoice
      </Button>
    </>
  );
}