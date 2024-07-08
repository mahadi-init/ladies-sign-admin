"use client";
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
  },
  {
    accessorKey: "thumbnail",
    header: "THUBMAIL",
    cell: ({ row }) => {
      return row.original.variants && row.original?.variants[0]?.img ? (
        <ImagepopOver img={row.original?.variants[0].img} />
      ) : (
        <span className="text-xs">No Image</span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell: ({ row }) => {
      if (!row.original.variants) {
        return 0;
      }

      let totalPrice = 0;
      let avgPrice = 0;

      row.original.variants?.map((p) => {
        totalPrice += p.price;
      });

      avgPrice = totalPrice / row.original.variants?.length;

      return <p>৳ {avgPrice}</p>;
    },
  },

  {
    accessorKey: "sellerPrice",
    header: "SELLER PRICE",
    cell: ({ row }) => {
      if (!row.original.variants) {
        return 0;
      }

      let totalPrice = 0;
      let avgPrice = 0;

      row.original.variants?.map((p) => {
        totalPrice += p.sellerPrice;
      });

      avgPrice = totalPrice / row.original.variants?.length;

      return <p>৳ {avgPrice}</p>;
    },
  },
  {
    accessorKey: "quantity",
    header: "QUANTITY",
    cell: ({ row }) => {
      let qty = 0;

      row.original.variants?.map((q) => {
        qty += q.quantity;
      });

      return <p>{qty}</p>;
    },
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
