import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// اللغات المدعومة
export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];

// اللغة الافتراضية
export const defaultLocale: Locale = 'ar';

// أسماء اللغات للعرض
export const localeNames: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English'
};

// اتجاه النص لكل لغة
export const localeDirections: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  en: 'ltr'
};

export default getRequestConfig(async ({ locale }) => {
  // التحقق من أن اللغة مدعومة
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
