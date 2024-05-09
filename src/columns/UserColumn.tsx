"use client";
import { UserType } from "@/types/user.t";
import { ColumnDef } from "@tanstack/react-table";

export const userColumn: ColumnDef<UserType>[] = [
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
    // cell: ({ row }) => {
    //   return (
    //     <Link
    //       href={`/dashboard/users/details/${row.original.id}`}
    //       className="underline truncate text-medium"
    //     >
    //       {row.original.name ?? "--"}
    //     </Link>
    //   );
    // },
  },
  {
    accessorKey: "image",
    header: "IMAGE",
  },
  {
    accessorKey: "phone",
    header: "PHONE",
    cell: ({ row }) => {
      return <p className="truncate text-medium">{row.original.phone}</p>;
    },
  },
  {
    accessorKey: "lastSignInAt",
    header: "LAST LOGIN",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    // cell: ({ row }) => {
    //   return (
    //     <StatusIndicator status={row.original.banned ? "INACTIVE" : "ACTIVE"} />
    //   );
    // },
  },
  {
    id: "actions",
    cell: ({ row }) => <div className="flex items-center gap-8"></div>,
  },
];