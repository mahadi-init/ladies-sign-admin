"use client";

import { DataTable } from "@/components/native/DataTable";
import DropdownSelect from "@/components/native/DropdownSelect";
import { Input } from "@/components/ui/input";
import { orderColumn } from "@/shared/Orders/OrderColumn";
import { statuses } from "@/shared/Orders/order-statuses.data";
import { OrderSummaryType } from "@/shared/Orders/order.t";
import { useEffect, useState } from "react";

export default function Wrapper({ orders }: { orders: OrderSummaryType[] }) {
  const [status, setStatus] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);

  //filter by status
  useEffect(() => {
    if (status === "ALL" || status === "") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((item) => item.status === status));
    }
  }, [orders, status]);

  //FIXME: INVOICE SEARCH
  // filter by search
  const handleSearchFilter = (search: string): void => {
    setFilteredOrders(
      orders.filter((item) =>
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
            style="w-36"
            placeholder="status"
            items={statuses}
            selectedItem={status}
            setSelectedItem={setStatus}
          />
        </div>
      </div>
      <DataTable columns={orderColumn} data={filteredOrders} />
    </div>
  );
}
