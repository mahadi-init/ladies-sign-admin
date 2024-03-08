"use client";
import { DataTable } from "@/components/native/DataTable";
import DropdownSelect from "@/components/native/DropdownSelect";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminType } from "@/shared/admins/admin.t";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { adminColumn } from "../../../shared/admins/AdminColumn";

const statusItems = ["ALL", "Active", "Inactive"];

export default function Wrapper({ admins }: { admins: AdminType[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [filteredAdmins, setFilteredAdmins] = useState<AdminType[]>(admins);

  console.log(filteredAdmins);

  //filter by status
  useEffect(() => {
    if (status === "ALL" || status === "") {
      setFilteredAdmins(admins);
    } else {
      setFilteredAdmins(admins.filter((item) => item.status === status));
    }
  }, [admins, status]);

  //filter by search
  useEffect(() => {
    setFilteredAdmins(
      admins.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [admins, search]);

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
            href={"/dashboard/admins/add"}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <BadgePlus />
          </Link>
        </div>
      </div>
      <DataTable columns={adminColumn} data={filteredAdmins} />
    </div>
  );
}
