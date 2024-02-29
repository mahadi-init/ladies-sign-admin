"use client";
import InvoiceGenerator from "@/components/native/InvoiceGenerator";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Invoice({ params }: { params: { id: string } }) {
  const ref = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print the Invoice",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <>
      <div ref={ref}>
        <InvoiceGenerator orderId={params.id} />
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
