import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";
import { Suspense } from "react";
import { withdrawPagination } from "./data";
import { withdrawColumn } from "./WithdrawColumn";

export default async function Withdraw({
  searchParams,
}: {
  searchParams: {
    filterBy: "default" | "search";
    index: number;
    limit: number;
    q: string;
  };
}) {
  const res = await withdrawPagination(
    searchParams.filterBy,
    searchParams.index,
    searchParams.limit,
    searchParams.q,
  );
  const parsed = JSON.parse(res);

  return (
    <div>
      <PageTop title="Withdraw" />
      {/* <UIWrapperWithStatus route="/withdraw" columns={withdrawColumn} /> */}
      <Suspense>
        <TableUIWrapper
          columns={withdrawColumn}
          data={parsed.data}
          totalPages={parsed.totalPages}
        />
      </Suspense>
    </div>
  );
}
