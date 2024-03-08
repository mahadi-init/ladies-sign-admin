"use client";

import { DataTable } from "@/components/native/DataTable";
import DropdownSelect from "@/components/native/DropdownSelect";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { orderColumn } from "@/shared/Orders/OrderColumn";
import { OrderSummaryType } from "@/shared/Orders/order.t";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const statusItems = ["ALL", "pending", "processing", "delivered", "cancelled"];

export default function Wrapper({ orders }: { orders: OrderSummaryType[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);

  //filter by status
  useEffect(() => {
    if (status === "ALL") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((item) => item.status === status));
    }
  }, [orders, status]);

  //FIXME: INVOICE SEARCH
  //filter by search
  useEffect(() => {
    setFilteredOrders(
      orders.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [orders, search]);

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
      <DataTable columns={orderColumn} data={filteredOrders} />
    </div>
  );
}
