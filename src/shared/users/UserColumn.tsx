"use client";

import ConfirmationDialog from "@/components/native/ConfirmationDialog";
import StatusIndicator from "@/components/native/StatusIndicator";
import { clerkClient } from "@clerk/nextjs";
import { ColumnDef } from "@tanstack/react-table";
import { Ban, LogOut, Trash } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { UserType } from "./user.t";

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
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/users/details/${row.original.id}`}
          className="truncate text-medium underline"
        >
          {row.original.name ?? "--"}
        </Link>
      );
    },
  },
  {
    accessorKey: "image",
    header: "IMAGE",
    cell: ({ row }) => {
      return (
        <Image
          className="rounded-full"
          src={row.original.image}
          width={50}
          height={50}
          alt="profile"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <p className="truncate text-medium">
          {moment(row.original.lastSignInAt).fromNow()}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <StatusIndicator status={row.original.banned ? "INACTIVE" : "ACTIVE"} />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-8 items-center">
        <ConfirmationDialog
          alertText="This will logout user"
          action={async () =>
            // FIXME:Doesn't work
            await clerkClient.users.deleteUser(row.original.id)
          }
        >
          <LogOut size={16} className="cursor-pointer" />
        </ConfirmationDialog>
        <ConfirmationDialog
          alertText="This will ban user"
          action={async () =>
            // FIXME:Doesn't work
            await clerkClient.users.deleteUser(row.original.id)
          }
        >
          <Ban size={16} className="cursor-pointer" />
        </ConfirmationDialog>
        <ConfirmationDialog
          alertText="This will delete user"
          action={async () =>
            // FIXME:Doesn't work
            await clerkClient.users.deleteUser(row.original.id)
          }
        >
          <Trash size={16} className="cursor-pointer" />
        </ConfirmationDialog>
      </div>
    ),
  },
];
