"use client";
import { DataTable } from "@/components/native/DataTable";
import DropdownSelect from "@/components/native/DropdownSelect";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryColumn } from "@/shared/categories/CategoryColumn";
import { CategoryType } from "@/shared/categories/category.t";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const statusItems = ["ALL", "Show", "Hide"];

export default function Wrapper({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [filteredCategories, setFilteredCategories] =
    useState<CategoryType[]>(categories);

  //filter by status
  useEffect(() => {
    if (status === "ALL" || status === "") {
      setFilteredCategories(categories);
    } else {
      setFilteredCategories(
        categories.filter((item) => item.status === status)
      );
    }
  }, [categories, status]);

  //filter by search
  useEffect(() => {
    setFilteredCategories(
      categories.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [categories, search]);

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
            href={"/dashboard/category/add"}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <BadgePlus />
          </Link>
        </div>
      </div>
      <DataTable columns={categoryColumn} data={filteredCategories} />
    </div>
  );
}
