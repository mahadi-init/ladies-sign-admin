"use client";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { SellerType } from "@/types/seller.t";
import { ColumnDef } from "@tanstack/react-table";
import { Check, PencilIcon } from "lucide-react";
import Link from "next/link";

export const sellerColumn: ColumnDef<SellerType>[] = [
  {
    accessorKey: "index",
    header: "INDEX",
    cell: ({ row }) => {
      return <p># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "phone",
    header: "PHONE",
  },
  {
    accessorKey: "balance",
    header: "BALANCE",
  },
  {
    accessorKey: "orders",
    header: "ORDERS",
    cell: ({ row }) => {
      return <p className="font-medium">{row.original.orders?.length}</p>;
    },
  },
  {
    accessorKey: "approved",
    header: "APPROVED",
    cell: ({ row }) => {
      return !row.original.approved ? (
        <StatusIndicator
          status={row.original.approved}
          updateStatusUrl={`/seller/approve/${row.original._id}`}
          mutationTag="/seller"
          variant="secondary"
          text="PENDING"
        />
      ) : (
        <Check color="green" />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <Link href={`/dashboard/seller/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`/seller/delete/${row.original._id}`}
          validationTag="/seller"
          successMessage="Seller deleted successfully"
        />
      </div>
    ),
  },
];
