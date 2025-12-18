import fs from "fs";
import path from "path";

const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log("✅", file);
};

/* =========================
   AUTH
========================= */
write("src/lib/auth.ts", `
import { cookies } from "next/headers";

export function setSession(userId: string) {
  cookies().set("session", userId, { httpOnly: true, path: "/" });
}
export function getSession() {
  return cookies().get("session")?.value || null;
}
export function clearSession() {
  cookies().delete("session");
}
`);

/* =========================
   MIDDLEWARE
========================= */
write("src/middleware.ts", `
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");
  const protectedPaths = ["/dashboard", "/admin"];
  if (protectedPaths.some(p => req.nextUrl.pathname.startsWith(p)) && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
`);

/* =========================
   DASHBOARD API
========================= */
write("src/app/api/dashboard/stats/route.ts", `
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  if (!cookies().get("session")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [users, listings, reports] = await Promise.all([
    prisma.user.count(),
    prisma.listing.count(),
    prisma.report.count()
  ]);

  return NextResponse.json({ users, listings, reports });
}
`);

/* =========================
   DASHBOARD PAGE
========================= */
write("src/app/dashboard/page.tsx", `
"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then(r => r.json())
      .then(setStats);
  }, []);

  if (!stats) return <div>تحميل...</div>;

  return (
    <div dir="rtl">
      <Navbar />
      <h1 className="text-2xl font-bold m-6">لوحة التحكم</h1>
      <div className="grid grid-cols-3 gap-4 m-6">
        <div className="p-4 bg-white rounded">المستخدمين: {stats.users}</div>
        <div className="p-4 bg-white rounded">الإعلانات: {stats.listings}</div>
        <div className="p-4 bg-white rounded">البلاغات: {stats.reports}</div>
      </div>
    </div>
  );
}
`);

console.log("🚀 Bootstrap completed successfully");
