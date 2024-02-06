import PageTop from "@/components/native/PageTop";
import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import StatisticCards from "@/components/native/StatisticCards";
import SalesStatistics from "@/components/native/SalesStaistic";
import MostSellingCategory from "@/components/native/MostSellingCategory";

interface DashboardData {
  todayOrderAmount: number;
  yesterdayOrderAmount: number;
  monthlyOrderAmount: number;
  totalOrderAmount: number;
}

export default async function Dashboard() {
  const {
    todayOrderAmount,
    yesterdayOrderAmount,
    monthlyOrderAmount,
    totalOrderAmount,
  } = await getData<DashboardData>(
    `${BACKEND_URL}/api/user-order/dashboard-amount`,
    300,
    ["dashboard"],
  );

  const mostsellingCategory = await getData(
    `${BACKEND_URL}/api/user-order/most-selling-category`,
    3600,
  );

  const report = await getData(
    `${BACKEND_URL}/api/user-order/sales-report`,
    3600,
  );

  console.log(mostsellingCategory);

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
        {/*@ts-expect-error*/}
        <SalesStatistics data={report.salesReport} />
        {/*@ts-expect-error*/}
        <MostSellingCategory data={mostsellingCategory.categoryData} />
      </div>
    </div>
  );
}
