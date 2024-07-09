import { orderColumn } from "@/columns/OrderColumn";
import PageTop from "@/components/native/PageTop";
import StatisticCards from "@/components/native/StatisticCards";
import { fetcher } from "@/https/get-request";
import { DashboardOrderSummaryType } from "@/types/dashboard.t";
import OrderUIWrapper from "@/ui/OrderUIWrapper";
import { Statistics } from "./(dashboard)/Statistics";

export default async function Dashboard() {
  const data: any = await Promise.all([
    await fetcher("/dashboard/steadfast-balance"),
    await fetcher(`/dashboard/amount`),
    // await fetcher(`/dashboard/sales-per-month`),
  ]);

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
      {/* <Statistics data={data[2]} /> */}
      <h2 className="mb-4 mt-6 text-xl font-semibold">Mini orders</h2>
      <div className="mt-8">
        <OrderUIWrapper
          route="/order"
          columns={orderColumn as any}
          statusValue="WAITING"
        />
      </div>
    </>
  );
}
