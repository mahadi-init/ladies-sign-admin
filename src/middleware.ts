import { NextResponse, type NextRequest } from "next/server";
import { getAuthInfo } from "./utils/get-auth-info";

export async function middleware(request: NextRequest) {
  try {
    const payload = await getAuthInfo();

    // basic auth check
    if (!payload) {
      throw new Error();
    }

    // auto login
    if (request.nextUrl.pathname === "/") {
      if (payload.role) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  } catch (err: any) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
