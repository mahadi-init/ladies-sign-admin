import React from "react";
import { DataTable } from "@/components/native/DataTable";
import { CouponType } from "@/types/coupon";
import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import PageTop from "@/components/native/PageTop";
import { couponColumn } from "@/columns/CouponColumn";

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
    <div className="px-4 mt-12 lg:mt-4 lg:ml-72">
      <PageTop title="Coupons" />
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        {children}
        <DataTable
          columns={couponColumn}
          data={coupons}
          searchTargets={searchTargets}
          addItemRoute="/dashboard/coupons/add"
        />
      </div>
    </div>
  );
}
