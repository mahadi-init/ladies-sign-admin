import { LoadingDataTable } from "@/components/native/LoadingDataTable";
import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";
import { Suspense } from "react";
import { sellerColumn } from "./column";
import { sellerPagination } from "./data";

export default async function Sellers({
  searchParams,
}: {
  searchParams: {
    filterBy: "default" | "search";
    index: number;
    limit: number;
    q: string;
  };
}) {
  const res = await sellerPagination(
    searchParams.filterBy,
    searchParams.index,
    searchParams.limit,
    searchParams.q,
  );
  const parsed = JSON.parse(res);

  return (
    <>
      <PageTop title="Seller" />
      <Suspense
        fallback={
          <LoadingDataTable columns={sellerColumn} data={JSON.parse(res)} />
        }
      >
        <TableUIWrapper
          data={parsed.data}
          columns={sellerColumn}
          totalPages={parsed.totalPages}
        />
      </Suspense>
    </>
  );
}
