import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // If the user is trying to access a protected admin route (except the login page itself)
  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin") {
    
    // Check if they have the secret admin cookie
    const adminSession = request.cookies.get("admin_session");

    if (!adminSession || adminSession.value !== process.env.JWT_SECRET) {
      // If not, redirect them back to the hidden login page
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
