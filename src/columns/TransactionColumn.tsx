"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { TransactionType } from "@/types/transaction";
import { ColumnDef } from "@tanstack/react-table";

export const transactionColumn: ColumnDef<TransactionType>[] = [
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
    accessorKey: "transactionStatus",
    header: "STATUS",
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
