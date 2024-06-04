"use client";
import DeliveryStatus from "@/components/native/DeliveryStatus";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import { OrderType } from "@/types/order.t";
import { getDaysAgo } from "@/utils/get-days-ago";
import { ColumnDef } from "@tanstack/react-table";
import { View } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const orderColumn: ColumnDef<OrderType>[] = [
  {
    accessorKey: "invoice",
    header: "INVOICE",
    cell: ({ row }) => {
      return (
        <Link
          href={`/order/details/${row.original._id}`}
          className="cursor-pointer font-medium"
        >
          # {row.original.invoice}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "CUSTOMER",
    cell: ({ row }) => {
      return (
        <Link
          href={
            row.original.isSeller
              ? `/dashboard/seller/edit/${row.original.personId}`
              : `/dashboard/user/edit/${row.original.personId}`
          }
          className="cursor-pointer font-medium"
        >
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "isSeller",
    header: "TYPE",
    cell: ({ row }) => {
      return <p>{row.original.isSeller ? "SELLER" : "USER"}</p>;
    },
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
            <p className="font-bold text-red-300">---------</p>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
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
      <HoverToolkit text="Invoice">
        <Link href={`/order/invoice/${row.original._id}`}>
          <View size={20} />
        </Link>
      </HoverToolkit>
    ),
  },
];
