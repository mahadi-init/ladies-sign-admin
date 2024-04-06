import PageTop from "@/components/native/PageTop";
import { getOrders } from "@/utils/get-orders";

export default async function Orders() {
  const orders = await getOrders();
  // const searchTargets = ["invoice", "name", "address"];

  return (
    <>
      <PageTop title="Orders" />
      {/* <Wrapper orders={orders} /> */}
    </>
  );
}
