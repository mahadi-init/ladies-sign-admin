"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import RememberLanguage from "./RememberLanguage";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function Home() {
  const t = useTranslations("Signin");
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="w-screen h-screen flex items-center justify-evenly">
      <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            {t("title")}
          </h2>

          <form className="mt-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {t("email")}
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {t("password")}
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700"
                    onClick={() => setIsShowing(true)}
                  >
                    {t("forget-password")}?
                  </button>
                  <Modal
                    isShowing={isShowing}
                    setIsShowing={setIsShowing}
                    title={t("password-recover")}
                    action={() => {
                      //TODO:Add real action
                      console.log("hello");
                    }}
                  >
                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor=""
                          className="text-base font-medium text-gray-900"
                        >
                          {t("email")}
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="email"
                            name="recover-email"
                            placeholder="xyz@gmail.com"
                            className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                          />
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
                <div className="mt-2.5">
                  <input
                    type="password"
                    name="password"
                    placeholder="123456"
                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                >
                  {t("login")}
                </button>
              </div>
            </div>
            <div className="mt-2">
              <RememberLanguage />
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 sm:px-6 lg:px-8">
        <div>
          <Image
            className="w-96 h-96"
            width={900}
            height={900}
            src="/logo.png"
            alt="logo"
            priority
          />

          <div className="mt-3 w-full max-w-md mx-auto xl:max-w-xl">
            <h3 className="text-2xl font-semibold text-center text-black">
              {t("slogan")}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
