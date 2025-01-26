import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;
  
  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Extract role from token
  const userRole = token.role;

  // Define role-based routes
  const roleRoutes: Record<string, RegExp> = {
    admin: /^\/admin/,
    sales: /^\/sales/,
    manager: /^\/manager/,
    collector: /^\/collector/,
  };

  // Check if the user has access to the requested path
  const hasAccess = Object.entries(roleRoutes).some(
    ([role, pathRegex]) => userRole === role && pathRegex.test(url.pathname)
  );

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/sales/:path*", "/manager/:path*", "/collector/:path*", "/api/:path*"],
};