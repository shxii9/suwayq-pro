import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const listings = await prisma.listing.findMany();
  return NextResponse.json(listings);
}