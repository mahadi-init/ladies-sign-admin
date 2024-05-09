"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { Button } from "@/components/ui/button";
import { ReviewType } from "@/types/review.t";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const reviewColumn: ColumnDef<ReviewType>[] = [
  {
    accessorKey: "index",
    header: "INDEX",
    cell: ({ row }) => {
      return <p># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "product",
    header: "PRODUCT",
    // cell: ({ row }) => {
    //   return (
    //     <Link
    //       href={`/dashboard/products/edit/${row.original.productId}`}
    //       className="underline"
    //     >
    //       {row.original.product}
    //     </Link>
    //   );
    // },
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
    accessorKey: "userId",
    header: "USER",
    // cell: ({ row }) => {
    //   //TODO:ADD USER ROUTE
    //   return (
    //     <Link
    //       href={`/dashboard/users/details/${row.original.userId}`}
    //       className="underline"
    //     >
    //       {row.original.userName}
    //     </Link>
    //   );
    // },
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
          <ArrowUpDown className="w-4 h-4 ml-2" />
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
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <DeleteItem
          queryUrl={`review/delete/${row.original.productId}`}
          validationTag="reviews"
          successMessage="Review deleted successfully"
        />
      </div>
    ),
  },
];