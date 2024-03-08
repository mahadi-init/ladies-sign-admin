import getData from "@/actions/get";
import Sidenav from "@/components/native/SideNav";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";
import { BACKEND_URL } from "../../../site-info";
import AccessProvider from "./access-provider";

export const metadata: Metadata = {
  title: "Ladies Sign Admin",
  description: "Generated by create next app",
  icons: {
    icon: "/logo.png",
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = cookies().get("user-access-id");
  const accessToken = cookies().get("access-token");
  const getPendingOrder = await getData<{ data: number }>(
    `${BACKEND_URL}/api/order/orders/pending`,
    5,
    ["orders", "order"]
  );

  return (
    <AccessProvider userId={userId?.value} accessToken={accessToken?.value}>
      <Sidenav numOfPendingOrder={getPendingOrder.data} />
      <div className="px-4 mt-12 lg:mt-4 lg:ml-72">{children}</div>
    </AccessProvider>
  );
}
