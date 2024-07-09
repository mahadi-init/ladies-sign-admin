"use client";
import ChangeStatus from "@/components/native/ChangeStatus";
import DeleteItem from "@/components/native/DeleteItem";
import { WithdrawType } from "@/types/withdraw.t";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const withdrawColumn: ColumnDef<WithdrawType>[] = [
  {
    accessorKey: "index",
    header: "INDEX",
    cell: ({ row }) => {
      return <p># {row.index + 1}</p>;
    },
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
          queryUrl={`/withdraw/delete/${row.original._id}`}
          validationTag="/withdraw"
          successMessage="Withdraw deleted successfully"
        />
      </div>
    ),
  },
];
