import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  // الصفحات التي تتطلب تسجيل دخول
  const protectedPaths = ["/listings/create", "/my-listings"];
  
  const isProtected = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/listings/create", "/my-listings"],
};
