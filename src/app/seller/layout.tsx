import React from "react";
import SellerNavbar from "./navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const auth = cookies().get("auth");
  // const value = auth?.value as string;
  // const key = new TextEncoder().encode(siteConfig.JWT_SECRET);

  // const { payload } = await jwtVerify(value, key, {
  //   algorithms: ["HS256"],
  // });

  return (
    <>
      <SellerNavbar />
      <div className="px-4 pb-4">{children}</div>
    </>
  );
}
