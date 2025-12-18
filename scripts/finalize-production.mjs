import fs from "fs";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/* =========================
   Prisma Client Singleton
========================= */
ensureDir("src/lib");

fs.writeFileSync(
  "src/lib/db.ts",
  `
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
`
);

/* =========================
   Secure Auth Response
========================= */
fs.writeFileSync(
  "src/lib/sanitize-user.ts",
  `
export function sanitizeUser(user: any) {
  const { password, ...safeUser } = user;
  return safeUser;
}
`
);

/* =========================
   Middleware Protection
========================= */
fs.writeFileSync(
  "src/middleware.ts",
  `
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
`
);

/* =========================
   README
========================= */
fs.writeFileSync(
  "README.md",
  `
# 🚀 Suwayq Pro

Full-stack marketplace platform built with **Next.js 14**, **Prisma**, and **PostgreSQL (Supabase)**.

## ✨ Features
- 🔐 Secure authentication (register / login / session)
- 📊 Admin dashboard with real-time stats
- 🗄️ Prisma ORM + PostgreSQL
- ⚡ Production-ready architecture
- 🛡️ Middleware route protection

## 🧪 Local Development
\`\`\`bash
npm install
npm run dev
\`\`\`

## 📦 Prisma
\`\`\`bash
npx prisma migrate dev
npx prisma generate
\`\`\`

## ☁️ Deployment
Ready for **Vercel** with Supabase database.

---

Built with ❤️
`
);

console.log("🚀 Project finalized & production-ready");
