import React from "react";
import { brandColumn } from "./column";
import { DataTable } from "@/components/native/DataTable";
import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import { BrandType } from "@/types/brand";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brands = await getData<BrandType[]>(
    `${BACKEND_URL}/api/brand/all`,
    300,
    ["brand", "brands"]
  );
  const searchTargets = ["_id", "name"];

  return (
    <>
      <div className="flex flex-col p-2 lg:justify-between lg:ml-72 lg:w-8/12 xl:flex-row xl:gap-8 xl:w-9/12 2xl:w-10/12">
        {children}
        <DataTable
          columns={brandColumn}
          //@ts-expect-error
          data={brands.result}
          searchTargets={searchTargets}
          addItemRoute="/dashboard/brand/add"
        />
      </div>
    </>
  );
}
