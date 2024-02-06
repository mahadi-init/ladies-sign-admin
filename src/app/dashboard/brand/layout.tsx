import React from "react";
import { DataTable } from "@/components/native/DataTable";
import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import { BrandType } from "@/types/brand";
import PageTop from "@/components/native/PageTop";
import { brandColumn } from "@/columns/BrandColumn";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brands = await getData<BrandType[]>(
    `${BACKEND_URL}/api/brand/all`,
    300,
    ["brand", "brands"],
  );
  const searchTargets = ["_id", "name"];

  return (
    <div className="px-4 mt-12 lg:mt-4 lg:ml-72">
      <PageTop title="Brand" />
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        {children}
        <DataTable
          columns={brandColumn}
          //@ts-expect-error
          data={brands.result}
          searchTargets={searchTargets}
          addItemRoute="/dashboard/brand/add"
        />
      </div>
    </div>
  );
}
