"use client";

import { deleteData } from "@/actions/delete";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/consts/site-info";
import { AdminType } from "@/types/admin";
import { Status } from "@/types/status";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const adminColumn: ColumnDef<AdminType>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "IMAGE",
    cell: ({ row }) => {
      return row.original.image ? (
        <picture>
          <Image
            className="w-10"
            width={250}
            height={250}
            src={row.original.image}
            alt="cell image"
            loading="lazy"
          />
        </picture>
      ) : (
        <span className="text-xs">No Image</span>
      );
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
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          EMAIL
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "PHONE",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          STATUS
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <StatusIndicator status={row.original.status as Status} />;
    },
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-8 items-center">
        <Link href={`/dashboard/admins/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`${BACKEND_URL}/api/admin/${row.original._id}`}
          validationTag="admins"
          successMessage="Admin deleted successfully"
          serverAction={deleteData}
        />
      </div>
    ),
  },
];
