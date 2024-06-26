import { orderColumn } from "@/columns/OrderColumn";
import { DataTable } from "@/components/native/DataTable";
import MostSellingCategory from "@/components/native/MostSellingCategory";
import PageTop from "@/components/native/PageTop";
import SalesStatistics from "@/components/native/SalesStaistic";
import SixSkeleton from "@/components/native/SixSkeleton";
import StatisticCards from "@/components/native/StatisticCards";
import { fetcher } from "@/https/get-request";
import { DashboardOrderSummaryType } from "@/types/dashboard.t";

export default async function Dashboard() {
  const data: any = await Promise.all([
    await fetcher("/dashboard/steadfast-balance"),
    await fetcher(`/dashboard/amount`),
    // await fetcher(`/dashboard/sales-report`),
    // await fetcher(`/dashboard/most-selling-category`),
    await fetcher(`/dashboard/recent-order`),
  ]);

  if (!data[0] || !data[1]) return <SixSkeleton />;

  //@ts-expect-error
  const statisticData: DashboardOrderSummaryType = {
    balance: data[0]?.current_balance,
    ...(data[1] as object),
  };

  return (
    <>
      <PageTop title="Dashboard" />
      {data[0] && data[1] ? (
        <StatisticCards {...statisticData} />
      ) : (
        <p className="text-center font-semibold text-red-400">
          Overview data not found
        </p>
      )}
      <div className="grid grid-cols-1 items-center gap-4 xl:grid-cols-2">
        {/* {data[2] && <SalesStatistics data={data[2]} />} */}

        {/* {data[3] && <MostSellingCategory data={data[3]} />} */}
      </div>
      <h2 className="mb-4 mt-6 text-xl font-semibold">Recent orders</h2>
      <div>
        {data[2] ? (
          <DataTable columns={orderColumn} data={data[2]} />
        ) : (
          <p className="text-center font-semibold text-red-400">
            Order data not found
          </p>
        )}
      </div>
    </>
  );
}
