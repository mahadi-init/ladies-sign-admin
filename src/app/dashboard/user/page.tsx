import { LoadingDataTable } from "@/components/native/LoadingDataTable";
import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";
import { Suspense } from "react";
import { userColumn } from "./column";
import { userPagination } from "./data";

export default async function Users({
  searchParams,
}: {
  searchParams: {
    filterBy: "default" | "search";
    index: number;
    limit: number;
    q: string;
  };
}) {
  const res = await userPagination(
    searchParams.filterBy,
    searchParams.index,
    searchParams.limit,
    searchParams.q,
  );
  const parsed = JSON.parse(res);

  return (
    <>
      <PageTop title="Users" />
      <Suspense>
        <TableUIWrapper
          data={parsed.data}
          columns={userColumn}
          totalPages={parsed.totalPages}
        />
      </Suspense>
    </>
  );
}
