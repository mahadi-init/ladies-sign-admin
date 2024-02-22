import getData from "@/actions/get";
import { couponColumn } from "@/columns/CouponColumn";
import { DataTable } from "@/components/native/DataTable";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { CouponType } from "@/types/coupon";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coupons: CouponType[] = await getData(
    `${BACKEND_URL}/api/coupon`,
    300,
    ["coupon", "coupons"]
  );
  const searchTargets = ["_id", "title", "couponCode"];

  return (
    <>
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
    </>
  );
}
