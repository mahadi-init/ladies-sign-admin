"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  BellRing,
  ChevronDown,
  Component,
  Dice6,
  Globe,
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
import { useRouter } from "next/navigation";

export default function Sidenav() {
  const t = useTranslations("Sidenav");
  const pathname = usePathname();
  const router = useRouter();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  function handleChangeLanguage() {
    //TODO:add language to cookies
    if (pathname.match("/bn/dashboard")) {
      router.replace(`${pathname.replace("bn", "en")}`);
    } else {
      router.replace(`${pathname.replace("en", "bn")}`);
    }
  }

  return (
    <>
      {/* @ts-ignore */}
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
          }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? " true" : "false"}
        aria-controls="nav-menu-4"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button>

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-4"
        aria-label="Side navigation"
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${isSideNavOpen ? "translate-x-0" : " -translate-x-full"
          }`}
      >
        <div className="flex flex-col items-center gap-4 border-b border-slate-200 p-6">
          <div className="shrink-0">
            <Link
              href="/dashboard/profile"
              className="relative flex h-12 w-12 items-center justify-center rounded-full text-white"
            >
              <Image
                src="/logo.png"
                alt="user name"
                title="user name"
                width={48}
                height={48}
                className="max-w-full rounded-full"
              />
              <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-rose-500 p-1 text-sm text-white">
                <span className="sr-only"> online </span>
              </span>
            </Link>
          </div>
          <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center">
            <h4 className="w-full truncate text-base text-slate-700">
              Luke Skywalker
            </h4>
            <p className="w-full truncate text-sm text-slate-500">
              Jedi warrior
            </p>
          </div>
        </div>
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <div>
            <ul className="flex flex-1 flex-col gap-1 py-3">
              <li className="px-3">
                <Link
                  href="/dashboard"
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("dashboard") &&
                    "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center">
                    <LayoutDashboard size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {t("dashboard")}
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/products"
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("products") &&
                    "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center ">
                    <ShoppingBasket size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {t("products")}
                  </div>
                  {/* TODO:OPEN AND CLOSE OPTION */}
                  <span className="inline-flex items-center justify-center rounded-full bg-pink-100 px-2 text-xs text-pink-500 ">
                    <ChevronDown size={15} />
                  </span>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/category"
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("category") &&
                    "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center ">
                    <Ratio size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {t("category")}
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/orders"
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("orders") &&
                    "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center ">
                    <ListOrdered size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {t("orders")}
                  </div>
                  <span className="inline-flex items-center justify-center rounded-full bg-pink-100 px-2 text-xs text-pink-500 ">
                    {/* TODO:ADD DYNAMCIC DATA */}7
                    <span className="sr-only"> new orders</span>
                  </span>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/brand"
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("brand") &&
                    "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center ">
                    <Dice6 size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {t("brand")}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-1 flex-col gap-1 py-3">
              <li className="px-3">
                <Link
                  href="/dashboard/reviews"
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("reviews") &&
                    "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center">
                    <Star size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {t("reviews")}
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/coupons"
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("coupons") &&
                    "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center ">
                    <Component size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {t("coupons")}
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/stuffs"
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("stuffs") &&
                    "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center ">
                    <UsersRound size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {t("stuffs")}
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/users"
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("users") &&
                    "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center ">
                    <Users size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {t("users")}
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  href="/dashboard/notifications"
                  className={clsx(
                    "flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:bg-rose-50",
                    pathname.endsWith("notifications") &&
                    "bg-purple-50 text-purple-600 focus:bg-purple-50",
                  )}
                >
                  <div className="flex items-center self-center ">
                    <BellRing size={18} />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {t("notifications")}
                  </div>
                  <span className="inline-flex items-center justify-center rounded-full bg-pink-100 px-2 text-xs text-pink-500 ">
                    2<span className="sr-only"> new notifications</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <footer className="border-t border-slate-200 p-3">
          <button
            className="flex items-center gap-3 rounded p-3 text-slate-900 transition-colors hover:text-rose-500"
            onClick={handleChangeLanguage}
          >
            <div className="flex items-center self-center ">
              <Globe size={18} />
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
              {t("change-language")}
            </div>
          </button>
          <button className="flex items-center gap-3 rounded p-3 text-slate-900 transition-colors hover:text-rose-500">
            <div className="flex items-center self-center ">
              <LogOut size={18} />
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
              {t("logout")}
            </div>
          </button>
        </footer>
      </aside>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${isSideNavOpen ? "block" : "hidden"
          }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
      {/*  <!-- End Side navigation menu with user profile and alert message --> */}
    </>
  );
}
