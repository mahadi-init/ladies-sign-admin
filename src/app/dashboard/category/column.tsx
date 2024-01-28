"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DeleteCategory from "./_delete/delete";
import { CategoryType } from "./type";

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
    cell: ({ row }) => <DeleteCategory id={row.original._id} />,
  },
];
