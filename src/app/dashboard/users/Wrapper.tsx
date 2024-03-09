"use client";
import { DataTable } from "@/components/native/DataTable";
import DropdownSelect from "@/components/native/DropdownSelect";
import { Input } from "@/components/ui/input";
import { Statuses } from "@/data/statuses.data";
import { userColumn } from "@/shared/users/UserColumn";
import { UserType } from "@/shared/users/user.t";
import { useEffect, useState } from "react";

export default function Wrapper({ users }: { users: UserType[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);

  // filter by status
  useEffect(() => {
    if (status === "ALL" || status === "") {
      setFilteredUsers(users);
    } else if (status === "Banned") {
      setFilteredUsers(users.filter((item) => item.banned === true));
    } else {
      setFilteredUsers(users.filter((item) => item.banned === false));
    }
  }, [users, status]);

  //filter by search
  useEffect(() => {
    setFilteredUsers(
      users.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [users, search]);

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
            placeholder="Status"
            items={Statuses}
            selectedItem={status}
            setSelectedItem={setStatus}
          />
          {/* <Link
            href={"/dashboard/category/add"}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <BadgePlus />
          </Link> */}
        </div>
      </div>
      <DataTable columns={userColumn} data={filteredUsers} />
    </div>
  );
}
