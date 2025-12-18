
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  return NextResponse.json(await prisma.listing.findMany());
}

export async function POST(req:Request) {
  const body = await req.json();
  const userId = cookies().get("session")?.value;
  if(!userId) return NextResponse.json({error:"unauth"}, {status:401});

  await prisma.listing.create({
    data:{ title: body.title, userId }
  });
  return NextResponse.json({ok:true});
}
