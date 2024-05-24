"use client";
import ConfirmationDialog from "@/components/native/ConfirmationDialog";
import DeliveryStatus from "@/components/native/DeliveryStatus";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import { OrderType } from "@/types/order.t";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Send, View } from "lucide-react";
import { toast } from "sonner";
import { sendOrder } from "../utils/order-send";
import Link from "next/link";
import { getDaysAgo } from "@/utils/get-days-ago";

export const orderColumn: ColumnDef<OrderType>[] = [
  {
    accessorKey: "invoice",
    header: "INVOICE",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/orders/details/${row.original._id}`}
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
    cell: ({ row }) => {
      return (
        <Link
          href={
            row.original.isSeller
              ? `/dashboard/seller/edit/${row.original.personId}`
              : `/dashboard/user/edit/${row.original.personId}`
          }
          className="font-medium cursor-pointer"
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
            <p className="text-red-300 font-bold">---------</p>
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
      <div className="flex items-center gap-8">
        {row.original.status === "PENDING" ? (
          <ConfirmationDialog
            alertText="This will send order to courier"
            // TODO: IMPLEMENT THIS FROM BACKEND SITE
            action={async () => {
              const res = await sendOrder(row.original);

              if (res.status === 200) {
                toast.success(res.message);
              } else {
                toast.error(res.message);
              }
            }}
          >
            <Send size={22} className="cursor-pointer" />
          </ConfirmationDialog>
        ) : (
          <HoverToolkit text="Done sending to courir">
            <CheckCircle size={22} />
          </HoverToolkit>
        )}
        <HoverToolkit text="Invoice">
          <Link href={`/dashboard/order/invoice/${row.original._id}`}>
            <View size={20} />
          </Link>
        </HoverToolkit>
      </div>
    ),
  },
];
