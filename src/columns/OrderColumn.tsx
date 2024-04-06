"use client";
import ConfirmationDialog from "@/components/native/ConfirmationDialog";
import DeliveryStatus from "@/components/native/DeliveryStatus";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import { Button } from "@/components/ui/button";
import { OrderSummaryType } from "@/types/order.t";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { sendOrder } from "../utils/order-send";

export const orderColumn: ColumnDef<OrderSummaryType>[] = [
  {
    accessorKey: "invoice",
    header: "INVOICE",
    // cell: ({ row }) => {
    //   return (
    //     <Link
    //       href={`/dashboard/orders/details/${row.original._id}`}
    //       className="font-medium underline"
    //     >
    //       # {row.original.invoice}
    //     </Link>
    //   );
    // },
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
          <ArrowUpDown className="w-4 h-4 ml-2" />
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
          <ArrowUpDown className="w-4 h-4 ml-2" />
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
    // cell: ({ row }) => {
    //   return (
    //     <StatusUpdateDropdown
    //       options={["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"]}
    //       status={row.original.status}
    //       action={async <T,>(item: T) => {
    //         //update status
    //         const res = await patchData(
    //           {
    //             status: item,
    //           },
    //           `${BACKEND_URL}/api/order/update-status/${row.original._id}`,
    //           "orders",
    //           "Status updated Successfully"
    //         );

    //         if (res.status === 200) {
    //           toast.success(res.message);
    //         } else {
    //           toast.error(res.message);
    //         }
    //       }}
    //     />
    //   );
    // },
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
      <div className="flex items-center gap-8">
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
        {/* <HoverToolkit text="Invoice">
          <Link href={`/dashboard/orders/invoice/${row.original._id}`}>
            <View size={20} />
          </Link>
        </HoverToolkit> */}
      </div>
    ),
  },
];
