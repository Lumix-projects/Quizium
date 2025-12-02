import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserFromToken, isTokenValid } from "./app/(auth)/_shared/lib/token";

// util function to clear cookies and redirect
function clearAuthAndRedirect(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/login", req.url));
  res.cookies.delete("auth_token");
  return res;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get Validated Token and User Data
  const token = req.cookies.get("auth_token")?.value;
  const isValidToken = token && isTokenValid(token);
  const user = getUserFromToken(token); // Don't forget to pass the token!

  // Public Routes (accessible without authentication)
  const publicRoutes = ["/login", "/register", "/forgot-password"];

  // Check if user is not signed in
  if (!isValidToken || !user) {
    // Check if the current path is one of the public routes
    const isPublic = publicRoutes.some((r) => pathname.startsWith(r));
    if (!isPublic) {
      return clearAuthAndRedirect(req);
    }
    return NextResponse.next();
  }

  // ! User is authenticated from this point

  // Redirect authenticated users away from public routes
  if (publicRoutes.some((r) => pathname.startsWith(r))) {
    // Redirect to appropriate home based on role
    const redirectPath = user.isAdmin ? "/admin" : "/";
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  // Check if trying to access admin routes without admin privileges
  if (pathname.startsWith("/admin") && !user.isAdmin) {
    // Non-admin trying to access admin area redirect to user home
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to everything except these files - UPDATED
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|fonts|audio|api|_vercel|.*\\..*).*)",
  ],
};
