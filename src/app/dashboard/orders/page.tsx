import getData from "@/actions/get";
import { orderColumn } from "@/columns/OrderColumn";
import { DataTable } from "@/components/native/DataTable";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { OrderType } from "@/types/OrderType";

const getOrders = async (): Promise<OrderType[]> => {
  const res = await getData(`${BACKEND_URL}/api/order/orders`, 10, [
    "orders",
    "order",
  ]);

  //@ts-expect-error
  return res.data;
};

export default async function Orders() {
  const orders = await getOrders();
  const searchTargets = ["_id", "name", "email"];
  console.log(orders);

  return (
    <>
      <PageTop title="Admins" />
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        <DataTable
          columns={orderColumn}
          data={orders}
          searchTargets={searchTargets}
        />
      </div>
    </>
  );
}
