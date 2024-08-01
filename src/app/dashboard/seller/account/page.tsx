"use client";

import { Card } from "@/components/ui/card";
import { Ban, CircleCheck, Clock3, TrendingUp } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SellerById() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  // const { data } = useSWR<SellerDashboard>(
  //   id && `/seller/orders/dashboard/${id}`,
  //   fetcher,
  // );

  return (
    <div>
      {/* <div className="mt-1 flex flex-col gap-1 font-medium">
        <p>Name : {name}</p>
        <p>ID : {id}</p>
      </div>
      <div className="my-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <Card className="w-[350px] bg-sky-700 text-white">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.totalOrders} {data?.totalOrders === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-yellow-700 text-white">
          <CardHeader>
            <CardTitle>Total Pending</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.totalPending}{" "}
              {data?.totalPending === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-red-700 text-white">
          <CardHeader>
            <CardTitle>Total cancelled</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.totalCancelled}{" "}
              {data?.totalCancelled === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-green-700 text-white">
          <CardHeader>
            <CardTitle>Total Delivered</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.totalDelivered}{" "}
              {data?.totalDelivered === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-sky-700 text-white">
          <CardHeader>
            <CardTitle>Monthly Total</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.thisMonthTotal}{" "}
              {data?.thisMonthTotal === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-yellow-700 text-white">
          <CardHeader>
            <CardTitle>Monthly Pending</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.thisMonthPending}{" "}
              {data?.thisMonthPending === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-red-700 text-white">
          <CardHeader>
            <CardTitle>Monthly Cancelled</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.thisMonthCancelled}{" "}
              {data?.thisMonthCancelled === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-[350px] bg-green-700 text-white">
          <CardHeader>
            <CardTitle>Monthly Delivered</CardTitle>
            <CardDescription className="font-semibold text-white">
              {data?.thisMonthDelivered}{" "}
              {data?.thisMonthDelivered === 1 ? "Order" : "Orders"}
            </CardDescription>
          </CardHeader>
        </Card>
      </div> */}

      <div className="mb-8 mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
          <div>
            {/* <p className="text-lg font-semibold">{data?.totalOrders ?? 0}</p> */}
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <TrendingUp className="text-3xl text-indigo-500" />
        </Card>

        <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
          <div>
            {/* <p className="text-lg font-semibold">{data?.totalPending ?? 0}</p> */}
            <p className="text-sm text-gray-600">Today Pending</p>
          </div>
          <Clock3 className="text-3xl text-yellow-500" />
        </Card>

        <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
          <div>
            {/* <p className="text-lg font-semibold">{data?.totalCancelled ?? 0}</p> */}
            <p className="text-sm text-gray-600">Total Cancelled</p>
          </div>
          <Ban className="text-3xl text-red-500" />
        </Card>

        <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
          <div>
            {/* <p className="text-lg font-semibold">{data?.totalDelivered ?? 0}</p> */}
            <p className="text-sm text-gray-600">Total Delivered</p>
          </div>
          <CircleCheck className="text-3xl text-green-500" />
        </Card>

        <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
          <div>
            {/* <p className="text-lg font-semibold">{data?.thisMonthTotal ?? 0}</p> */}
            <p className="text-sm text-gray-600">Monthly Total</p>
          </div>
          <TrendingUp className="text-3xl text-indigo-500" />
        </Card>

        <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
          <div>
            <p className="text-lg font-semibold">
              {/* {data?.thisMonthPending ?? 0} */}
            </p>
            <p className="text-sm text-gray-600">Monthly Pending</p>
          </div>
          <Clock3 className="text-3xl text-yellow-500" />
        </Card>

        <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
          <div>
            <p className="text-lg font-semibold">
              {/* {data?.thisMonthCancelled ?? 0} */}
            </p>
            <p className="text-sm text-gray-600">Monthly Cancelled</p>
          </div>
          <Ban className="text-3xl text-red-500" />
        </Card>

        <Card className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
          <div>
            <p className="text-lg font-semibold">
              {/* {data?.thisMonthDelivered ?? 0} */}
            </p>
            <p className="text-sm text-gray-600">Monthly Delivered</p>
          </div>
          <CircleCheck className="text-3xl text-green-500" />
        </Card>
      </div>
      {/* 
      {id && (
        <SellerOrderUIWrapper
          auth={id}
          route={`/seller/orders`}
          columns={sellerOrderColumn as any}
        />
      )} */}
    </div>
  );
}
