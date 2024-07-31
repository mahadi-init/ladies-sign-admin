"use client";
import InvoiceGenerator from "@/components/native/InvoiceGenerator";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/https/get-request";
import { OrderType } from "@/types/order";
import { Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useSWR from "swr";

export default function Invoice({ params }: { params: { id: string } }) {
  const ref = useRef(null);
  const {
    data: value,
    error,
    isLoading,
  } = useSWR<OrderType>(`/order/get/${params.id}`, fetcher);

  const handlePrint = useReactToPrint({
    documentTitle: `${value?._id}`,
    // onBeforePrint: () => console.log("before printing..."),
    // onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  if (error) {
    return (
      <div>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div ref={ref}>
        <InvoiceGenerator data={value} />
      </div>

      <Button
        className="flex items-center gap-2"
        size="sm"
        variant="secondary"
        onClick={() => {
          handlePrint(null, () => ref.current);
        }}
      >
        <Printer size={22} />
        Print Invoice
      </Button>
    </div>
  );
}
