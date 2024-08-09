import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function middleware(request: Request) {
  const session = cookies().get("authjs.session-token") ?? cookies().get("__Secure-authjs.session-token")

  if (!session) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }
}

export const config = {
  matcher: '/dashboard/:path*'
}
