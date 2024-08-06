import { auth } from "@/auth";
import Sidenav from "@/components/native/SideNav";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  if (!session) {
    redirect("/")
  }

  return (
    <>
      <Sidenav />
      <div className="mt-12 px-4 lg:ml-48 lg:mt-4">{children}</div>
    </>
  );
}
