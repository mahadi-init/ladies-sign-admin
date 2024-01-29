import React from "react";
import { brandColumn } from "./column";
import { DataTable } from "@/components/native/DataTable";
import PageTop from "./PageTop";
import { BrandType } from "./type";
import { getBrands } from "./utils/get-brand";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brands: BrandType[] = await getBrands();
  const searchTargets = ["_id", "name"];

  return (
    <>
      <PageTop />
      <div className="flex flex-col p-2 mt-24 lg:justify-between lg:ml-72 lg:w-8/12 xl:flex-row xl:gap-8 xl:w-9/12 2xl:w-10/12">
        {children}
        <DataTable
          columns={brandColumn}
          data={brands}
          searchTargets={searchTargets}
        />
      </div>
    </>
  );
}
