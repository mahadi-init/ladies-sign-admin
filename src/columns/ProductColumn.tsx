"use client";
import ProductDetailsDialog from "@/app/dashboard/product/_components/product-details-dialog";
import DeleteItem from "@/components/native/DeleteItem";
import { ImagepopOver } from "@/components/native/ImagePopOver";
import { ProductType } from "@/types/product.t";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const productColumn: ColumnDef<ProductType>[] = [
  {
    accessorKey: "index",
    header: "INDEX",
    cell: ({ row }) => {
      return <p># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => <ProductDetailsDialog id={row.original._id} />,
  },
  {
    accessorKey: "thumbnail",
    header: "THUBMAIL",
    cell: ({ row }) => {
      return row.original.thumbnail ? (
        <ImagepopOver img={row.original.thumbnail} />
      ) : (
        <span className="text-xs">No Image</span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell: ({ row }) => {
      return <p>৳ {row.original.price}</p>;
    },
  },
  {
    accessorKey: "quantity",
    header: "QUANTITY",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <p
          className={clsx(
            row.original.status === "IN-STOCK"
              ? "text-green-500"
              : "text-red-500",
            "font-medium",
          )}
        >
          {row.original.status}
        </p>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <Link href={`/dashboard/product/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`/product/delete/${row.original._id}`}
          validationTag="/product"
          successMessage="Product deleted successfully"
        />
      </div>
    ),
  },
];
