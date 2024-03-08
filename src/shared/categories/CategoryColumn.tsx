"use client";
import { deleteData } from "@/actions/delete";
import DeleteItem from "@/components/native/DeleteItem";
import StatusIndicator from "@/components/native/StatusIndicator";
import { Button } from "@/components/ui/button";
import { Status } from "@/types/enums.t";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BACKEND_URL } from "../../../site-info";
import { CategoryType } from "./category.t";

export const categoryColumn: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "index",
    header: "INDEX",
    cell: ({ row }) => {
      return <p># {row.index + 1}</p>;
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
          PARENT
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "img",
    header: "IMAGE",
    cell: ({ row }) => {
      return row.original.img ? (
        <picture>
          <Image
            className="max-w-10"
            width={250}
            height={250}
            src={row.original.img}
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
    accessorKey: "productType",
    header: "PRODUCT TYPE",
  },
  {
    accessorKey: "children",
    header: "ITEMS",
    cell: ({ row }) => {
      return row.original.children?.length;
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return <StatusIndicator status={row.original.status as Status} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-8 items-center">
        <Link href={`/dashboard/category/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`${BACKEND_URL}/api/category/delete/${row.original._id}`}
          validationTag="category"
          successMessage="Category deleted successfully"
          serverAction={deleteData}
        />
      </div>
    ),
  },
];
