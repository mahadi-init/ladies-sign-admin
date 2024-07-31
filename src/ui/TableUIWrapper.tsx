"use client";
import Limit from "@/components/common/limit";
import TablePagination from "@/components/common/pagination";
import Search from "@/components/common/search";
import { DataTable } from "@/components/native/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "flowbite-react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TableUIWrapperProps<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  totalPages: number;
}

export default function TableUIWrapper<T>({
  data,
  columns,
  totalPages,
}: TableUIWrapperProps<T>) {
  const pathname = usePathname();

  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <Search />
        <Link href={`${pathname}/add`}>
          <Button color="gray">
            <PlusIcon className="mr-2 h-5 w-5" />
            Add
          </Button>
        </Link>
      </div>
      <div className="h-screen">
        <DataTable columns={columns} data={data} />
        <div className="mt-8 flex items-center justify-between">
          <div className="-mt-6">
            <Limit />
          </div>
          <TablePagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
