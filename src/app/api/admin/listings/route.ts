import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.listing.delete({
      where: { id: id }
    });
    return NextResponse.json({ message: "تم حذف الإعلان بنجاح" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "فشل حذف الإعلان" }, { status: 500 });
  }
}
