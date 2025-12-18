import fs from "fs";
import path from "path";

const write = (p, c) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, c);
  console.log("✅", p);
};

/* ======================
   Prisma schema (آمن)
====================== */
write("prisma/schema.prisma", `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  listings  Listing[]
}

model Listing {
  id        String   @id @default(cuid())
  title     String
  price     Float
  status    ListingStatus @default(PENDING)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}

enum ListingStatus {
  PENDING
  ACTIVE
  REJECTED
}
`);

/* ======================
   Prisma Client
====================== */
write("src/lib/db.ts", `
import { PrismaClient } from "@prisma/client";
export const prisma = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
`);

/* ======================
   Auth helpers
====================== */
write("src/lib/auth.ts", `
import { cookies } from "next/headers";

export function getSession() {
  return cookies().get("session")?.value || null;
}
`);

/* ======================
   Middleware
====================== */
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

/* ======================
   Dashboard API
====================== */
write("src/app/api/dashboard/stats/route.ts", `
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  if (!cookies().get("session")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [users, listings] = await Promise.all([
      prisma.user.count(),
      prisma.listing.count()
    ]);

    return NextResponse.json({ users, listings });
  } catch {
    return NextResponse.json({ users: 0, listings: 0 });
  }
}
`);

/* ======================
   Dashboard UI (User + Admin)
====================== */
write("src/app/dashboard/page.tsx", `
"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState({ users: 0, listings: 0 });

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <div dir="rtl" className="p-8">
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <div className="text-gray-500">المستخدمين</div>
          <div className="text-3xl font-black">{data.users}</div>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <div className="text-gray-500">الإعلانات</div>
          <div className="text-3xl font-black">{data.listings}</div>
        </div>
      </div>

      <a
        href="https://wa.me/96500000000?text=أرغب%20بالاشتراك"
        className="bg-green-600 text-white px-6 py-3 rounded font-bold"
      >
        الاشتراك عبر واتساب
      </a>
    </div>
  );
}
`);

console.log("\\n🚀 كل شيء تم بنجاح");
