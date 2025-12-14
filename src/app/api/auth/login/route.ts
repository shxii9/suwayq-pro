import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(errors as Record<string, string[]>);
    }

    const { email, password } = validation.data;

    // Temporary authentication (should be replaced with database lookup)
    if (email === "admin@suwayq.com" && password === "123456") {
      return successResponse(
        {
          id: '1',
          email,
          name: 'مسؤول سويق',
          role: 'ADMIN',
        },
        'تم تسجيل الدخول بنجاح'
      );
    }

    return errorResponse('بيانات الاعتماد غير صحيحة', undefined, 401);
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('حدث خطأ في الخادم', undefined, 500);
  }
}
