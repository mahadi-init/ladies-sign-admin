import React from "react";
import { couponColumn } from "./column";
import { DataTable } from "@/components/native/DataTable";
import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import { AdminType } from "@/types/admin";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admins = await getData<AdminType[]>(
    `${BACKEND_URL}/api/admin/all`,
    300,
    ["admins", "admin"]
  );
  const searchTargets = ["_id", "name", "email"];

  return (
    <>
      <div className="flex flex-col p-2 lg:justify-between lg:ml-72 lg:w-8/12 xl:flex-row xl:gap-4 xl:w-9/12 2xl:w-10/12">
        {children}
        <DataTable
          columns={couponColumn}
          //@ts-expect-error
          data={admins.data}
          searchTargets={searchTargets}
          addItemRoute="/dashboard/admins/add"
        />
      </div>
    </>
  );
}
