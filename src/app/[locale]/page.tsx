"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Modal from "./_components/Modal";
import RememberLanguage from "./_components/RememberLanguage";

export default function Home() {
  const t = useTranslations("Signin");
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="flex justify-evenly items-center w-screen h-screen">
      <div className="flex justify-center items-center py-10 px-4 bg-white sm:py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
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
                    className="block p-4 w-full placeholder-gray-500 text-black bg-gray-50 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {t("password")}
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline focus:text-blue-700"
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
                            className="block p-4 w-full placeholder-gray-500 text-black bg-gray-50 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
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
                    className="block p-4 w-full placeholder-gray-500 text-black bg-gray-50 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center items-center py-4 px-4 w-full text-base font-semibold text-white bg-blue-600 rounded-md border border-transparent transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
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

      <div className="hidden justify-center items-center py-10 px-4 sm:py-16 sm:px-6 lg:flex lg:py-24 lg:px-8">
        <div>
          <Image
            className="w-96 h-96"
            width={900}
            height={900}
            src="/logo.png"
            alt="logo"
            priority
          />

          <div className="mx-auto mt-3 w-full max-w-md xl:max-w-xl">
            <h3 className="text-2xl font-semibold text-center text-black">
              {t("slogan")}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
