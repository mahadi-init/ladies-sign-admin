"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { TransactionType } from "@/types/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { remove } from "./action";

export const transactionColumn: ColumnDef<TransactionType>[] = [
  {
    accessorKey: "index",
    header: "INDEX",
    cell: ({ row }) => {
      return <p># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "customerID",
    header: "Customer ID",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    accessorKey: "paymentID",
    header: "Payment ID",
  },
  {
    accessorKey: "amount",
    header: "AMOUNT",
    cell: ({ row }) => {
      return <p>৳ {row.original.amount}</p>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "transactionStatus",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <DeleteItem
          _id={row.original._id}
          action={remove}
          message="Delete successful"
        />
      </div>
    ),
  },
];
