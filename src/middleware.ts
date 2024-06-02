import { NextResponse, type NextRequest } from "next/server";
import { getAuthInfo } from "./utils/get-auth-info";

export async function middleware(request: NextRequest) {
  try {
    const payload = await getAuthInfo();

    // basic auth check
    if (!payload || !payload.status) {
      throw new Error();
    }

    // advance auth check
    let access: "SELLER" | "SUPER";

    switch (payload.role) {
      case "SUPERADMIN":
      case "ADMIN":
      case "EDITOR":
        access = "SUPER";
        break;
      default:
        access = "SELLER";
    }

    // auto login
    if (request.nextUrl.pathname === "/") {
      if (access === "SUPER") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      return NextResponse.redirect(new URL("/seller", request.url));
    }

    // to prevent authorized access
    if (access !== "SUPER") {
      if (request.nextUrl.pathname.startsWith("/dashboard")) {
        throw new Error();
      }
    } else {
      if (request.nextUrl.pathname.startsWith("/seller")) {
        throw new Error();
      }
    }
  } catch (err: any) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/seller/:path*", "/order/:path*"],
};
