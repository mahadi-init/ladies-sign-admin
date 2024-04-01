"use client";
import { DataTable } from "@/components/native/DataTable";
import { Input } from "@/components/ui/input";
// import { Status } from "@/data/statuses.data";
import { AdminType } from "@/types/admin.t";
import { useEffect, useState } from "react";
import { adminColumn } from "./AdminColumn";

export default function Wrapper({ admins }: { admins: AdminType[] }) {
  const [status, setStatus] = useState("");
  const [filteredAdmins, setFilteredAdmins] = useState<AdminType[]>(admins);

  //filter by status
  useEffect(() => {
    if (status === "ALL" || status === "") {
      setFilteredAdmins(admins);
    } else {
      setFilteredAdmins(admins.filter((item) => item.status === status));
    }
  }, [admins, status]);

  // filter by search
  const handleSearchFilter = (search: string): void => {
    setFilteredAdmins(
      admins.filter((item) =>
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
          /> */}
          {/* <Link
            href={"/dashboard/admins"}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <BadgePlus />
          </Link> */}
        </div>
      </div>
      <DataTable column={adminColumn} data={filteredAdmins} />
    </div>
  );
}
