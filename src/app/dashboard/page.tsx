import PageTop from "@/components/native/PageTop";
import StatisticCards from "@/components/native/StatisticCards";
import { DashboardOrderSummaryType } from "@/types/dashboard";
import { Suspense } from "react";
import { Statistics } from "./(dashboard)/Statistics";
import {
  getDashboardAmount,
  getPendingOrders,
  getSteadfastBalance,
  salesPermonth,
} from "./data";
import { orderColumn } from "./order-column";
import OrderTableUIWrapper from "./order-table";

export default async function Dashboard() {
  const data = await Promise.all([
    await getSteadfastBalance(),
    await getDashboardAmount(),
    await salesPermonth(),
    await getPendingOrders(),
  ]);

  //@ts-expect-error
  const statisticData: DashboardOrderSummaryType = {
    balance: data[0]?.current_balance,
    ...(JSON.parse(data[1] ?? "") as object),
  };

  return (
    <Suspense>
      <PageTop title="Dashboard" />
      {data[0] && data[1] ? (
        <StatisticCards {...statisticData} />
      ) : (
        <p className="text-center font-semibold text-red-400">
          Overview data not found
        </p>
      )}
      <Statistics />
      <p className="mt-4 text-xl font-semibold">Mini Waiting Orders</p>
      <OrderTableUIWrapper
        columns={orderColumn}
        data={JSON.parse(data[3] ?? "").orders}
      />
    </Suspense>
  );
}
