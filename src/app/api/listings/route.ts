import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // إذا تم ضغط زر فئة معينة، نبحث عنها، وإلا نجلب الكل
    const listings = await prisma.listing.findMany({
      where: category ? {
        category: category
      } : {},
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "فشل جلب البيانات" }, { status: 500 });
  }
}
