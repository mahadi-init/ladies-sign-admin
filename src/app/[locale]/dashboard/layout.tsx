import React from "react";
import Sidenav from "../../../components/native/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidenav />
      {children}
    </>
  );
}
