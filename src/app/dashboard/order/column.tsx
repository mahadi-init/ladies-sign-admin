"use client";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import { MultipleHoverToolkit } from "@/components/native/MutipleHoverToolkit";
import OrderConfirmationDialog from "@/components/native/OrderConfirmationDialog";
import { OrderType } from "@/types/order";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "flowbite-react";
import { PenIcon, ReceiptText, Send } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { changeConfirmation } from "./action";
import { ChangeStatus } from "./change-status";
import { ChangeConfirm } from "./change-confirm";

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
        <ChangeConfirm id={row.original._id} confirm={row.original.confirm} />
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
        <ChangeStatus id={row.original._id} status={row.original.status} />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-8">
        {row.original.status === "WAITING" && (
          <HoverToolkit text="Edit">
            <Link href={`/dashboard/order/edit/${row.original._id}`}>
              <PenIcon size={18} />
            </Link>
          </HoverToolkit>
        )}
        {row.original.status === "WAITING" && (
          <OrderConfirmationDialog
            alertText={`# will be sent to courir`}
            data={row.original}
          >
            <Send size={18} />
          </OrderConfirmationDialog>
        )}
        <HoverToolkit text="Invoice">
          <Link href={`/dashboard/order/invoice/${row.original._id}`}>
            <ReceiptText size={18} />
          </Link>
        </HoverToolkit>
        <div className="flex items-center gap-8">
          {/* <DeleteItem
            queryUrl={`/order/delete/${row.original._id}`}
            validationTag="/order"
            successMessage="Order deleted successfully"
          /> */}
        </div>
      </div>
    ),
  },
];
