import { Card } from "@/components/ui/card";
import CalendarIcon from "@/icons/Calender";
import CashIcon from "@/icons/CashIcon";
import ClipboardListIcon from "@/icons/ClipboardList";
import ShoppingBagIcon from "@/icons/ShoppingBag";
import UsersIcon from "@/icons/Users";
import { DashboardOrderSummaryType } from "@/types/dashboard.t";

export default function StatisticCards(
  props: DashboardOrderSummaryType
): JSX.Element {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6 mb-8 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <Card className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div>
          <p className="text-lg font-semibold">৳ {props.balance}</p>
          <p className="text-sm text-gray-600">Current Balance</p>
        </div>
        <CashIcon className="text-3xl text-green-500" />
      </Card>
      <Card className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div>
          <p className="text-lg font-semibold">{props.todayOrderAmount}</p>
          <p className="text-sm text-gray-600">Today Orders</p>
        </div>
        <ShoppingBagIcon className="text-3xl text-green-500" />
      </Card>
      <Card className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div>
          <p className="text-lg font-semibold">{props.yesterdayOrderAmount}</p>
          <p className="text-sm text-gray-600">Yesterday Orders</p>
        </div>
        <CalendarIcon className="text-3xl text-purple-500" />
      </Card>
      <Card className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div>
          <p className="text-lg font-semibold">{props.monthlyOrderAmount}</p>
          <p className="text-sm text-gray-600">Monthly Orders</p>
        </div>
        <UsersIcon className="text-3xl text-blue-500" />
      </Card>
      <Card className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div>
          <p className="text-lg font-semibold">{props.totalOrderAmount}</p>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>
        <ClipboardListIcon className="text-3xl text-orange-500" />
      </Card>
    </div>
  );
}
