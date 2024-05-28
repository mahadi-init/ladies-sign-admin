"use client";
import DeleteItem from "@/components/native/DeleteItem";
import { ImagepopOver } from "@/components/native/ImagePopOver";
import StatusIndicator from "@/components/native/StatusIndicator";
import { CouponType } from "@/types/coupon.t";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const couponColumn: ColumnDef<CouponType>[] = [
  {
    accessorKey: "index",
    header: "INDEX",
    cell: ({ row }) => {
      return <p># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "NAME",
  },
  {
    accessorKey: "img",
    header: "LOGO",
    cell: ({ row }) => {
      return row.original.img ? (
        <ImagepopOver img={row.original.img} />
      ) : (
        <span className="text-xs">No Image</span>
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
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <StatusIndicator
          status={row.original.status}
          updateStatusUrl={`/coupon/change-status/${row.original._id}`}
          mutationTag="/coupon"
        />
      );
    },
  },
  {
    accessorKey: "startTime",
    header: "START",
    cell: ({ row }) => {
      return (
        <p>
          {row.original.startTime ? (
            new Date(row.original.startTime).toISOString().substring(0, 10)
          ) : (
            <span className="font-medium">-</span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "endTime",
    header: "END",
    cell: ({ row }) => {
      return (
        <p>
          {row.original.endTime ? (
            new Date(row.original.endTime).toISOString().substring(0, 10)
          ) : (
            <span className="font-medium">-</span>
          )}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-8">
        <Link href={`/dashboard/coupon/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`/coupon/delete/${row.original._id}`}
          validationTag="/coupon"
          successMessage="Coupon deleted successfully"
        />
      </div>
    ),
  },
];
