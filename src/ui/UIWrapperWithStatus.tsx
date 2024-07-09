"use client";
import { DataTable } from "@/components/native/DataTable";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import SixSkeleton from "@/components/native/SixSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import { fetcher } from "@/https/get-request";
import updateRequest from "@/https/update-request";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { RefreshCwIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useDebouncedCallback } from "use-debounce";

interface TableUIWrapperProps<T> {
  route: string;
  columns: ColumnDef<T, unknown>[];
  statusValue?: string | null;
}

export default function UIWrapperWithStatus<
  T extends { status?: string; confirm?: boolean },
>({ route, columns, statusValue }: TableUIWrapperProps<T>) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { showStatus } = useStatus();

  // using search params
  const searchParams = useSearchParams();
  const index = searchParams.get("index") ?? "1";
  const limit = searchParams.get("limit") ?? "25";
  const search = searchParams.get("search");
  const status = searchParams.get("status") ?? statusValue;
  const filterBy = searchParams.get("filterBy") ?? "default";

  // data fetching
  const { data, error, isLoading } = useSWR<T[]>(
    `${route}/page?page=${index}&limit=${limit}&filterBy=${filterBy}&search=${search}&status=${status}`,
    fetcher,
  );

  // refresh all data
  const { trigger, isMutating } = useSWRMutation(
    `${route}/refresh`,
    updateRequest,
  );

  // handle search with 300 ms delay count
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("index", "1");

    if (value && value !== "") {
      params.set("filterBy", "search");
      params.set("search", value.trim() as string);
    } else {
      params.delete("search");
      params.set("filterBy", "default");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  const handleStatus = (status: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("index", "1");
    params.set("filterBy", "status");
    params.set("status", status as string);

    replace(`${pathname}?${params.toString()}`);
  };

  const handleLimit = (limit: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("limit", limit as string);
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePagination = (index: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("index", index.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const refreshDataInfo = async () => {
    const res = await trigger({});
    await showStatus("/order", "Data refreshed successfully", res);
  };

  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <div className="mb-4 flex items-center justify-between">
        <Input
          className="w-fit"
          placeholder="filter item.."
          autoFocus
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={search as string}
        />

        <div className="flex gap-2">
          <div className="flex gap-2">
            <select
              onChange={(e) => handleStatus(e.target.value)}
              className="mt-0.5 rounded-md bg-gray-100 p-2"
              defaultValue={status as string}
            >
              <option value="ALL">All</option>
              <option className="text-green-600" value="PENDING">
                PENDING
              </option>
              <option className="text-yellow-600" value="DONE">
                DONE
              </option>
            </select>
          </div>

          <Button
            onClick={refreshDataInfo}
            variant="outline"
            disabled={isMutating}
          >
            <div className={clsx(isMutating && "animate-spin")}>
              <RefreshCwIcon size={18} />
            </div>
          </Button>
        </div>
      </div>

      <div className="h-screen">
        {data ? (
          <>
            <DataTable columns={columns} data={data} />
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                <select
                  onChange={(e) => handleLimit(e.target.value)}
                  className="mt-0.5 rounded-md bg-gray-100 p-2"
                  defaultValue={limit}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="35">35</option>
                  <option value="50">50</option>
                </select>
              </div>

              <div className="mb-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    let i = parseInt(index);

                    if (i === 1) {
                      return;
                    }

                    handlePagination(--i);
                  }}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    let i = parseInt(index);
                    handlePagination(++i);
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : isLoading ? (
          <SixSkeleton />
        ) : (
          <DataTable columns={columns} data={[]} />
        )}
      </div>
    </div>
  );
}
