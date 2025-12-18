
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET() {
  const users = await prisma.user.findMany({ select: { id:true, email:true }});
  return NextResponse.json(users);
}
