"use client";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { Button } from "@/components/ui/button";
import { AdminType } from "@/types/admin.t";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import Image from "next/image";
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NAME
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "img",
    header: "IMAGE",
    cell: ({ row }) => {
      return row.original.img ? (
        <Image
          className="w-10 rounded-full"
          width={250}
          height={250}
          src={row.original.img}
          alt="cell image"
          loading="lazy"
        />
      ) : (
        <span className="text-xs">No Image</span>
      );
    },
  },

  {
    accessorKey: "phone",
    header: "PHONE",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return <StatusIndicator status={row.original.status} />;
    },
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