import PageTop from "@/components/native/PageTop";
import { Suspense } from "react";
import { productColumn } from "./column";
import { productPagination } from "./data";
import ProductTableUIWrapper from "./table";

export default async function Products({
  searchParams,
}: {
  searchParams: {
    filterBy: "default" | "search";
    index: number;
    limit: number;
    q: string;
    status: "IN-STOCK" | "OUT-OF-STOCK" | "DISCONTINUED";
  };
}) {
  const res = await productPagination(
    searchParams.filterBy,
    searchParams.index,
    searchParams.limit,
    searchParams.q,
    searchParams.status,
  );
  const parsed = JSON.parse(res);

  return (
    <>
      <PageTop title="Products" />
      <Suspense>
        <ProductTableUIWrapper
          data={parsed.data}
          columns={productColumn}
          totalPages={parsed.totalPages}
        />
      </Suspense>
    </>
  );
}
