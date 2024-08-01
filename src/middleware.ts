export default function middleware() {}

// export default auth((req) => {
//   connectDB();
//   // if (!req.auth && req.nextUrl.pathname !== "/") {
//   //   const newUrl = new URL("/", req.nextUrl.origin);
//   //   return Response.redirect(newUrl);
//   // }
//   // else if (req.auth && req.nextUrl.pathname === "/") {
//   //   const newUrl = new URL("/dashboard", req.nextUrl.origin);
//   //   return Response.redirect(newUrl);
//   // }
// });

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
