import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ADMIN_COOKIE } from "@/lib/auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Public admin login page
  if (pathname === "/admin" || pathname === "/admin/") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    if (token && process.env.JWT_SECRET) {
      try {
        await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET)
        );
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } catch {
        // stay on login
      }
    }
    return NextResponse.next();
  }

  // Protect all other /admin/* pages
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token || !process.env.JWT_SECRET) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/admin", request.url));
    res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
