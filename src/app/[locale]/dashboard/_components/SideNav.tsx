"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  BellRing,
  ChevronDown,
  Component,
  Dice6,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Ratio,
  ShoppingBasket,
  Star,
  Users,
  UsersRound,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Sidenav() {
  const t = useTranslations("Sidenav");
  const pathname = usePathname();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const hideSideNav = async () => {
    setIsSideNavOpen(false);
  };

  return (
    <>
      {/* @ts-ignore */}
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
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
      </button>

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-4"
        aria-label="Side navigation"
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 items-center p-6 border-b border-slate-200">
          <div className="shrink-0">
            <Link
              href="/dashboard/profile"
              onClick={hideSideNav}
              className="flex relative justify-center items-center w-12 h-12 text-white rounded-full"
            >
              <Image
                src="/logo.png"
                alt="user name"
                title="user name"
                width={48}
                height={48}
                className="max-w-full rounded-full"
              />
              <span className="inline-flex absolute right-0 bottom-0 gap-1 justify-center items-center p-1 text-sm text-white bg-rose-500 rounded-full border-2 border-white">
                <span className="sr-only"> online </span>
              </span>
            </Link>
          </div>
          <div className="flex flex-col gap-0 justify-center items-start w-full min-w-0 text-center min-h-[2rem]">
            <h4 className="w-full text-base truncate text-slate-700">
              Luke Skywalker
            </h4>
            <p className="w-full text-sm truncate text-slate-500">
              Jedi warrior
            </p>
          </div>
        </div>
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
                      "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center">
                    <LayoutDashboard size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    {t("dashboard")}
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/products"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("products") &&
                      "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center">
                    <ShoppingBasket size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    {t("products")}
                  </div>
                  {/* TODO:OPEN AND CLOSE OPTION */}
                  <span className="inline-flex justify-center items-center px-2 text-xs text-pink-500 bg-pink-100 rounded-full">
                    <ChevronDown size={15} />
                  </span>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/category"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("category") &&
                      "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center">
                    <Ratio size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    {t("category")}
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/orders"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("orders") &&
                      "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center">
                    <ListOrdered size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    {t("orders")}
                  </div>
                  <span className="inline-flex justify-center items-center px-2 text-xs text-pink-500 bg-pink-100 rounded-full">
                    {/* TODO:ADD DYNAMCIC DATA */}7
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
                    pathname.endsWith("brand") &&
                      "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center">
                    <Dice6 size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    {t("brand")}
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
                    pathname.endsWith("reviews") &&
                      "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center">
                    <Star size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    {t("reviews")}
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/coupons"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("coupons") &&
                      "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center">
                    <Component size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    {t("coupons")}
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/stuffs"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("stuffs") &&
                      "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center">
                    <UsersRound size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    {t("stuffs")}
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/users"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("users") &&
                      "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center">
                    <Users size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    {t("users")}
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/notifications"
                  onClick={hideSideNav}
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("notifications") &&
                      "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center">
                    <BellRing size={18} />
                  </div>
                  <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm truncate">
                    {t("notifications")}
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
          <button className="flex gap-3 items-center p-3 rounded transition-colors hover:text-rose-500 text-slate-900">
            <div className="flex items-center self-center">
              <LogOut size={18} />
            </div>
            <div className="flex overflow-hidden flex-col flex-1 gap-0 justify-center items-start w-full text-sm font-medium truncate">
              {t("logout")}
            </div>
          </button>
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
