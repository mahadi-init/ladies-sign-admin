"use client";
import useLogout from "@/hooks/useLogout";
import clsx from "clsx";
import {
  BellRing,
  Component,
  Dice6,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Ratio,
  ShieldHalf,
  ShoppingBasket,
  Star,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ConfirmationDialog from "./ConfirmationDialog";

/**
 * This function renders the side navigation menu
 *
 * @return {JSX.Element} The rendered side navigation menu
 */
export default function Sidenav({
  numOfPendingOrder,
}: {
  numOfPendingOrder: number;
}): JSX.Element {
  const pathname = usePathname();
  const { handleLogout } = useLogout();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const hideSideNav = async () => {
    setIsSideNavOpen(false);
  };

  return (
    <>
      {/* @ts-ignore */}
      <Button
        variant="outline"
        title="Side navigation"
        type="button"
        className={`visible fixed left-2 top-1 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? " true" : "false"}
        aria-controls="nav-menu-4"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 transform -translate-x-1/2 -translate-y-1/2">
          <span
            aria-hidden="true"
            className="block absolute w-9/12 h-0.5 rounded-full transition-all duration-300 transform -translate-y-2 bg-slate-700"
          ></span>
          <span
            aria-hidden="true"
            className="block absolute w-6 h-0.5 rounded-full transition duration-300 transform bg-slate-900"
          ></span>
          <span
            aria-hidden="true"
            className="block absolute w-1/2 h-0.5 rounded-full transition-all duration-300 transform origin-top-left translate-y-2 bg-slate-900"
          ></span>
        </div>
      </Button>

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-4"
        aria-label="Side navigation"
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <nav
          aria-label="side navigation"
          className="overflow-auto flex-1 divide-y divide-slate-100"
        >
          <div>
            <ul className="flex flex-col flex-1 gap-1 py-3">
              <li className="px-3">
                <Link
                  href="/dashboard"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("dashboard") &&
                      "bg-purple-50 text-purple-600"
                  )}
                >
                  <div className="flex items-center self-center">
                    <LayoutDashboard size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    Dashboard
                  </div>
                </Link>
              </li>

              <li className="px-3">
                <Link
                  href="/dashboard/products"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.includes("products") &&
                      "bg-purple-50 text-purple-600"
                  )}
                >
                  <div className="flex items-center self-center">
                    <ShoppingBasket size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    Products
                  </div>
                </Link>
              </li>

              <li className="px-3">
                <Link
                  href="/dashboard/category"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.includes("category") &&
                      "bg-purple-100 text-purple-800"
                  )}
                >
                  <div className="flex items-center self-center">
                    <Ratio size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    Category
                  </div>
                </Link>
              </li>

              <li className="px-3">
                <Link
                  href="/dashboard/orders"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.includes("orders") &&
                      "bg-purple-100 text-purple-800"
                  )}
                >
                  <div className="flex items-center self-center">
                    <ListOrdered size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    Orders
                  </div>
                  <span className="inline-flex justify-center items-center px-2 text-xs text-pink-500 bg-pink-100 rounded-full">
                    {numOfPendingOrder}
                    <span className="sr-only"> new orders</span>
                  </span>
                </Link>
              </li>

              <li className="px-3">
                <Link
                  href="/dashboard/brand"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.includes("brand") &&
                      "bg-purple-100 text-purple-800"
                  )}
                >
                  <div className="flex items-center self-center">
                    <Dice6 size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    Brand
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col flex-1 gap-1 py-3">
              <li className="px-3">
                <Link
                  href="/dashboard/reviews"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.includes("reviews") &&
                      "bg-purple-100 text-purple-800 "
                  )}
                >
                  <div className="flex items-center self-center">
                    <Star size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    Reviews
                  </div>
                </Link>
              </li>

              <li className="px-3">
                <Link
                  href="/dashboard/coupons"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.includes("coupons") &&
                      "bg-purple-100 text-purple-800"
                  )}
                >
                  <div className="flex items-center self-center">
                    <Component size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    Coupons
                  </div>
                </Link>
              </li>

              <li className="px-3">
                <Link
                  href="/dashboard/admins"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.includes("admins") &&
                      "bg-purple-100 text-purple-800"
                  )}
                >
                  <div className="flex items-center self-center">
                    <ShieldHalf size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    Admins
                  </div>
                </Link>
              </li>

              <li className="px-3">
                <Link
                  href="/dashboard/users"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.includes("users") &&
                      "bg-purple-100 text-purple-800"
                  )}
                >
                  <div className="flex items-center self-center">
                    <Users size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    Users
                  </div>
                </Link>
              </li>

              <li className="px-3">
                <Link
                  href="/dashboard/profile"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.includes("profile") &&
                      "bg-purple-100 text-purple-800"
                  )}
                >
                  <div className="flex items-center self-center">
                    <User size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    Profile
                  </div>
                </Link>
              </li>

              <li className="px-3">
                <Link
                  href="/dashboard/notifications"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.includes("notifications") &&
                      "bg-purple-100 text-purple-800"
                  )}
                >
                  <div className="flex items-center self-center">
                    <BellRing size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    Notifications
                  </div>
                  <span className="inline-flex justify-center items-center px-2 text-xs text-pink-500 bg-pink-100 rounded-full">
                    2<span className="sr-only"> new notifications</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <footer className="p-3 border-t border-slate-200">
          <ConfirmationDialog
            alertText="You will logged out from admin panel"
            action={() => {
              toast.promise(handleLogout, {
                loading: "Loading...",
                success: () => {
                  return `Logout successful`;
                },
                error: "Error",
              });
            }}
          >
            <button className="flex gap-3 items-center p-3 rounded transition-colors hover:text-rose-500 text-slate-900">
              <div className="flex items-center self-center">
                <LogOut size={18} />
              </div>
              <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm font-medium truncate">
                Logout
              </div>
            </button>
          </ConfirmationDialog>
        </footer>
      </aside>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
      {/*  <!-- End Side navigation menu with user profile and alert message --> */}
    </>
  );
}
