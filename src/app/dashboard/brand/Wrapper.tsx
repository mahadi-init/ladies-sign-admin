"use client";
import { DataTable } from "@/components/native/DataTable";
import DropdownSelect from "@/components/native/DropdownSelect";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { brandColumn } from "@/shared/brands/BrandColumn";
import { BrandType } from "@/shared/brands/brand.t";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const statusItems = ["ALL", "active", "inactive"];

export default function Wrapper({ brands }: { brands: BrandType[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [filteredBrands, setFilteredBrands] = useState<BrandType[]>(brands);

  //filter by status
  useEffect(() => {
    if (status === "ALL" || status === "") {
      setFilteredBrands(brands);
    } else {
      setFilteredBrands(brands.filter((item) => item.status === status));
    }
  }, [brands, status]);

  //filter by search
  useEffect(() => {
    setFilteredBrands(
      brands.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [brands, search]);

  return (
    <div className="mt-4 flex flex-col gap-4 ">
      <div className="flex items-center justify-between ">
        <Input
          className="w-fit"
          placeholder="filter item.."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <DropdownSelect
            placeholder="status"
            items={statusItems}
            selectedItem={status}
            setSelectedItem={setStatus}
          />
          <Link
            href={"/dashboard/brand/add"}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <BadgePlus />
          </Link>
        </div>
      </div>
      <DataTable columns={brandColumn} data={filteredBrands} />
    </div>
  );
}
