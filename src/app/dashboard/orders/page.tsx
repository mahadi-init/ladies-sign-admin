import { orderColumn } from "@/columns/OrderColumn";
import { DataTable } from "@/components/native/DataTable";
import PageTop from "@/components/native/PageTop";
import { getOrders } from "@/utils/get-orders";

export default async function Orders() {
  const orders = await getOrders();
  const searchTargets = ["invoice", "name", "address"];

  return (
    <>
      <PageTop title="Orders" />
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        <DataTable
          columns={orderColumn}
          data={orders}
          statusFiltering={["pending", "processing", "delivered", "cancelled"]}
          searchTargets={searchTargets}
        />
      </div>
    </>
  );
}
