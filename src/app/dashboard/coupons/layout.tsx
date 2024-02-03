import React from "react";
import { couponColumn } from "./column";
import { DataTable } from "@/components/native/DataTable";
import { CouponType } from "@/types/coupon";
import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coupons: CouponType[] = await getData(
    `${BACKEND_URL}/api/coupon`,
    300,
    ["coupon", "coupons"],
  );
  const searchTargets = ["_id", "title", "couponCode"];

  return (
    <>
      <div className="flex flex-col p-2 lg:justify-between lg:ml-72 lg:w-8/12 xl:flex-row xl:gap-4 xl:w-9/12 2xl:w-10/12">
        {children}
        <DataTable
          columns={couponColumn}
          data={coupons}
          searchTargets={searchTargets}
          addItemRoute="/dashboard/coupons/add"
        />
      </div>
    </>
  );
}
