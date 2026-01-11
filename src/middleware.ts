/**
 * Middleware for NextAuth protection
 * 
 * This middleware protects routes that require authentication
 * and redirects unauthenticated users to the login page.
 */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const middleware = withAuth(
  function middleware(req) {
    // Check if user is authenticated
    if (req.nextauth.token) {
      return NextResponse.next();
    }

    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Protect these routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/create-listing/:path*",
    "/my-listings/:path*",
    "/settings/:path*",
  ],
};
