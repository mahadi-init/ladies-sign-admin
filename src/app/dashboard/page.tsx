import { orderColumn } from "@/columns/OrderColumn";
import { DataTable } from "@/components/native/DataTable";
import MostSellingCategory from "@/components/native/MostSellingCategory";
import PageTop from "@/components/native/PageTop";
import SalesStatistics from "@/components/native/SalesStaistic";
import StatisticCards from "@/components/native/StatisticCards";
import { fetcher } from "@/https/get-request";
import { DashboardOrderSummaryType } from "@/types/dashboard.t";

export default async function Dashboard() {
  const data = await Promise.all([
    await fetcher("/dashboard/steadfast-balance"),
    await fetcher(`/dashboard/amount`),
    await fetcher(`/dashboard/sales-report`),
    await fetcher(`/dashboard/most-selling-category`),
    await fetcher(`/dashboard/recent-order`),
  ]);

  //@ts-expect-error
  const statisticData: DashboardOrderSummaryType = {
    //@ts-expect-error
    balance: data[0]?.current_balance,
    ...(data[1] as object),
  };

  return (
    <>
      <PageTop title="Dashboard" />
      <StatisticCards {...statisticData} />
      <div className="grid grid-cols-1 gap-4 items-center xl:grid-cols-2">
        {/* @ts-expect-error */}
        <SalesStatistics data={data[2]} />

        {/* @ts-expect-error */}
        <MostSellingCategory data={data[3]} />
      </div>
      <h2 className="mb-4 mt-6 text-xl font-semibold">Recent orders</h2>
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        {/* @ts-expect-error */}
        <DataTable columns={orderColumn} data={data[4]} />
      </div>
    </>
  );
}
