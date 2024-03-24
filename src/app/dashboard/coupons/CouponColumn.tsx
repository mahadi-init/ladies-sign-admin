"use client";
import { deleteData } from "@/actions/delete";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/site-info";
import { CouponType } from "@/types/coupon.t";
import { Status } from "@/types/enums.t";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PencilIcon } from "lucide-react";
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
    accessorKey: "logo",
    header: "LOGO",
    cell: ({ row }) => {
      return row.original.logo ? (
        <CldImage
          className="w-10 rounded-full"
          width={250}
          height={250}
          crop="fill"
          src={row.original.logo}
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
      return <StatusIndicator status={row.original.status as Status} />;
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
      <div className="flex gap-8 items-center">
        <Link href={`/dashboard/coupons/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`${BACKEND_URL}/api/coupon/${row.original._id}`}
          validationTag="coupons"
          successMessage="Coupon deleted successfull"
          serverAction={deleteData}
        />
      </div>
    ),
  },
];
