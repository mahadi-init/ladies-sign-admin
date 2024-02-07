import React from "react";
import { DataTable } from "@/components/native/DataTable";
import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import { AdminType } from "@/types/admin";
import PageTop from "@/components/native/PageTop";
import { adminColumn } from "@/columns/AdminColumn";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admins = await getData<AdminType[]>(
    `${BACKEND_URL}/api/admin/all`,
    300,
    ["admins", "admin"],
  );
  const searchTargets = ["_id", "name", "email"];

  return (
    <div className="px-4 mt-12 lg:mt-4 lg:ml-72">
      <PageTop title="Admins" />
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        {children}
        <DataTable
          columns={adminColumn}
          //@ts-expect-error
          data={admins.data}
          searchTargets={searchTargets}
          addItemRoute="/dashboard/admins/add"
        />
      </div>
    </div>
  );
}
