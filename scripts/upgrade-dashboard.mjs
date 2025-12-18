import fs from "fs";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/* =========================
   Dashboard Stats API
========================= */
ensureDir("src/app/api/dashboard/stats");

fs.writeFileSync(
  "src/app/api/dashboard/stats/route.ts",
  `
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  const session = cookies().get("session");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [users, listings, reports, latestListings] = await Promise.all([
    prisma.user.count(),
    prisma.listing.count(),
    prisma.report.count(),
    prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        price: true,
        createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({
    stats: {
      users,
      listings,
      reports,
    },
    latestListings,
  });
}
`
);

console.log("📊 Dashboard stats API created");
