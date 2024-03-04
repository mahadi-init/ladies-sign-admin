"use client";
import ConfirmationDialog from "@/components/native/ConfirmationDialog";
import DeliveryStatus from "@/components/native/DeliveryStatus";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import OrderStatusDropdown from "@/components/native/OrderStatusDropdown";
import { Button } from "@/components/ui/button";
import { OrderSummaryType } from "@/types/order";
import { OrderStatusType } from "@/types/order-status";
import { sendOrder } from "@/utils/order-send";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Send, View } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const orderColumn: ColumnDef<OrderSummaryType>[] = [
  {
    accessorKey: "invoice",
    header: "INVOICE",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/orders/details/${row.original._id}`}
          className="font-medium"
        >
          # {row.original.invoice}
        </Link>
      );
    },
  },
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
    accessorKey: "delivery",
    header: "DELIVERY",
    cell: ({ row }) => {
      return (
        <>
          {row.original.status === OrderStatusType.Processing ? (
            <DeliveryStatus trackingCode={row.original.trackingCode} />
          ) : (
            <p className="text-red-600 font-medium">NULL</p>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <OrderStatusDropdown
          id={row.original._id}
          status={row.original.status}
        />
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
        {/* <HoverToolkit text="Edit"> */}
        {/*   <Link href={`/dashboard/orders/edit/${row.original._id}`}> */}
        {/*     <PencilIcon size={20} /> */}
        {/*   </Link> */}
        {/* </HoverToolkit> */}
        <HoverToolkit text="Send to courir">
          <ConfirmationDialog
            alertText="This will send order to courier"
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
