"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DeleteItem from "@/components/native/DeleteItem";
import { BACKEND_URL } from "@/consts/site-info";
import { deleteData } from "@/actions/delete";
import { ReviewType } from "@/types/review";
import Image from "next/image";
import Link from "next/link";

export const reviewColumn: ColumnDef<ReviewType>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "userId",
    header: "USER",
    cell: ({ row }) => {
      //TODO:ADD USER ROUTE
      return <Link href="#">{row.original.userId}</Link>;
    },
  },
  {
    accessorKey: "product",
    header: "PRODUCT",
    cell: ({ row }) => {
      //TODO:ADD PRODUCT ROUTE
      return <Link href="#">{row.original.product}</Link>;
    },
  },
  {
    accessorKey: "productImage",
    header: "IMAGE",
    cell: ({ row }) => {
      return row.original.productImage ? (
        <picture>
          <Image
            className="w-10"
            width={250}
            height={250}
            src={row.original.productImage}
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
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RATING
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          COMMENT
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-8 items-center">
        <DeleteItem
          queryUrl={`${BACKEND_URL}/api/review/delete/${row.original.productId}`}
          validationTag="reviews"
          successMessage="Review deleted successfully"
          serverAction={deleteData}
        />
      </div>
    ),
  },
];
