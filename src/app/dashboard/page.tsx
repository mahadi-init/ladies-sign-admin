import MostSellingCategory from "@/components/native/MostSellingCategory";
import PageTop from "@/components/native/PageTop";
import SalesStatistics from "@/components/native/SalesStaistic";
import StatisticCards from "@/components/native/StatisticCards";
import { DashboardOrderSummaryType } from "@/types/dashboard";
import {
  getDashboardOrderData,
  getMostSellingCategory,
  getSalesOrdersStatistics,
} from "@/utils/dashboard-data";
import { getSteadFastBalance } from "@/utils/get-steadfast-balance";

export default async function Dashboard() {
  const data = await Promise.all([
    await getSteadFastBalance(),
    await getDashboardOrderData(),
    await getSalesOrdersStatistics(),
    await getMostSellingCategory(),
  ]);

  const statisticData: DashboardOrderSummaryType = {
    balance: data[0].current_balance,
    ...data[1],
  };

  return (
    <>
      <PageTop title="Dashboard" />
      {/* <Card>
        <p>{data[0].current_balance}</p>
      </Card> */}
      <StatisticCards {...statisticData} />
      <div className="grid grid-cols-1 gap-4 items-center xl:grid-cols-2">
        <SalesStatistics data={data[2]} />
        <MostSellingCategory data={data[3]} />
      </div>
    </>
  );
}
