import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const auth = cookies().get("auth")

  if (!auth) {
    return NextResponse.redirect(new URL("/", request.url))
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
