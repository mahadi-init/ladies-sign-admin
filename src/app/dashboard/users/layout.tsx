import getData from "@/actions/get";
import { userColumn } from "@/columns/UserColumn";
import { DataTable } from "@/components/native/DataTable";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { UserType } from "@/types/user";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users: UserType[] = await getData(`${BACKEND_URL}/api/user/all`, 0, [
    "user",
    "users",
  ]);
  const searchTargets = ["_id", "name", "email", "phone"];

  return (
    <>
      <PageTop title="Users" />
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        {children}
        <DataTable
          columns={userColumn}
          //@ts-expect-error
          data={users.data}
          searchTargets={searchTargets}
        />
      </div>
    </>
  );
}
