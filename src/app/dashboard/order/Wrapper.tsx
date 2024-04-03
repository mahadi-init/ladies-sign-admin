"use client";

import { Input } from "@/components/ui/input";
import { OrderSummaryType } from "@/types/order.t";
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
            value.toLowerCase().includes(search.toLowerCase())
        )
      )
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
        {/* <div className="flex gap-2">
          <DropdownSelect
            style="w-36"
            placeholder="status"
            items={statuses}
            selectedItem={status}
            setSelectedItem={setStatus}
          />
        </div> */}
      </div>
      {/* <DataTable column={orderColumn} data={filteredOrders} /> */}
    </div>
  );
}
