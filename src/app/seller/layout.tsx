import React from "react";
import SellerNavbar from "../../components/seller/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SellerNavbar />
      <div className="px-4 pb-4">{children}</div>
    </>
  );
}
