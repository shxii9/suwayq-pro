import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const userId = cookies().get("session")?.value;

    if (!userId) {
      return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });
    }

    const listings = await prisma.listing.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء جلب البيانات" }, { status: 500 });
  }
}
