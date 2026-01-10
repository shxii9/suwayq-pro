import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '../i18n';

export default createMiddleware({
  // قائمة اللغات المدعومة
  locales,

  // اللغة الافتراضية
  defaultLocale,

  // إستراتيجية كشف اللغة
  localeDetection: true,

  // إعادة توجيه المسار الجذر إلى اللغة الافتراضية
  localePrefix: 'as-needed'
});

export const config = {
  // مطابقة جميع المسارات ما عدا:
  // - API routes
  // - Static files (_next/static)
  // - Image optimization (_next/image)
  // - Favicon
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
