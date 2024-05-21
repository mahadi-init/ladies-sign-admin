import { NextResponse, type NextRequest } from "next/server";
import { getAuthInfo } from "./utils/get-auth-info";

export async function middleware(request: NextRequest) {
  try {
    const payload = await getAuthInfo();

    if (!payload || !payload.status || !payload.role) {
      if (request.nextUrl.pathname.startsWith("/dashboard")) {
        throw new Error();
      }
    }
  } catch (err: any) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/seller/:path*"],
};
