"use client";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { BrandType } from "@/types/brand.t";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export const brandColumn: ColumnDef<BrandType>[] = [
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
    accessorKey: "image",
    header: "IMAGE",
    cell: ({ row }) => {
      return row.original.image ? (
        <CldImage
          className="w-10 rounded-full"
          width={250}
          height={250}
          crop="fill"
          src={row.original.image}
          alt="cell image"
          loading="lazy"
        />
      ) : (
        <span className="text-xs">No Image</span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },

  {
    accessorKey: "location",
    header: "LOCATION",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return <StatusIndicator status={row.original.status} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-8 items-center">
        <Link href={`/dashboard/brand/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`/brand/delete/${row.original._id}`}
          validationTag="/brand"
          successMessage="Brand deleted successfully"
        />
      </div>
    ),
  },
];
