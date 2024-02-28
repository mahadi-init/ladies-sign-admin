"use client";

import { deleteData } from "@/actions/delete";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/consts/site-info";
import { BrandType } from "@/types/brand";
import { Status } from "@/types/status";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const brandColumn: ColumnDef<BrandType>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "logo",
    header: "LOGO",
    cell: ({ row }) => {
      return row.original.logo ? (
        <picture>
          <Image
            className="max-w-10"
            width={250}
            height={250}
            src={row.original.logo}
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
    header: "EMAIL",
  },
  {
    accessorKey: "website",
    header: "WEBSITE",
  },
  {
    accessorKey: "location",
    header: "LOCATION",
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
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-8 items-center">
        <Link href={`/dashboard/brand/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`${BACKEND_URL}/api/brand/delete/${row.original._id}`}
          validationTag="brands"
          successMessage="Brand deleted successfully"
          serverAction={deleteData}
        />
      </div>
    ),
  },
];
