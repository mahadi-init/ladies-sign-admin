"use client";

import { SiteUser } from "@/app/dashboard/users/page";
import ConfirmationDialog from "@/components/native/ConfirmationDialog";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import StatusIndicator from "@/components/native/StatusIndicator";
import { clerkClient } from "@clerk/nextjs";
import { ColumnDef } from "@tanstack/react-table";
import { Ban, LogOut, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const userColumn: ColumnDef<SiteUser>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "phone",
    header: "PHONE",
    cell: ({ row }) => {
      return <p className="truncate text-medium">{row.original.phone}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        //@ts-expect-error
        <StatusIndicator status={row.original.banned ? "Blocked" : "Active"} />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-8 items-center">
        <ConfirmationDialog
          alertText="This will delete user"
          action={async () =>
            // FIXME:Doesn't work
            await clerkClient.users.deleteUser(row.original.id)
          }
        >
          <HoverToolkit text="Logout user">
            <LogOut size={16} className="cursor-pointer" />
          </HoverToolkit>
        </ConfirmationDialog>
        <ConfirmationDialog
          alertText="This will delete user"
          action={async () =>
            // FIXME:Doesn't work
            await clerkClient.users.deleteUser(row.original.id)
          }
        >
          <HoverToolkit text="Ban user">
            <Ban size={16} className="cursor-pointer" />
          </HoverToolkit>
        </ConfirmationDialog>
        <ConfirmationDialog
          alertText="This will delete user"
          action={async () =>
            // FIXME:Doesn't work
            await clerkClient.users.deleteUser(row.original.id)
          }
        >
          <HoverToolkit text="Delete user">
            <Trash size={16} className="cursor-pointer" />
          </HoverToolkit>
        </ConfirmationDialog>
      </div>
    ),
  },
];
