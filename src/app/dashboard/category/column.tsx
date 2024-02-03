"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import Link from "next/link";
import DeleteItem from "@/components/native/DeleteItem";
import Image from "next/image";
import { CategoryType } from "@/types/category";
import { deleteData } from "@/actions/delete";
import { BACKEND_URL } from "@/consts/site-info";

export const categoryColumn: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: ({ row }) => {
      return row.original.img ? (
        <picture>
          <Image
            className="w-10"
            width={250}
            height={250}
            src={row.original.img}
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
    accessorKey: "parent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Parent
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "productType",
    header: "Product Type",
  },
  {
    accessorKey: "children",
    header: "Items",
    cell: ({ row }) => {
      return row.original.children?.length;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-8 items-center">
        <Link href={`/dashboard/category/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`${BACKEND_URL}/api/category/delete/${row.original._id}`}
          validationTag="category"
          successMessage="Category deleted successfully"
          serverAction={deleteData}
        />
      </div>
    ),
  },
];
