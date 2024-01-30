import React from "react";
import { categoryColumn } from "./column";
import { DataTable } from "@/components/native/DataTable";
import { CategoryType } from "./type";
import { getCategories } from "./utils/get-categories";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories: CategoryType[] = await getCategories();
  const searchTargets = ["_id", "parent"];

  return (
    <>
      <div className="flex flex-col p-2 lg:justify-between lg:ml-72 lg:w-8/12 xl:flex-row xl:gap-8 xl:w-9/12 2xl:w-10/12">
        {children}
        <DataTable
          columns={categoryColumn}
          data={categories}
          searchTargets={searchTargets}
          addItemRoute="/dashboard/category/add"
        />
      </div>
    </>
  );
}
