"use client";
import DeliveryStatus from "@/components/native/DeliveryStatus";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import { OrderType } from "@/types/order.t";
import { getDaysAgo } from "@/utils/get-days-ago";
import { ColumnDef } from "@tanstack/react-table";
import { View } from "lucide-react";
import Link from "next/link";

export const sellerOrderColumn: ColumnDef<OrderType>[] = [
  {
    accessorKey: "invoice",
    header: "INVOICE",
    cell: ({ row }) => {
      return (
        <Link
          href={`/order/details/${row.original._id}`}
          className="font-medium cursor-pointer"
        >
          # {row.original.invoice}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "CUSTOMER",
  },

  {
    accessorKey: "address",
    header: "ADDRESS",
  },
  {
    accessorKey: "total",
    header: "TOTAL",
    cell: ({ row }) => {
      return <p className="font-medium">৳ {row.original.total}</p>;
    },
  },
  {
    accessorKey: "delivery",
    header: "DELIVERY",
    cell: ({ row }) => {
      return (
        <>
          {row.original.status === "PROCESSING" ? (
            <DeliveryStatus trackingCode={row.original.trackingCode} />
          ) : (
            <p className="text-red-300 font-bold">---------</p>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "PAYMENT",
  },
  {
    accessorKey: "createdAt",
    header: "DATE",
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {/* @ts-ignore */}
          {getDaysAgo(row.original.createdAt) <= 0 ? (
            <p>Today</p>
          ) : (
            <p>{getDaysAgo(row.original.createdAt!!)} days ago</p>
          )}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <HoverToolkit text="Invoice">
          <Link href={`/order/invoice/${row.original._id}`}>
            <View size={20} />
          </Link>
        </HoverToolkit>
      </div>
    ),
  },
];
