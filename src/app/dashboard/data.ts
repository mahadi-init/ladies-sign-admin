import { OrderModel } from "@/models/order.model";
import { site } from "@/site-config";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

// Apply necessary plugins to dayjs
dayjs.extend(customParseFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

// steadfast related
export async function getSteadfastBalance() {
  try {
    const res = await fetch(`${site.STEADFAST_BASE_URL}/api/v1/get_balance`, {
      headers: {
        "Content-Type": "application/json",
        "Api-Key": site.STEADFAST_API_KEY,
        "Secret-Key": site.STEADFAST_SECRECT_KEY,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch balance");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    return null;
  }
}

export const salesPermonth = async () => {
  try {
    const salesPerMonth = await OrderModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$total" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return JSON.stringify(salesPerMonth);
  } catch (error: any) { }
};

export const getPendingOrders = async () => {
  try {
    const orders = await OrderModel.find({ status: "WAITING" }).limit(25)
    console.log(orders);


    return JSON.stringify({
      orders: orders,
    });
  } catch (error: any) { }
};

export const getDashboardAmount = async () => {
  try {
    const todayStart = dayjs().startOf("day");
    const todayEnd = dayjs().endOf("day");

    const yesterdayStart = dayjs().subtract(1, "day").startOf("day");
    const yesterdayEnd = dayjs().subtract(1, "day").endOf("day");

    const monthStart = dayjs().startOf("month");
    const monthEnd = dayjs().endOf("month");

    const todayOrders = await OrderModel.find({
      createdAt: { $gte: todayStart.toDate(), $lte: todayEnd.toDate() },
    });

    let todayPayment = 0;

    todayOrders.forEach((order) => {
      if (order.total) {
        todayPayment += order.total;
      }
    });

    const yesterdayOrders = await OrderModel.find({
      createdAt: {
        $gte: yesterdayStart.toDate(),
        $lte: yesterdayEnd.toDate(),
      },
    });

    let yesterdayPayment = 0;

    yesterdayOrders.forEach((order) => {
      if (order.total) {
        yesterdayPayment += order.total;
      }
    });

    const monthlyOrders = await OrderModel.find({
      createdAt: { $gte: monthStart.toDate(), $lte: monthEnd.toDate() },
    });

    const totalOrders = await OrderModel.find();
    const todayOrderAmount = todayOrders.reduce(
      (total, order) => total + order.total!!,
      0,
    );
    const yesterdayOrderAmount = yesterdayOrders.reduce(
      (total, order) => total + order.total!!,
      0,
    );

    const monthlyOrderAmount = monthlyOrders.reduce((total, order) => {
      return total + order.total!!;
    }, 0);
    const totalOrderAmount = totalOrders.reduce(
      (total, order) => total + order.total!!,
      0,
    );

    return JSON.stringify({
      todayOrderAmount,
      yesterdayOrderAmount,
      monthlyOrderAmount,
      totalOrderAmount,
    });
  } catch (error: any) { }
};
