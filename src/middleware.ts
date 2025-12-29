import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  // هنا يمكننا مستقبلاً إضافة حماية حقيقية تعتمد على السيرفر
  return NextResponse.next();
}
