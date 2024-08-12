"use client";
import ChangeStatus from "@/components/native/ChangeStatus";
import DeleteItem from "@/components/native/DeleteItem";
import { WithdrawType } from "@/types/withdraw";
import { ColumnDef } from "@tanstack/react-table";
import { remove } from "./action";

export const withdrawColumn: ColumnDef<WithdrawType>[] = [
  {
    accessorKey: "index",
    header: "INDEX",
    cell: ({ row }) => {
      return <p># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "sellerID",
    header: "Seller ID",
  },
  {
    accessorKey: "bkash",
    header: "BKASH",
  },
  {
    accessorKey: "amount",
    header: "AMOUNT",
    cell: ({ row }) => {
      return <p>৳ {row.original.amount}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <ChangeStatus
          route={`/withdraw/change-status/${row.original._id}`}
          mutationTag="/withdraw"
          status={row.original.status}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <DeleteItem
          _id={row.original._id}
          action={remove}
          message="Record Deleted"
        />
      </div>
    ),
  },
];
