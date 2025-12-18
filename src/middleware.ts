
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");
  const protectedPaths = ["/dashboard", "/admin"];
  if (protectedPaths.some(p => req.nextUrl.pathname.startsWith(p)) && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
