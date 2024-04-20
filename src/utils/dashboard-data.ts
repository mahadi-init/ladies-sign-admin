// export const getDashboardOrderData = async () => {
//   const data = await getData<DashboardOrderSummaryType[]>(
//     `${site.BACKEND_URL}/api/user-order/dashboard-amount`,
//     false,
//     300,
//     ["dashboard"]
//   );

//   return data;
// };

// export const getSalesOrdersStatistics = async () => {
//   const data = await getData(
//     `${site.BACKEND_URL}/api/user-order/sales-report`,
//     false,
//     3600
//   );

//   //@ts-expect-error
//   return data.salesReport;
// };

// export const getMostSellingCategory = async () => {
//   const data = await getData(
//     `${BACKEND_URL}/api/user-order/most-selling-category`,
//     false,
//     3600
//   );

//   //@ts-expect-error
//   return data.categoryData;
// };
