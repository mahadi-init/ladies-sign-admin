"use client";
import React from "react";
import { categoryColumn } from "./column";
import { CategoryType } from "./type";
import { DataTable } from "@/components/native/DataTable";

export default function CategoryWrapper({ data }: { data: CategoryType[] }) {
  const searchTargets = ["_id", "parent"];

  return (
    <div className="flex flex-col p-2 mt-24 lg:justify-between lg:ml-72 lg:w-8/12 xl:flex-row xl:gap-8 xl:w-9/12 2xl:w-10/12">
      <DataTable
        columns={categoryColumn}
        data={data}
        searchTargets={searchTargets}
        addItemRoute="/dashboard/category/add"
      />
    </div>
  );
}
