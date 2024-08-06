import { LoadingDataTable } from "@/components/native/LoadingDataTable";
import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";
import { Suspense } from "react";
import { adminColumn } from "./column";
import { adminPagination } from "./data";

export default async function Admins({
  searchParams,
}: {
  searchParams: {
    filterBy: "default" | "search";
    index: number;
    limit: number;
    q: string;
  };
}) {
  const res = await adminPagination(
    searchParams.filterBy,
    searchParams.index,
    searchParams.limit,
    searchParams.q,
  );
  const parsed = JSON.parse(res);

  return (
    <>
      <PageTop title="Admins" />
      <Suspense>
        <TableUIWrapper
          data={parsed.data}
          columns={adminColumn}
          totalPages={parsed.totalPages}
        />
      </Suspense>
    </>
  );
}
