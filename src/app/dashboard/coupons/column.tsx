"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import Link from "next/link";
import { deleteCategory } from "./_delete/_action";
import DeleteItem from "@/components/native/DeleteItem";
import Image from "next/image";
import { CouponType } from "./type";

export const couponColumn: ColumnDef<CouponType>[] = [
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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TITLE
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "couponCode",
    header: "CODE",
  },
  {
    accessorKey: "discountPercentage",
    header: "DISCOUNT",
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
  },
  {
    accessorKey: "createdAt",
    header: "START",
    cell: ({ row }) => {
      return (
        <p>{new Date(row.original.endTime!!).toISOString().substring(0, 10)}</p>
      );
    },
  },
  {
    accessorKey: "endTime",
    header: "END",
    cell: ({ row }) => {
      return (
        <p>{new Date(row.original.endTime!!).toISOString().substring(0, 10)}</p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex  items-center gap-8">
        <Link href={`/dashboard/coupons/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem id={row.original._id} serverAction={deleteCategory} />
      </div>
    ),
  },
];
