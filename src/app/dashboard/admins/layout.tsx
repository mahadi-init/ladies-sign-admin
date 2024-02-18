import getData from "@/actions/get";
import { adminColumn } from "@/columns/AdminColumn";
import { DataTable } from "@/components/native/DataTable";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { AdminType } from "@/types/admin";
import React from "react";

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
    </>
  );
}
