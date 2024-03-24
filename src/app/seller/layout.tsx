import AccessDenied from "@/components/native/AccessDenied";
import { AccessToken } from "@/types/token.t";
import { cookies } from "next/headers";
import React from "react";
import SellerNavbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const token = cookies().get("access-token");

  if (token?.value !== AccessToken.SELLER) {
    return (
      <div className="w-screen h-screen grid place-items-center">
        <AccessDenied />
      </div>
    );
  }

  return (
    <>
      <SellerNavbar />
      <div className="px-4 pb-4">{children}</div>
    </>
  );
}
