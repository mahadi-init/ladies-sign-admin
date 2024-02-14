import getData from "@/actions/get";
import { BACKEND_URL } from "@/consts/site-info";
import { DashboardOrderSummaryType } from "@/types/dashboard";

/**
 * Retrieves dashboard order data from the backend API.
 *
 * @return The dashboard order data retrieved from the API.
 */
export const getDashboardOrderData = async () => {
  const data = await getData<DashboardOrderSummaryType[]>(
    `${BACKEND_URL}/api/user-order/dashboard-amount`,
    300,
    ["dashboard"]
  );

  return data;
};

/**
 * Retrieves sales orders statistics from the backend API and returns the sales report data.
 *
 * @return The sales report data from the backend API.
 */
export const getSalesOrdersStatistics = async () => {
  const data = await getData(
    `${BACKEND_URL}/api/user-order/sales-report`,
    3600
  );

  //@ts-expect-error
  return data.salesReport;
};

/**
 * Retrieves the most selling category from the backend API after fetching the data.
 *
 * @return The most selling category data
 */
export const getMostSellingCategory = async () => {
  const data = await getData(
    `${BACKEND_URL}/api/user-order/most-selling-category`,
    3600
  );

  //@ts-expect-error
  return data.categoryData;
};
