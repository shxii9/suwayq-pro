// src/app/api/listings/create/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  console.log('New Listing Received:', data); 
  return NextResponse.json({ success: true, message: "تم إنشاء الإعلان بنجاح، بانتظار الموافقة." });
}