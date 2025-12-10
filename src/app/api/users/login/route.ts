// src/app/api/users/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  if (email === "admin@suwayq.com" && password === "123456") {
    return NextResponse.json({ success: true, message: "تم تسجيل الدخول بنجاح!" });
  } else {
    return NextResponse.json({ success: false, message: "بيانات الاعتماد غير صحيحة" }, { status: 401 });
  }
}