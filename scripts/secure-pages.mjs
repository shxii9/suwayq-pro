import fs from "fs";

const middleware = `
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isLoggedIn = false; // TODO: real auth check
  if (!isLoggedIn && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
`;

fs.writeFileSync("src/middleware.ts", middleware);
console.log("🔐 Middleware added");
