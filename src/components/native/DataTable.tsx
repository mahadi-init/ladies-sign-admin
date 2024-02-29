"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropdownSelect from "./DropdownSelect";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchTargets?: string[];
  statusFiltering?: string[];
  addItemRoute?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchTargets = [],
  statusFiltering,
  addItemRoute,
}: DataTableProps<TData, TValue>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchTarget, setSearchTarget] = useState<string>(searchTargets[0]);
  const [statusFilter, setStatusFilter] = useState<string>();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {
    table.getColumn("status")?.setFilterValue(statusFilter);
  }, [statusFilter, table]);

  //FIXME: Fix the resposivness of the columns
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        {searchTargets.length > 0 && (
          <div className="flex gap-2 items-center">
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter Item.."
                value={
                  (table.getColumn(searchTarget)?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn(searchTarget)
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-xs"
              />
            </div>
            <DropdownSelect
              placeholder={`Filter by ${searchTarget}`}
              items={searchTargets}
              selectedItem={searchTarget}
              setSelectedItem={setSearchTarget}
            />
          </div>
        )}
        <div className="flex gap-2 items-center">
          {statusFiltering && (
            <DropdownSelect
              placeholder="Status"
              items={statusFiltering}
              selectedItem={statusFilter}
              setSelectedItem={setStatusFilter}
            />
          )}
          {addItemRoute && (
            <Link
              href={addItemRoute}
              className={buttonVariants({ size: "sm", variant: "outline" })}
            >
              <BadgePlus />
            </Link>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end items-center py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
