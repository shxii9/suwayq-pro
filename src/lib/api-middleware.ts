/**
 * API Middleware for authentication and authorization
 * 
 * This file provides utility functions for protecting API routes
 * and checking user permissions.
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth-config";

/**
 * Middleware to protect API routes
 * Returns user session or error response
 */
export async function protectRoute(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return {
        isProtected: false,
        error: NextResponse.json(
          { error: "غير مصرح - يرجى تسجيل الدخول" },
          { status: 401 }
        ),
      };
    }

    return {
      isProtected: true,
      session,
      user: session.user,
    };
  } catch (error) {
    console.error("Auth middleware error:", error);
    return {
      isProtected: false,
      error: NextResponse.json(
        { error: "خطأ في المصادقة" },
        { status: 500 }
      ),
    };
  }
}

/**
 * Middleware to check admin role
 */
export async function requireAdmin(req: NextRequest) {
  const auth = await protectRoute(req);

  if (!auth.isProtected) {
    return auth.error;
  }

  const user = auth.user as any;
  if (user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "لا توجد صلاحيات كافية" },
      { status: 403 }
    );
  }

  return null;
}

/**
 * Validate request body
 */
export function validateBody(
  body: any,
  requiredFields: string[]
): { valid: boolean; error?: string } {
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        valid: false,
        error: `حقل "${field}" مطلوب`,
      };
    }
  }

  return { valid: true };
}
