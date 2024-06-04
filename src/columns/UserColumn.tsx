"use client";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { UserType } from "@/types/user.t";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const userColumn: ColumnDef<UserType>[] = [
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
    cell: ({ row }) => {
      return <p className="text-medium truncate">{row.original.phone}</p>;
    },
  },
  {
    accessorKey: "address",
    header: "ADDRESS",
    cell: ({ row }) => {
      return <p>{row.original.address ?? "-----------"}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "SINCE",
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {/* @ts-expect-error */}
          {new Date(row.original.createdAt).toDateString()}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <StatusIndicator
          status={row.original.status}
          updateStatusUrl={`/user/change-status/${row.original._id}`}
          mutationTag="/user"
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <DeleteItem
          queryUrl={`/user/delete/${row.original._id}`}
          validationTag="/user"
          successMessage="User deleted successfully"
        />
      </div>
    ),
  },
];
