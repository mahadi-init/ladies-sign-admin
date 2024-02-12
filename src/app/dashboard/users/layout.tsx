import React from "react";
import { DataTable } from "@/components/native/DataTable";
import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import PageTop from "@/components/native/PageTop";
import { UserType } from "@/types/user";
import { userColumn } from "@/columns/UserColumn";

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
    <div className="px-4 mt-12 lg:mt-4 lg:ml-72">
      <PageTop title="Users" />
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        {children}
        <DataTable
          columns={userColumn}
          //@ts-expect-error
          data={users.data}
          searchTargets={searchTargets}
          // addItemRoute="/dashboard/users/add"
        />
      </div>
    </div>
  );
}
