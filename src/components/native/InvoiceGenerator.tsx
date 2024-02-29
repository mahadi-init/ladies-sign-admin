"use client";
import { BACKEND_URL } from "@/consts/site-info";
import { fetcher } from "@/utils/fetcher";
import { forwardRef } from "react";
import useSWR from "swr";

function InvoiceGenerator({ orderId }: { orderId: string }) {
  const { data, error, isLoading } = useSWR(
    `${BACKEND_URL}/order/${orderId}`,
    fetcher,
  );

  console.log(data);

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">ThemePure</h1>
        <p className="text-gray-600">Dhaka, Bangladesh</p>
        <p className="text-gray-600">0123456789</p>
      </div>
      <div className="mb-6 p-4 border">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <h2 className="col-span-1 text-sm font-bold">PRODUCT</h2>
          <h2 className="col-span-1 text-sm font-bold">QUANTITY</h2>
          <h2 className="col-span-1 text-sm font-bold">TOTAL</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="col-span-1 text-sm">Headphones Wireless.</p>
          <p className="col-span-1 text-sm">1</p>
          <p className="col-span-1 text-sm">$120.00</p>
        </div>
      </div>
      <div className="mb-6 p-4 border">
        <h2 className="text-lg font-bold mb-4">Order Price</h2>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <p className="text-sm">Subtotal</p>
          <p className="text-sm">$120.00</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <p className="text-sm">Shipping cost:</p>
          <p className="text-sm">$60.00</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-sm font-bold">Grand total:</p>
          <p className="text-sm font-bold">$180.00</p>
        </div>
      </div>
      <div className="mb-6 p-4 border">
        <div className="grid grid-cols-2 gap-4 mb-2">
          <p className="text-sm font-bold">Payment Method</p>
          <p className="text-sm">COD</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <p className="text-sm font-bold">Bill No:</p>
          <p className="text-sm">#1000</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <p className="text-sm font-bold">No of items:</p>
          <p className="text-sm">1</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-sm font-bold">Date:</p>
          <p className="text-sm">16/07/2023</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold">
          Thank you for your order. Come again!
        </p>
      </div>
    </div>
  );
}

export default forwardRef(InvoiceGenerator);
