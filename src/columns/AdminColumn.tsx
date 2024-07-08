"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { AdminType } from "@/types/admin.t";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const adminColumn: ColumnDef<AdminType>[] = [
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
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <Link href={`/dashboard/admin/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`/admin/delete/${row.original._id}`}
          validationTag="/admin"
          successMessage="Admin deleted successfully"
        />
      </div>
    ),
  },
];
