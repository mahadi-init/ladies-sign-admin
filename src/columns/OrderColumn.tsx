"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PencilIcon, Printer, Send, View } from "lucide-react";
import Link from "next/link";
import { OrderType } from "@/types/order";
import { OrderStatusType } from "@/types/order-status";
import OrderStatusIndicator from "@/components/native/OrderStatusIndicator";
import { HoverToolkit } from "@/components/native/HoverToolkit";

export const orderColumn: ColumnDef<OrderType>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  // {
  //   accessorKey: "image",
  //   header: "IMAGE",
  //   cell: ({ row }) => {
  //     return row.original.image ? (
  //       <picture>
  //         <Image
  //           className="w-10"
  //           width={250}
  //           height={250}
  //           src={row.original.image}
  //           alt="cell image"
  //           loading="lazy"
  //         />
  //       </picture>
  //     ) : (
  //       <span className="text-xs">No Image</span>
  //     );
  //   },
  // },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NAME
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ADDRESS
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "TOTAL",
  },
  {
    accessorKey: "shippingCost",
    header: "SHIPPING",
  },
  {
    accessorKey: "subTotal",
    header: "SUBTOTAL",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <OrderStatusIndicator status={row.original.status as OrderStatusType} />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "DATE",
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {new Date(row.original.createdAt).toDateString().substring(0, 10)}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-8 items-center">
        <HoverToolkit text="Edit">
          <Link href={`/dashboard/orders/edit/${row.original._id}`}>
            <PencilIcon size={20} />
          </Link>
        </HoverToolkit>
        <HoverToolkit text="Send to courir">
          <Send size={22} />
        </HoverToolkit>
        <HoverToolkit text="Invoice">
          <Link href={`/dashboard/orders/invoice/${row.original._id}`}>
            <View size={20} />
          </Link>
        </HoverToolkit>
      </div>
    ),
  },
];
