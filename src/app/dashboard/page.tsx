"use client";
import PageTop from "@/components/native/PageTop";

export default function Dashboard() {
  // const data = await Promise.all([
  //   await getSteadFastBalance(),
  //   await getDashboardOrderData(),
  //   await getSalesOrdersStatistics(),
  //   await getMostSellingCategory(),
  //   await getOrders(),
  // ]);

  // const statisticData: DashboardOrderSummaryType = {
  //   balance: data[0].current_balance,
  //   ...data[1],
  // };

  return (
    <>
      <PageTop title="Dashboard" />
      {/* <StatisticCards {...statisticData} /> */}
      <div className="grid grid-cols-1 gap-4 items-center xl:grid-cols-2">
        {/* <SalesStatistics data={data[2]} />
        <MostSellingCategory data={data[3]} /> */}
      </div>
      <h2 className="mb-4 mt-6 text-xl font-semibold">Recent orders</h2>
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        {/* <DataTable columns={orderColumn} data={data[4]} /> */}
      </div>
    </>
  );
}