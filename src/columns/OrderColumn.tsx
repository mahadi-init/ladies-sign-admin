"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import Link from "next/link";
import DeleteItem from "@/components/native/DeleteItem";
import Image from "next/image";
import { BACKEND_URL } from "@/consts/site-info";
import { deleteData } from "@/actions/delete";
import { OrderType } from "@/types/OrderType";
import { Badge } from "@/components/ui/badge";

export const orderColumn: ColumnDef<OrderType>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  // {
  //   accessorKey: "image",
  //   header: "IMAGE",
  //   cell: ({ row }) => {
  //     return row.original.image ? (
  //       <picture>
  //         <Image
  //           className="w-10"
  //           width={250}
  //           height={250}
  //           src={row.original.image}
  //           alt="cell image"
  //           loading="lazy"
  //         />
  //       </picture>
  //     ) : (
  //       <span className="text-xs">No Image</span>
  //     );
  //   },
  // },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NAME
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ADDRESS
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "TOTAL",
  },
  {
    accessorKey: "shippingCost",
    header: "SHIPPING",
  },
  {
    accessorKey: "subTotal",
    header: "SUBTOTAL",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <Badge
          variant={
            row.original.status !== "cancelled" ? "outline" : "destructive"
          }
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "DATE",
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {new Date(row.original.createdAt).toDateString().substring(0, 10)}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-8 items-center">
        <Link href={`/dashboard/admins/edit/${row.original._id}`}>
          <PencilIcon size={16} />
        </Link>
        <DeleteItem
          queryUrl={`${BACKEND_URL}/api/admin/${row.original._id}`}
          validationTag="admins"
          successMessage="Admin deleted successfully"
          serverAction={deleteData}
        />
      </div>
    ),
  },
];
