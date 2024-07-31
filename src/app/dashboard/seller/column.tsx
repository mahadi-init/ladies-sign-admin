"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { SellerType } from "@/types/seller";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "flowbite-react";
import { Check, PencilIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { changeStatus, remove } from "./action";

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
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/seller/account?id=${row.original._id}&name=${row.original.name}`}
          className="cursor-pointer font-medium text-blue-600 hover:underline"
        >
          {row.original.name}
        </Link>
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
    accessorKey: "approved",
    header: "APPROVED",
    cell: ({ row }) => {
      return !row.original.approved ? (
        <Badge
          className="w-fit cursor-pointer rounded-lg"
          color="failure"
          onClick={() => {
            toast.promise(changeStatus(row.original._id), {
              loading: "Loading..",
              success: () => {
                return "Seller Approved";
              },
              error: () => {
                return "Update Failed";
              },
            });
          }}
        >
          {!row.original.approved && "PENDING"}
        </Badge>
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
          _id={row.original._id}
          action={remove}
          message="Seller Deleted"
        />
      </div>
    ),
  },
];
