
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

// GET listing by id
export async function GET(req, { params }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
  });

  if (!listing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(listing);
}

// UPDATE listing
export async function PUT(req, { params }) {
  const userId = getSession();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const updated = await prisma.listing.updateMany({
    where: {
      id: params.id,
      userId,
    },
    data: body,
  });

  if (updated.count === 0) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ success: true });
}

// DELETE listing
export async function DELETE(req, { params }) {
  const userId = getSession();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.listing.deleteMany({
    where: {
      id: params.id,
      userId,
    },
  });

  return NextResponse.json({ success: true });
}
