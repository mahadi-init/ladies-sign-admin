"use client";
import { Globe } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function RememberLanguage() {
  const t = useTranslations("Signin");
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  function handleChangeLanguage(e: any) {
    e.preventDefault();

    if (pathname.match("bn")) {
      router.replace("/en");
    } else {
      router.replace("/bn");
    }
  }

  return (
    <div className="flex justify-between">
      <div className="flex relative flex-wrap items-center">
        <input
          className="w-4 h-4 bg-white rounded border-2 transition-colors appearance-none cursor-pointer checked:bg-rose-500 checked:border-rose-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed peer border-slate-500 checked:hover:border-rose-600 checked:hover:bg-rose-600 checked:focus:border-rose-700 checked:focus:bg-rose-700 disabled:border-slate-100 disabled:bg-slate-50"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          id="id-c01"
          name="remember"
        />
        <label
          className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
          htmlFor="id-c01"
        >
          {t("remember-me")}
        </label>
        <svg
          className="absolute left-0 top-1 w-4 h-4 opacity-0 transition-all duration-300 -rotate-90 pointer-events-none fill-white stroke-white peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          aria-labelledby="title-1 description-1"
          role="graphics-symbol"
        >
          <title id="title-1">Check mark icon</title>
          <desc id="description-1">
            Check mark icon to indicate whether the radio input is checked or
            not.
          </desc>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
          />
        </svg>
      </div>

      <button
        className="inline-flex gap-2 justify-center justify-self-center items-center h-12 text-sm font-medium tracking-wide text-rose-500 whitespace-nowrap rounded transition duration-300 hover:text-rose-600 hover:bg-rose-50 focus:text-rose-700 focus:bg-rose-100 focus-visible:outline-none disabled:text-rose-300 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:bg-transparent"
        onClick={handleChangeLanguage}
      >
        <span className="order-2">{t("change-language")}</span>
        <span className="relative only:-mx-6">
          <Globe size={15} />
        </span>
      </button>
    </div>
  );
}
