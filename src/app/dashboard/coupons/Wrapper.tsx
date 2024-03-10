"use client";
import { DataTable } from "@/components/native/DataTable";
import DropdownSelect from "@/components/native/DropdownSelect";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Statuses } from "@/data/statuses.data";
import { couponColumn } from "@/shared/coupons/CouponColumn";
import { CouponType } from "@/shared/coupons/coupon.t";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
            value.toLowerCase().includes(search.toLowerCase()),
        ),
      ),
    );
  };

  return (
    <div className="mt-4 flex flex-col gap-4 ">
      <div className="flex items-center justify-between ">
        <Input
          className="w-fit"
          placeholder="filter item.."
          onChange={(e) => handleSearchFilter(e.target.value)}
        />
        <div className="flex gap-2">
          <DropdownSelect
            placeholder="status"
            items={Statuses}
            selectedItem={status}
            setSelectedItem={setStatus}
          />
          <Link
            href={"/dashboard/category/add"}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <BadgePlus />
          </Link>
        </div>
      </div>
      <DataTable columns={couponColumn} data={filteredCoupons} />
    </div>
  );
}