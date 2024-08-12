import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";
import { Suspense } from "react";
import { reviewColumn } from "./column";
import { reviewPagination } from "./data";

export default async function Reviews({
  searchParams,
}: {
  searchParams: {
    filterBy: "default" | "rating";
    index: number;
    limit: number;
    rating: 1 | 2 | 3 | 4 | 5;
    q: string;
  };
}) {
  const data = await reviewPagination(
    searchParams.filterBy,
    searchParams.index,
    searchParams.limit,
    searchParams.rating,
    searchParams.q,
  );

  const parsed = JSON.parse(data);

  return (
    <>
      <PageTop title="Reviews" />
      <Suspense>
        <TableUIWrapper
          columns={reviewColumn}
          data={parsed.data}
          totalPages={parsed.totalPages}
        />
      </Suspense>
    </>
  );
}
