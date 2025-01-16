import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPath =
    path === "/signup" || path === "/signin" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  if (token && publicPath) {
    // if user have token and want to visit public path
    return NextResponse.redirect(new URL("/", request.url));
  } else if (!token && !publicPath) {
    // if user don't have token and but want to visit authentic path
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/verifyemail", "/profile"],
};
