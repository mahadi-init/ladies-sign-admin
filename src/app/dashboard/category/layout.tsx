import React from "react";
import { categoryColumn } from "./column";
import { DataTable } from "@/components/native/DataTable";
import { CategoryType } from "@/types/category";
import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";

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
    <>
      <div className="flex flex-col p-2 lg:justify-between lg:ml-72 lg:w-8/12 xl:flex-row xl:gap-8 xl:w-9/12 2xl:w-10/12">
        {children}
        <DataTable
          columns={categoryColumn}
          //@ts-expect-error
          data={categories.result}
          searchTargets={searchTargets}
          addItemRoute="/dashboard/category/add"
        />
      </div>
    </>
  );
}
