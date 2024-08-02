"use client";
import Limit from "@/components/common/limit";
import TablePagination from "@/components/common/pagination";
import Search from "@/components/common/search";
import { DataTable } from "@/components/native/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import StatusFilter from "./status-filter";

interface TableUIWrapperProps<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  totalPages: number;
}

export default function OrderTableUIWrapper<T>({
  data,
  columns,
  totalPages,
}: TableUIWrapperProps<T>) {

  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <Search />
        <div className="flex items-center gap-2">
          <StatusFilter />
        </div>
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
