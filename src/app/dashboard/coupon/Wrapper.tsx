"use client";
import { DataTable } from "@/components/native/DataTable";
import { Input } from "@/components/ui/input";
import { CouponType } from "@/types/coupon.t";
import { useEffect, useState } from "react";
import { couponColumn } from "./CouponColumn";

export default function Wrapper({ coupons }: { coupons: CouponType[] }) {
  const [status, setStatus] = useState("");
  const [filteredCoupons, setFilteredCoupons] = useState<CouponType[]>(coupons);

  //filter by status
  useEffect(() => {
    if (status === "ALL" || status === "") {
      setFilteredCoupons(coupons);
    } else {
      setFilteredCoupons(coupons.filter((item) => item.status === status));
    }
  }, [coupons, status]);

  // filter by search
  const handleSearchFilter = (search: string): void => {
    setFilteredCoupons(
      coupons.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  };

  return (
    <div className="w-full mt-4 flex flex-col gap-4 ">
      <div className="flex items-center justify-between ">
        <Input
          className="w-fit"
          placeholder="filter item.."
          onChange={(e) => handleSearchFilter(e.target.value)}
        />
        <div className="flex gap-2">
          {/* <DropdownSelect
            placeholder="status"
            items={Status}
            selectedItem={status}
            setSelectedItem={setStatus}
          />
          <Link
            href={"/dashboard/coupons"}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <BadgePlus />
          </Link> */}
        </div>
      </div>
      <DataTable column={couponColumn} data={filteredCoupons} />
    </div>
  );
}
