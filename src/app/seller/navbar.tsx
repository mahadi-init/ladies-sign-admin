"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout-button";

export default function SellerNavbar() {
  const pathname = usePathname();

  return (
    <div className="bg-sky-700 mb-4 py-4 px-2 text-white font-semibold flex items-center justify-between text-lg">
      <div className="flex gap-8 mt-1.5">
        <Link
          href="/seller"
          className={clsx({
            "text-yellow-300": pathname === "/seller",
          })}
        >
          Profile
        </Link>
        <Link
          href="/seller/orders"
          className={clsx({ "text-yellow-300": pathname === "/seller/orders" })}
        >
          Orders
        </Link>
      </div>

      <LogoutButton />
    </div>
  );
}