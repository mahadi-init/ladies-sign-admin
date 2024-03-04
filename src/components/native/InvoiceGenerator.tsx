"use client";
import { forwardRef } from "react";
import { Card } from "../ui/card";
import { OrderType } from "@/types/order";

function InvoiceGenerator({ data }: { data?: OrderType }) {
  return (
    <div className="w-full mx-auto my-10 p-6 bg-white shadow-md">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Ladies Sign</h1>
        <p className="text-gray-600">
          Akanda Bari, Ramnogor, Jamalpur, Bangladesh
        </p>
        <p className="text-gray-600">0123456789</p>
      </div>
      <Card className="mb-6 p-4 border">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <h2 className="col-span-1 text-sm font-bold">PRODUCT</h2>
          <h2 className="col-span-1 text-sm font-bold">QUANTITY</h2>
          <h2 className="col-span-1 text-sm font-bold">TOTAL</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {data?.cart.map((item) => {
            return (
              <>
                <p className="col-span-1 text-sm">{item.title}</p>
                <p className="col-span-1 text-sm">{item.quantity}</p>
                <p className="col-span-1 text-sm">৳{item.price}</p>
              </>
            );
          })}
        </div>
      </Card>
      <Card className="mb-6 p-4 border">
        <h2 className="text-lg font-bold mb-4">Order Price</h2>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <p className="text-sm">Subtotal</p>
          <p className="text-sm">৳{data?.subTotal}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <p className="text-sm">Shipping cost:</p>
          <p className="text-sm">৳{data?.shippingCost}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-sm font-bold">Grand total:</p>
          <p className="text-sm font-bold">${data?.totalAmount}</p>
        </div>
      </Card>
      <Card className="mb-6 p-4 border">
        <div className="grid grid-cols-2 gap-4 mb-2">
          <p className="text-sm font-bold">Payment Method</p>
          <p className="text-sm">{data?.paymentMethod}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <p className="text-sm font-bold">Bill No:</p>
          <p className="text-sm"># {data?.invoice}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <p className="text-sm font-bold">No of items:</p>
          <p className="text-sm">{data?.cart.length}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-sm font-bold">Date:</p>
          <p className="text-sm">
            {data?.createdAt &&
              new Date(data?.createdAt).toDateString().substring(0, 10)}
          </p>
        </div>
      </Card>
      <div className="text-center">
        <p className="text-lg font-semibold">
          Thank you for your order. Come again!
        </p>
      </div>
    </div>
  );
}

export default forwardRef(InvoiceGenerator);
