import React from "react";
import { couponColumn } from "./column";
import { DataTable } from "@/components/native/DataTable";
import { AdminType } from "./type";
import { getAdmins } from "./utils/get-admins";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admins: AdminType[] = await getAdmins();
  const searchTargets = ["_id", "name", "email"];

  return (
    <>
      <div className="flex flex-col p-2 lg:justify-between lg:ml-72 lg:w-8/12 xl:flex-row xl:gap-4 xl:w-9/12 2xl:w-10/12">
        {children}
        <DataTable
          columns={couponColumn}
          data={admins}
          searchTargets={searchTargets}
          addItemRoute="/dashboard/admins/add"
        />
      </div>
    </>
  );
}
