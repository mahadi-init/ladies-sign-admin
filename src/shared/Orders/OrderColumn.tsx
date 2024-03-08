"use client";
import { patchData } from "@/actions/patch";
import ConfirmationDialog from "@/components/native/ConfirmationDialog";
import DeliveryStatus from "@/components/native/DeliveryStatus";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import StatusUpdateDropdown from "@/components/native/StatusUpdateDropdown";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle, Send, View } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { BACKEND_URL } from "../../../site-info";
import { sendOrder } from "./order-send";
import { OrderSummaryType } from "./order.t";

export const orderColumn: ColumnDef<OrderSummaryType>[] = [
  {
    accessorKey: "invoice",
    header: "INVOICE",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/orders/details/${row.original._id}`}
          className="font-medium underline"
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
          {row.original.status === "PROCESSING" && (
            <DeliveryStatus trackingCode={row.original.trackingCode} />
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
        <StatusUpdateDropdown
          options={["pending", "processing", "delivered", "canceled"]}
          status={row.original.status}
          action={async <T,>(item: T) => {
            //update status
            const res = await patchData(
              {
                status: item,
              },
              `${BACKEND_URL}/api/order/update-status/${row.original._id}`,
              "orders",
              "Status updated Successfully"
            );

            if (res.status === 200) {
              toast.success(res.message);
            } else {
              toast.error(res.message);
            }
          }}
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
        {row.original.status === "PENDING" ? (
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
        ) : (
          <HoverToolkit text="Done sending to courir">
            <CheckCircle size={22} />
          </HoverToolkit>
        )}
        <HoverToolkit text="Invoice">
          <Link href={`/dashboard/orders/invoice/${row.original._id}`}>
            <View size={20} />
          </Link>
        </HoverToolkit>
      </div>
    ),
  },
];
