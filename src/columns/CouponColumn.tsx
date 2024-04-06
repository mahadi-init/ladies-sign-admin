"use client";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { CouponType } from "@/types/coupon.t";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import { CldImage } from "next-cloudinary";
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
        <CldImage
          className="w-10 rounded-full"
          width={250}
          height={250}
          crop="fill"
          src={row.original.img}
          alt="cell image"
          loading="lazy"
        />
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
      return <StatusIndicator status={row.original.status} />;
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
