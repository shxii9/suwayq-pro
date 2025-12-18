import fs from "fs";
import path from "path";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/* =========================
   Auth helpers
========================= */
ensureDir("src/lib");
fs.writeFileSync(
  "src/lib/auth.ts",
  `
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

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

/* =========================
   Register API
========================= */
ensureDir("src/app/api/auth/register");
fs.writeFileSync(
  "src/app/api/auth/register/route.ts",
  `
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, setSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await hashPassword(password),
    },
  });

  setSession(user.id);
  return NextResponse.json({ user });
}
`
);

/* =========================
   Login API
========================= */
ensureDir("src/app/api/auth/login");
fs.writeFileSync(
  "src/app/api/auth/login/route.ts",
  `
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, setSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  setSession(user.id);
  return NextResponse.json({ user });
}
`
);

/* =========================
   Middleware protection
========================= */
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

console.log("✅ Auth system implemented (register, login, session, middleware)");
