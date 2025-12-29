import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category");
  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "9999999");

  try {
    const listings = await prisma.listing.findMany({
      where: {
        status: "ACTIVE",
        AND: [
          {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ],
          },
          category && category !== "الكل" ? { category } : {},
          { price: { gte: minPrice, lte: maxPrice } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: "فشل جلب البيانات" }, { status: 500 });
  }
}
