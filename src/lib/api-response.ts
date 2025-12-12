import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

export function successResponse<T>(
  data: T,
  message: string = 'تم بنجاح',
  status: number = 200
) {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return NextResponse.json(response, { status });
}

export function errorResponse(
  message: string = 'حدث خطأ',
  error?: string,
  status: number = 400
) {
  const response: ApiResponse = {
    success: false,
    message,
    error,
  };
  return NextResponse.json(response, { status });
}

export function validationErrorResponse(errors: Record<string, string[]>) {
  return NextResponse.json(
    {
      success: false,
      message: 'خطأ في التحقق من البيانات',
      errors,
    },
    { status: 422 }
  );
}
