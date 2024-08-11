import PageTop from "@/components/native/PageTop";
import { getPendingOrders, getSteadfastBalance, salesPermonth } from "./data";
import OrderTableUIWrapper from "./order/table";
import { orderColumn } from "./order/column";

export default async function Dashboard() {
  const balance = await getSteadfastBalance();
  const salesPerMonth = await salesPermonth();
  const pendingOrders = await getPendingOrders();

  // const data: any = await Promise.all([
  //   await fetcher("/dashboard/steadfast-balance"),
  //   await fetcher(`/dashboard/amount`),
  //   // await fetcher(`/dashboard/sales-per-month`),
  // ]);

  // //@ts-expect-error
  // const statisticData: DashboardOrderSummaryType = {
  //   balance: data[0]?.current_balance,
  //   ...(data[1] as object),
  // };
  //
  //console.log(balance);
  //console.log(salesPerMonth);
  //console.log(pendingOrders);

  return (
    <>
      <PageTop title="Dashboard" />
      {/* {data[0] && data[1] ? (
        <StatisticCards {...statisticData} />
      ) : (
        <p className="text-center font-semibold text-red-400">
          Overview data not found
        </p>
      )} */}
      {/* <Statistics data={data[2]} /> */}
      <h2 className="mb-4 mt-6 text-xl font-semibold">Mini orders</h2>
      <div className="mt-8">
        <OrderTableUIWrapper
          columns={orderColumn}
          data={JSON.parse((pendingOrders as string) ?? "").orders}
          totalPages={0}
          showLimit={false}
        />
      </div>
    </>
  );
}
