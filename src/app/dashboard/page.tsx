import MostSellingCategory from "@/components/native/MostSellingCategory";
import PageTop from "@/components/native/PageTop";
import SalesStatistics from "@/components/native/SalesStaistic";
import StatisticCards from "@/components/native/StatisticCards";
import {
  getDashboardOrderData,
  getMostSellingCategory,
  getSalesOrdersStatistics,
} from "@/utils/dashboard-data";

export default async function Dashboard() {
  const data = await Promise.all([
    await getDashboardOrderData(),
    await getSalesOrdersStatistics(),
    await getMostSellingCategory(),
  ]);

  return (
    <>
      <PageTop title="Dashboard" />
      <StatisticCards {...data[0]} />
      <div className="grid grid-cols-1 gap-4 items-center xl:grid-cols-2">
        <SalesStatistics data={data[1]} />
        <MostSellingCategory data={data[2]} />
      </div>
    </>
  );
}
