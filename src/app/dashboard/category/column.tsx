"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import { CategoryType } from "./type";
import Link from "next/link";
import { deleteCategory } from "./_delete/_action";
import DeleteItem from "@/components/native/DeleteItem";

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
          <img className="w-10" src={row.original.img} alt="cell image" />
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
      <div className="flex  items-center gap-8">
        <Link href={`/dashboard/category/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem id={row.original._id} serverAction={deleteCategory} />
      </div>
    ),
  },
];
