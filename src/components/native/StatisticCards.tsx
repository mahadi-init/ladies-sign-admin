import { Card } from "@/components/ui/card";
import { DashboardOrderSummaryType } from "@/types/dashboard";
import { Ban, CircleCheck, Clock3, TrendingUp } from "lucide-react";

export default function StatisticCards(
  props: DashboardOrderSummaryType,
): JSX.Element {
  return (
    // <div className="grid grid-cols-2 gap-4 mt-6 mb-8 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
    //   <Card className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
    //     <div>
    //       <p className="text-lg font-semibold">৳ {props.balance}</p>
    //       <p className="text-sm text-gray-600">Current Balance</p>
    //     </div>
    //     <CashIcon className="text-3xl text-green-500" />
    //   </Card>
    //   <Card className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
    //     <div>
    //       <p className="text-lg font-semibold">{props.todayOrderAmount}</p>
    //       <p className="text-sm text-gray-600">Today Orders</p>
    //     </div>
    //     <ShoppingBagIcon className="text-3xl text-green-500" />
    //   </Card>
    //   <Card className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
    //     <div>
    //       <p className="text-lg font-semibold">{props.yesterdayOrderAmount}</p>
    //       <p className="text-sm text-gray-600">Yesterday Orders</p>
    //     </div>
    //     <CalendarIcon className="text-3xl text-purple-500" />
    //   </Card>
    //   <Card className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
    //     <div>
    //       <p className="text-lg font-semibold">{props.monthlyOrderAmount}</p>
    //       <p className="text-sm text-gray-600">Monthly Orders</p>
    //     </div>
    //     <UsersIcon className="text-3xl text-blue-500" />
    //   </Card>
    //   <Card className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
    //     <div>
    //       <p className="text-lg font-semibold">{props.totalOrderAmount}</p>
    //       <p className="text-sm text-gray-600">Total Orders</p>
    //     </div>
    //     <ClipboardListIcon className="text-3xl text-orange-500" />
    //   </Card>
    // </div>
    <div className="mb-8 mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <div>
          <p className="text-lg font-semibold">{0}</p>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>
        <TrendingUp className="text-3xl text-indigo-500" />
      </Card>

      <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <div>
          <p className="text-lg font-semibold">{0}</p>
          <p className="text-sm text-gray-600">Today Pending</p>
        </div>
        <Clock3 className="text-3xl text-yellow-500" />
      </Card>

      <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <div>
          <p className="text-lg font-semibold">{0}</p>
          <p className="text-sm text-gray-600">Total Cancelled</p>
        </div>
        <Ban className="text-3xl text-red-500" />
      </Card>

      <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <div>
          <p className="text-lg font-semibold">{0}</p>
          <p className="text-sm text-gray-600">Total Delivered</p>
        </div>
        <CircleCheck className="text-3xl text-green-500" />
      </Card>

      <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <div>
          <p className="text-lg font-semibold">{0}</p>
          <p className="text-sm text-gray-600">Monthly Total</p>
        </div>
        <TrendingUp className="text-3xl text-indigo-500" />
      </Card>

      <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <div>
          <p className="text-lg font-semibold">{0}</p>
          <p className="text-sm text-gray-600">Monthly Pending</p>
        </div>
        <Clock3 className="text-3xl text-yellow-500" />
      </Card>

      <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <div>
          <p className="text-lg font-semibold">{0}</p>
          <p className="text-sm text-gray-600">Monthly Cancelled</p>
        </div>
        <Ban className="text-3xl text-red-500" />
      </Card>

      <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <div>
          <p className="text-lg font-semibold">{0}</p>
          <p className="text-sm text-gray-600">Monthly Delivered</p>
        </div>
        <CircleCheck className="text-3xl text-green-500" />
      </Card>
    </div>
  );
}
