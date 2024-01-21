"use client";

import Link from "next/link";

export default function Error() {
  return (
    <>
      <section className="relative z-10 bg-primary py-[120px]">
        <div className="container mx-auto">
          <div className="flex -mx-4">
            <div className="px-4 w-full">
              <div className="mx-auto text-center max-w-[400px]">
                <h2 className="mb-2 font-bold leading-none text-white text-[50px] sm:text-[80px] md:text-[100px]">
                  404
                </h2>
                <h4 className="mb-3 font-semibold leading-tight text-white text-[22px]">
                  Oops! That page can’t be found
                </h4>
                <p className="mb-8 text-lg text-white">
                  The page you are looking for it maybe deleted
                </p>
                <Link
                  href="/dashboard"
                  className="inline-block py-3 px-8 text-base font-semibold text-center text-white rounded-lg border border-white transition hover:bg-white hover:text-primary"
                >
                  Go To Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex absolute top-0 left-0 justify-between items-center space-x-5 w-full h-full md:space-x-8 lg:space-x-14 -z-10">
          <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          <div className="flex w-1/3 h-full">
            <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
            <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
        </div>
      </section>
    </>
  );
}
