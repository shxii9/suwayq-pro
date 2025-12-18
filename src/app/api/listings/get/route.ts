
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: "1", title: "سيارة للبيع", price: 2300, status: "ACTIVE" },
    { id: "2", title: "شقة للإيجار", price: 800, status: "PENDING" },
  ]);
}
