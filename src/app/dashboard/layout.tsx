import React from "react";
import Sidenav from "./SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidenav />
      {children}
    </>
  );
}
