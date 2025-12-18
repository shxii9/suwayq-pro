import fs from "fs";

// ---------- auth.ts ----------
fs.writeFileSync(
  "src/lib/auth.ts",
  `
import { cookies } from "next/headers";

export function setSession(userId: string) {
  cookies().set("session", userId, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
}

export function getSession() {
  return cookies().get("session")?.value || null;
}

export function clearSession() {
  cookies().delete("session");
}
`
);

console.log("✅ Auth helpers implemented");

// ---------- middleware.ts ----------
fs.writeFileSync(
  "src/middleware.ts",
  `
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");

  const protectedPaths = ["/dashboard", "/admin"];
  const isProtected = protectedPaths.some(p =>
    req.nextUrl.pathname.startsWith(p)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
`
);

console.log("🔐 Middleware updated with real auth check");
