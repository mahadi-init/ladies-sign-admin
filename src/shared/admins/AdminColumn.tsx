"use client";
import { deleteData } from "@/actions/delete";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { Button } from "@/components/ui/button";
import { Status } from "@/types/enums.t";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BACKEND_URL } from "../../../site-info";
import { AdminType } from "./admin.t";

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
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "image",
    header: "IMAGE",
    cell: ({ row }) => {
      return row.original.image ? (
        <picture>
          <Image
            className="w-10 rounded-full"
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
    accessorKey: "email",
    header: "EMAIL",
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
      return <StatusIndicator status={row.original.status as Status} />;
    },
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
