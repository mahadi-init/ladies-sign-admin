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

  const {
    todayOrderAmount,
    yesterdayOrderAmount,
    monthlyOrderAmount,
    totalOrderAmount,
  } = data[0];

  const report = data[1];
  const mostSelling = data[2];

  return (
    <div className="p-4 mt-12 lg:mt-4 lg:ml-72">
      <PageTop title="Dashboard" />
      <StatisticCards
        todayOrderAmount={todayOrderAmount}
        yesterdayOrderAmount={yesterdayOrderAmount}
        monthlyOrderAmount={monthlyOrderAmount}
        totalOrderAmount={totalOrderAmount}
      />
      <div className="grid grid-cols-1 gap-4 items-center xl:grid-cols-2">
        <SalesStatistics data={report} />
        <MostSellingCategory data={mostSelling} />
      </div>
    </div>
  );
}
