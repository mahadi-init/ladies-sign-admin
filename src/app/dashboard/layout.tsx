import Sidenav from "@/components/native/SideNav";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidenav />
      {children}
    </>
  );
}
