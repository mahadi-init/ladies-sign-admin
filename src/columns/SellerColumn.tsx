"use client";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { Button } from "@/components/ui/button";
import { SellerType } from "@/types/seller.t";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const sellerColumn: ColumnDef<SellerType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NAME
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
