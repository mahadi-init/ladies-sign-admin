"use client";
import { Send } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function PrintInvoice({ orderId }: { orderId: string }) {
  const ref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  return (
    <>
      {/* <InvoiceGenerator ref={ref} orderId={orderId} /> */}
      <Send size={22} onClick={handlePrint} />
    </>
  );
}
