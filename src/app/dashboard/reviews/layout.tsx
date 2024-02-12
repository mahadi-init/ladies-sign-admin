import React from "react";
import { DataTable } from "@/components/native/DataTable";
import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import PageTop from "@/components/native/PageTop";
import { reviewColumn } from "@/columns/ReviewColumn";
import { ReviewType } from "@/types/review";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reviews: ReviewType[] = await getData(
    `${BACKEND_URL}/api/review/all`,
    300,
    ["review", "reviews"],
  );
  const searchTargets = ["_id", "product", "comment"];

  return (
    <div className="px-4 mt-12 lg:mt-4 lg:ml-72">
      <PageTop title="Reviews" />
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        {children}
        <DataTable
          columns={reviewColumn}
          //@ts-expect-error
          data={reviews.data}
          searchTargets={searchTargets}
        />
      </div>
    </div>
  );
}
