import getData from "@/actions/get";
import { categoryColumn } from "@/columns/CategoryColumn";
import { DataTable } from "@/components/native/DataTable";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { CategoryType } from "@/types/category";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getData<CategoryType[]>(
    `${BACKEND_URL}/api/category/all`,
    300,
    ["category", "categories"]
  );
  const searchTargets = ["_id", "parent"];

  return (
    <>
      <PageTop title="Category" />
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        {children}
        <DataTable
          columns={categoryColumn}
          //@ts-ignore
          data={categories.result}
          searchTargets={searchTargets}
          addItemRoute="/dashboard/category/add"
        />
      </div>
    </>
  );
}
