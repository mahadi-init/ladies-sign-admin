"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import Link from "next/link";
import DeleteItem from "@/components/native/DeleteItem";
import Image from "next/image";
import { deleteData } from "@/actions/delete";
import { BACKEND_URL } from "@/consts/site-info";
import { BrandType } from "@/types/brand";

export const brandColumn: ColumnDef<BrandType>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      return row.original.logo ? (
        <picture>
          <Image
            className="w-10"
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
          Name
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex  items-center gap-8">
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
