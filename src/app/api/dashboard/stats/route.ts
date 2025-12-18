
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
