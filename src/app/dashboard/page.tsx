import PageTop from "@/components/native/PageTop";
import StatisticCards from "@/components/native/StatisticCards";
import SalesStatistics from "@/components/native/SalesStaistic";
import MostSellingCategory from "@/components/native/MostSellingCategory";
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
    <div className="p-4 mt-12 lg:mt-4 lg:ml-72">
      <PageTop title="Dashboard" />
      <StatisticCards {...data[0]} />
      <div className="grid grid-cols-1 gap-4 items-center xl:grid-cols-2">
        <SalesStatistics data={data[1]} />
        <MostSellingCategory data={data[2]} />
      </div>
    </div>
  );
}
