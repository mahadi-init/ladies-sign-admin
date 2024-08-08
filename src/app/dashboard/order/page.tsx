import PageTop from "@/components/native/PageTop";
import { Suspense } from "react";
import { productColumn } from "../product/column";
import { orderPagination } from "./data";
import OrderTableUIWrapper from "./table";

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
          data={parsed.data}
          columns={productColumn}
          totalPages={parsed.totalPages}
        />
      </Suspense>
    </>
  );
}