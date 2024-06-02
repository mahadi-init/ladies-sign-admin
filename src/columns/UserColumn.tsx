"use client";
import StatusIndicator from "@/components/native/StatusIndicator";
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
    accessorKey: "phone",
    header: "PHONE",
    cell: ({ row }) => {
      return <p className="truncate text-medium">{row.original.phone}</p>;
    },
  },
  {
    accessorKey: "address",
    header: "ADDRESS",
    cell: ({ row }) => {
      return <p>{row.original.address ?? "-----------"}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "SINCE",
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {/* @ts-expect-error */}
          {new Date(row.original.createdAt).toDateString()}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <StatusIndicator
          status={row.original.status}
          // TODO: add mutationTag
          mutationTag=""
          // TODO: add updateStatusUrl
          updateStatusUrl=""
        />
      );
    },
  },
];
