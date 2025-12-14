<<<<<<< HEAD
﻿// src/app/api/listings/create/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  console.log("New Listing Received:", data);
  return NextResponse.json({ success: true, message: "تم إنشاء الإعلان بنجاح، بانتظار الموافقة." });
=======
import { NextResponse } from 'next/server';
import { createListingSchema } from '@/lib/validation';
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validation = createListingSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(errors as Record<string, string[]>);
    }

    const data = validation.data;

    // Log the listing creation
    console.log('New Listing Created:', {
      ...data,
      createdAt: new Date().toISOString(),
    });

    // Return success response
    return successResponse(
      {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      'تم إنشاء الإعلان بنجاح، بانتظار الموافقة'
    );
  } catch (error) {
    console.error('Create listing error:', error);
    return errorResponse('حدث خطأ في الخادم', undefined, 500);
  }
>>>>>>> 6d5984d4ad3b99c6bc28394e1f4b626b039da0fe
}
