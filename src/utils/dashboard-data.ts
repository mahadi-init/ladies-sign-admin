import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import { DashboardOrderSummaryType } from "@/types/Dashboard";

export const getDashboardOrderData = async () => {
  const data = await getData<DashboardOrderSummaryType[]>(
    `${BACKEND_URL}/api/user-order/dashboard-amount`,
    300,
    ["dashboard"],
  );

  return data;
};

export const getSalesOrdersStatistics = async () => {
  const data = await getData(
    `${BACKEND_URL}/api/user-order/sales-report`,
    3600,
  );

  //@ts-expect-error
  return data.salesReport;
};

export const getMostSellingCategory = async () => {
  const data = await getData(
    `${BACKEND_URL}/api/user-order/most-selling-category`,
    3600,
  );

  //@ts-expect-error
  return data.categoryData;
};
