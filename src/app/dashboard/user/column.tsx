"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { UserType } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { remove } from "./action";

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
      return <p className="font-medium">{row.original.createdAt}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <DeleteItem
          _id={row.original._id}
          action={remove}
          message="Deleted successfully"
        />
      </div>
    ),
  },
];
