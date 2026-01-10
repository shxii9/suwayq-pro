# دليل دعم اللغات المتعددة (i18n)

## نظرة عامة

تم تطبيق نظام دعم اللغات المتعددة (Internationalization - i18n) في مشروع Suwayq Pro باستخدام مكتبة `next-intl`. النظام يدعم حالياً لغتين:

- **العربية (ar)** - اللغة الافتراضية
- **الإنجليزية (en)**

## البنية الأساسية

### ملفات الترجمة

تقع ملفات الترجمة في مجلد `messages/`:

```
messages/
├── ar.json  # الترجمات العربية
└── en.json  # الترجمات الإنجليزية
```

### هيكل ملف الترجمة

كل ملف ترجمة منظم في أقسام منطقية للسهولة في الصيانة والتوسع.

## الاستخدام

### في المكونات

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('common');
  return <h1>{t('welcome')}</h1>;
}
```

### مكون تبديل اللغة

```tsx
import LanguageSwitcher from '@/components/features/LanguageSwitcher';

<LanguageSwitcher variant="dropdown" />
```

## إضافة لغة جديدة

1. أنشئ ملف ترجمة جديد في `messages/`
2. حدّث `i18n.ts` لإضافة اللغة الجديدة
3. حدّث `next-intl.config.js`

## الموارد

- [توثيق next-intl](https://next-intl-docs.vercel.app/)
- [دليل Next.js i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
