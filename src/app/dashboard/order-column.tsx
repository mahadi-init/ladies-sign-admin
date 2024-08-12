"use client";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import { MultipleHoverToolkit } from "@/components/native/MutipleHoverToolkit";
import OrderConfirmationDialog from "@/components/native/OrderConfirmationDialog";
import { OrderType } from "@/types/order";
import { ColumnDef } from "@tanstack/react-table";
import { PenIcon, ReceiptText, Send } from "lucide-react";
import Link from "next/link";

export const orderColumn: ColumnDef<OrderType>[] = [
  {
    accessorKey: "index",
    header: "INDEX",
    cell: ({ row }) => {
      return <p># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "confirmation",
    header: "CONFIRM",
    cell: ({ row }) => {
      return (
        <p className="font-semibold text-purple-500">{row.original.confirm}</p>
      );
    },
  },
  // {
  //   accessorKey: "note",
  //   header: "NOTE",
  //   cell: ({ row }) => {
  //     return <p>{row.original.note?.slice(0, 15)}...</p>;
  //   },
  // },
  // {
  //   accessorKey: "invoice",
  //   header: "INVOICE",
  //   cell: ({ row }) => {
  //     return (
  //       <Link
  //         href={`/dashboard/order/details/${row.original._id}`}
  //         className="cursor-pointer font-medium underline"
  //       >
  //         # {getLastSixDigit(row.original._id)}
  //       </Link>
  //     );
  //   },
  // },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/order/details/${row.original._id}`}
          className="cursor-pointer font-semibold text-blue-700 underline"
        >
          {row.original.cart?.map((item) => item.sku).join(" & ")}
        </Link>
      );
    },
  },
  //{
  //  accessorKey: "orderBy",
  //  header: "SELLER",
  //  cell: ({ row }) => {
  //    return (
  //      <Link
  //        href={`/dashboard/sellers/profile?id=${row.original.sellerId}&name=${row.original.sellerName}`}
  //        className="cursor-pointer font-medium underline"
  //      >
  //        {row.original.sellerName}
  //      </Link>
  //    );
  //  },
  //},
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <MultipleHoverToolkit
          content={
            <div>
              <p>{row.original.address}</p>
              <p>{row.original.note}</p>
            </div>
          }
        >
          <p>{row.original.name}</p>
        </MultipleHoverToolkit>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "CUSTOMER PHONE",
    cell: ({ row }) => {
      return (
        <p className="font-semibold text-green-500">{row.original.phone}</p>
      );
    },
  },
  {
    accessorKey: "total",
    header: "TOTAL",
    cell: ({ row }) => {
      return <p className="font-medium">৳ {row.original.total}</p>;
    },
  },
  {
    accessorKey: "Date",
    header: "DATE",
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {/* @ts-ignore */}
          {new Date(row.original.createdAt).toDateString()}
        </p>
      );
    },
  },
  {
    accessorKey: "trackingLink",
    header: "TRACKING",
    cell: ({ row }) => {
      return (
        row.original.trackingLink && (
          <Link
            href={row.original.trackingLink}
            className="font-medium text-blue-700"
            target="_blank"
          >
            Visit
          </Link>
        )
      );
    },
  },
  {
    accessorKey: "consignmentId",
    header: "CONSIGNMENT",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <p className="font-semibold text-yellow-500">{row.original.status}</p>
      );
    },
  },
];