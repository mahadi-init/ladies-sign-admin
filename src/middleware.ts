import createMiddleware from "next-intl/middleware";
import { cookies } from "next/headers";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["bn", "en"],

  // Used when no locale matches
  defaultLocale: "bn",
  localeDetection: true,
  localePrefix: "always",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/dashboard/:path*", "/(bn|en)/:path*"],
};
