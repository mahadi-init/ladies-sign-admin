"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "flowbite-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>): JSX.Element {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <Table striped>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Head key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.HeadCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Table.HeadCell>
                );
              })}
            </Table.Head>
          ))}
          <Table.Body className="divide-y">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  className="bg-white"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell
                      key={cell.id}
                      className="whitespace-nowrap font-medium text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
