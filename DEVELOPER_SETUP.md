# 👨‍💻 Developer Setup Guide
# دليل إعداد المطورين

## 🚀 البدء السريع

### المتطلبات
- **Node.js**: 18.x أو أحدث
- **pnpm**: 8.x أو أحدث
- **Git**: أحدث إصدار
- **PostgreSQL**: 12 أو أحدث (اختياري للتطوير المحلي)

### التثبيت

```bash
# 1. استنساخ المستودع
git clone https://github.com/shxii9/suwayq-pro.git
cd suwayq-pro

# 2. تثبيت التبعيات
pnpm install

# 3. إعداد متغيرات البيئة
cp .env.example .env.local
cp .env.local.example .env.local

# 4. تحديث قاعدة البيانات
pnpm run prisma:migrate

# 5. بدء خادم التطوير
pnpm run dev
```

الموقع سيكون متاحاً على: **http://localhost:3000**

---

## 📋 الأوامر المتاحة

```bash
# تطوير
pnpm run dev          # بدء خادم التطوير

# البناء
pnpm run build        # بناء للإنتاج
pnpm run start        # تشغيل الإنتاج المحلي

# الاختبار
pnpm run test         # تشغيل الاختبارات
pnpm run test:watch   # الاختبارات مع المراقبة

# جودة الكود
pnpm run lint         # فحص الأخطاء
pnpm run format       # تنسيق الكود
pnpm run quality      # تنسيق + فحص

# قاعدة البيانات
pnpm run prisma:generate  # توليد Prisma Client
pnpm run prisma:migrate   # تطبيق الهجرات
pnpm run prisma:studio    # فتح Prisma Studio
```

---

## 🔐 متغيرات البيئة

### المتطلبة
```
DATABASE_URL          # رابط قاعدة البيانات
NEXTAUTH_SECRET       # مفتاح سري للمصادقة
NEXTAUTH_URL          # رابط التطبيق
```

### الاختيارية
```
GOOGLE_CLIENT_ID      # معرف Google OAuth
GITHUB_ID             # معرف GitHub OAuth
SMTP_HOST             # خادم البريد الإلكتروني
STRIPE_PUBLIC_KEY     # مفتاح Stripe العام
```

### إنشاء NEXTAUTH_SECRET

```bash
# استخدم أحد الأوامر التالية:
openssl rand -base64 32
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📁 هيكل المشروع

```
suwayq-pro/
├── src/
│   ├── app/                    # صفحات Next.js
│   │   ├── (buyer)/           # صفحات المشتري
│   │   ├── (seller)/          # صفحات البائع
│   │   ├── (admin)/           # صفحات الإدارة
│   │   └── api/               # مسارات API
│   ├── components/             # مكونات React
│   │   ├── shared/            # مكونات مشتركة
│   │   └── listing/           # مكونات الإعلانات
│   ├── lib/                    # مكتبات وأدوات
│   │   ├── security-config.ts # إعدادات الأمان
│   │   ├── error-handler.ts   # معالج الأخطاء
│   │   ├── validation.ts      # التحقق من البيانات
│   │   ├── dev-utils.ts       # أدوات المطور
│   │   └── prisma.ts          # عميل Prisma
│   └── middleware.ts           # Middleware
├── prisma/                     # قاعدة البيانات
│   └── schema.prisma          # مخطط Prisma
├── docs/                       # التوثيق
├── public/                     # الملفات الثابتة
└── package.json               # المتطلبات
```

---

## 🛠️ أدوات التطوير

### VS Code Extensions
```
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- Thunder Client (لاختبار API)
```

### الإعدادات الموصى بها

**settings.json:**
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 🔍 استكشاف الأخطاء

### خطأ: "DATABASE_URL is not set"
```bash
# تأكد من أن .env.local موجود وتحتوي على DATABASE_URL
cp .env.local.example .env.local
# ثم أكمل البيانات المطلوبة
```

### خطأ: "NEXTAUTH_SECRET is not set"
```bash
# أنشئ مفتاح سري جديد
openssl rand -base64 32
# أضفه في .env.local
```

### خطأ: "Port 3000 is already in use"
```bash
# استخدم منفذ مختلف
PORT=3001 pnpm run dev
```

### خطأ: "Prisma Client not found"
```bash
# أعد توليد Prisma Client
pnpm run prisma:generate
```

---

## 📝 أفضل الممارسات

### 1. الكود النظيف
- استخدم TypeScript دائماً
- اتبع معايير ESLint
- نسّق الكود قبل الـ Commit

### 2. الأمان
- لا تضع مفاتيح API في الكود
- استخدم متغيرات البيئة
- تحقق من صحة المدخلات دائماً

### 3. الأداء
- استخدم React.memo للمكونات الثقيلة
- أضف lazy loading للصور
- استخدم Code Splitting

### 4. الاختبار
- اكتب اختبارات للميزات الجديدة
- اختبر الحالات الحدية
- استخدم Mock للبيانات

---

## 🚀 نصائح الإنتاجية

### استخدام Git بشكل فعال
```bash
# إنشاء فرع جديد
git checkout -b feature/feature-name

# Commit مع رسالة واضحة
git commit -m "feat: إضافة ميزة جديدة"

# دفع التحديثات
git push origin feature/feature-name

# إنشاء Pull Request
```

### Debugging
```bash
# استخدم console.log مع logger
import { logger } from '@/lib/dev-utils';
logger.debug('Debug message', { data });

# استخدم Prisma Studio
pnpm run prisma:studio

# استخدم Chrome DevTools
# اضغط F12 في المتصفح
```

### Performance Monitoring
```bash
import { PerformanceMonitor } from '@/lib/dev-utils';

const monitor = new PerformanceMonitor('Operation name');
// ... do something
const duration = monitor.end(); // logs the duration
```

---

## 📚 الموارد المفيدة

| الموضوع | الرابط |
|:---|:---|
| Next.js Docs | https://nextjs.org/docs |
| Prisma Docs | https://www.prisma.io/docs |
| TypeScript | https://www.typescriptlang.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| NextAuth.js | https://next-auth.js.org |

---

## 🤝 المساهمة

1. اقرأ [CONTRIBUTING.md](./CONTRIBUTING.md)
2. اتبع معايير الكود
3. اكتب اختبارات للميزات الجديدة
4. أنشئ Pull Request

---

## ❓ الأسئلة الشائعة

**س: كيف أضيف متغير بيئة جديد؟**
أ: أضفه في `.env.local` و `.env.example`، ثم أعد تشغيل الخادم.

**س: كيف أختبر API محلياً؟**
أ: استخدم Thunder Client أو Postman على `http://localhost:3000/api`

**س: كيف أعدل قاعدة البيانات؟**
أ: عدّل `prisma/schema.prisma` ثم شغّل `pnpm run prisma:migrate`

**س: كيف أضيف مكتبة جديدة؟**
أ: استخدم `pnpm add package-name`

---

**آخر تحديث:** 2024-01-09  
**الإصدار:** 1.0.0  
**الحالة:** ✅ جاهز للتطوير
