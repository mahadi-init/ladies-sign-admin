import Sidenav from "@/components/native/SideNav";
import React from "react";
import AccessProvider from "./access-provider";
import { cookies } from "next/headers";

export default function Layout({ children }: { children: React.ReactNode }) {
  const userId = cookies().get("user-access-id");
  const accessToken = cookies().get("access-token");

  return (
    <AccessProvider userId={userId?.value} accessToken={accessToken?.value}>
      <Sidenav />
      {children}
    </AccessProvider>
  );
}
