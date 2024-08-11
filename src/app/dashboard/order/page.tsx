import PageTop from "@/components/native/PageTop";
import { Suspense } from "react";
import { orderPagination } from "./data";
import OrderTableUIWrapper from "./table";
import { orderColumn } from "./column";

export default async function Orders({
  searchParams,
}: {
  searchParams: {
    filterBy: "default" | "search" | "status";
    index: number;
    limit: number;
    q: string;
    status: "WAITING" | "PROCESSING" | "DELIVERED" | "CANCELLED";
  };
}) {
  const res = await orderPagination(
    searchParams.filterBy,
    searchParams.index,
    searchParams.limit,
    searchParams.q,
    searchParams.status,
  );
  const parsed = JSON.parse(res);

  return (
    <>
      <PageTop title="Orders" />
      <Suspense>
        <OrderTableUIWrapper
          columns={orderColumn}
          data={parsed?.data}
          totalPages={parsed.totalPages}
          showLimit
        />
      </Suspense>
    </>
  );
}
