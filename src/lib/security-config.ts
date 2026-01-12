/**
 * Security Configuration
 * تكوين الأمان المتقدم للمشروع
 */

import { headers } from 'next/headers';

/**
 * CORS Headers Configuration
 * إعدادات CORS الآمنة
 */
export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'true',
};

/**
 * Security Headers
 * رؤوس الأمان الأساسية
 */
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
  ].join('; '),
};

/**
 * Rate Limiting Configuration
 * إعدادات تحديد المعدل
 */
export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
};

/**
 * Password Validation Rules
 * قواعد التحقق من كلمات المرور
 */
export const passwordRules = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

/**
 * Validate Password
 * التحقق من صحة كلمة المرور
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < passwordRules.minLength) {
    errors.push(`Password must be at least ${passwordRules.minLength} characters long`);
  }

  if (passwordRules.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (passwordRules.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (passwordRules.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (passwordRules.requireSpecialChars) {
    const specialCharsRegex = new RegExp(`[${passwordRules.specialChars.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`);
    if (!specialCharsRegex.test(password)) {
      errors.push('Password must contain at least one special character');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Get Client IP Address
 * الحصول على عنوان IP للعميل
 */
export async function getClientIp(): Promise<string> {
  const headersList = headers();
  return (
    headersList.get('x-forwarded-for')?.split(',')[0] ||
    headersList.get('x-real-ip') ||
    'unknown'
  );
}

/**
 * Sanitize Input
 * تنظيف المدخلات
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
}

/**
 * Validate Email
 * التحقق من صحة البريد الإلكتروني
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Hash Password (for reference - use bcryptjs in actual implementation)
 * تجزئة كلمة المرور
 */
export async function hashPassword(password: string): Promise<string> {
  // This is a placeholder - use bcryptjs in actual implementation
  // import bcrypt from 'bcryptjs';
  // const salt = await bcrypt.genSalt(10);
  // return bcrypt.hash(password, salt);
  return password; // Replace with actual bcrypt implementation
}

/**
 * Generate Secure Token
 * إنشاء رمز آمن
 */
export function generateSecureToken(length: number = 32): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

/**
 * Check if URL is Safe
 * التحقق من أن الرابط آمن
 */
export function isSafeUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const allowedProtocols = ['http:', 'https:'];
    return allowedProtocols.includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

/**
 * Export all security utilities
 */
export const securityUtils = {
  validatePassword,
  getClientIp,
  sanitizeInput,
  validateEmail,
  hashPassword,
  generateSecureToken,
  isSafeUrl,
};
