import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasSiteAccessPermission } from "./utils/site-access-permission";

export function middleware(request: NextRequest) {
  const token = cookies().get("access-token");
  const access = hasSiteAccessPermission(token?.value);

  if (!access) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
