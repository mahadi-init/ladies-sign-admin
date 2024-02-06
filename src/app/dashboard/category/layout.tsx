import React from "react";
import { DataTable } from "@/components/native/DataTable";
import { CategoryType } from "@/types/category";
import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import PageTop from "@/components/native/PageTop";
import { categoryColumn } from "@/columns/CategoryColumn";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getData<CategoryType[]>(
    `${BACKEND_URL}/api/category/all`,
    300,
    ["category", "categories"],
  );
  const searchTargets = ["_id", "parent"];

  return (
    <div className="px-4 mt-12 lg:mt-4 lg:ml-72">
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
    </div>
  );
}
