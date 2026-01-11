# 🛍️ Suwayq Pro - منصة التجارة الإلكترونية المتقدمة

<div align="center">

![Suwayq Pro](https://img.shields.io/badge/Suwayq-Pro-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**منصة تجارة إلكترونية حديثة ومتكاملة مع ميزات متقدمة للبائعين والمشترين**

[المميزات](#-المميزات-الرئيسية) • [التقنيات](#️-التقنيات-المستخدمة) • [البدء](#-البدء-السريع) • [التوثيق](#-التوثيق)

</div>

---

## 📋 نظرة عامة

**Suwayq Pro** هي منصة تجارة إلكترونية متكاملة مبنية بأحدث التقنيات، توفر تجربة سلسة للبائعين والمشترين مع ميزات متقدمة تشمل الذكاء الاصطناعي، التحليلات الشاملة، ودعم اللغات المتعددة.

---

## ✨ المميزات الرئيسية

### 📊 لوحة تحكم البائع المتقدمة
- إحصائيات فورية: إجمالي المبيعات، الإيرادات، التقييمات
- تحليلات الأداء مع رسوم بيانية تفاعلية
- إدارة المنتجات والطلبات
- نظام التقييمات وقياس وقت الاستجابة

### 🛒 ميزات المشتري المتقدمة
- قائمة الأمنيات مع إشعارات انخفاض الأسعار
- مقارنة المنتجات
- نظام الإشعارات الفورية
- برنامج الولاء ونقاط المكافآت

### 💬 نظام التغذية الراجعة
- نموذج تغذية راجعة تفاعلي
- تصنيف الملاحظات (أخطاء، طلبات ميزات، تحسينات)
- نظام التقييم (1-5 نجوم)
- A/B Testing لتحسين التحويلات

### 🌍 دعم اللغات المتعددة (i18n)
- العربية (افتراضي) مع دعم RTL كامل
- الإنجليزية مع دعم LTR
- كشف تلقائي للغة وتبديل سلس
- بنية قابلة للتوسع لإضافة لغات جديدة

### 🎨 واجهة مستخدم متقدمة
- الوضع الليلي الكامل
- تصميم متجاوب لجميع الأجهزة
- رموز QR للمنتجات
- إدارة الصور عبر Cloudinary

---

## 🛠️ التقنيات المستخدمة

### Frontend
- Next.js 14 + React 18 + TypeScript
- Tailwind CSS 4
- next-intl (دعم اللغات)

### Backend
- Next.js API Routes
- Prisma ORM
- NextAuth.js

### Database
- PostgreSQL + Supabase

### Testing
- Jest + React Testing Library

---

## 🚀 البدء السريع

### المتطلبات
- Node.js 20+
- pnpm 8+
- PostgreSQL 14+ (أو Docker)

### التثبيت

```bash
# استنساخ المستودع
git clone https://github.com/shxii9/suwayq-pro.git
cd suwayq-pro

# تثبيت التبعيات
pnpm install

# إعداد البيئة
cp .env.example .env

# إعداد قاعدة البيانات
pnpm prisma migrate dev

# تشغيل المشروع
pnpm dev
```

المشروع سيعمل على `http://localhost:3000`

---

## 🐳 إعداد قاعدة البيانات باستخدام Docker

إذا كنت تريد تشغيل قاعدة بيانات PostgreSQL محليًا بدون تثبيتها على نظامك، يمكنك استخدام Docker:

### المتطلبات
- Docker و Docker Compose مثبتة على جهازك

### التشغيل

```bash
# تشغيل حاوية PostgreSQL في الخلفية
docker-compose up -d

# التحقق من أن الحاوية تعمل
docker-compose ps

# عرض السجلات (اختياري)
docker-compose logs -f db
```

### بيانات الاتصال

بعد تشغيل الحاوية، استخدم بيانات الاتصال التالية في ملف `.env`:

```bash
DATABASE_URL="postgresql://suwayq_user:123456@localhost:5432/suwayq_db"
```

### إيقاف قاعدة البيانات

```bash
# إيقاف الحاوية
docker-compose down

# إيقاف الحاوية وحذف البيانات
docker-compose down -v
```

---

## 📚 التوثيق

- **[دليل i18n](./docs/I18N_GUIDE.md)**: إدارة اللغات المتعددة
- **[دليل API](./docs/API_GUIDE.md)**: توثيق نقاط النهاية
- **[دليل المساهمة](./CONTRIBUTING.md)**: كيفية المساهمة
- **[تقرير الفحص](./Suwayq_Pro_Audit_Report.md)**: تقرير شامل عن جودة المشروع
- **[الإصلاحات والتوصيات](./FIXES_AND_RECOMMENDATIONS.md)**: إصلاحات مفصلة وتوصيات

---

## 🧪 الاختبار

```bash
pnpm test              # تشغيل الاختبارات
pnpm test:coverage     # مع التغطية
pnpm test:watch        # وضع المراقبة
```

---

## 🤝 المساهمة

نرحب بجميع المساهمات!

1. Fork المشروع
2. أنشئ فرع للميزة (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى الفرع (`git push origin feature/amazing-feature`)
5. افتح Pull Request

يرجى قراءة [دليل المساهمة](./CONTRIBUTING.md) قبل البدء.

---

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](./LICENSE).

---

## 👥 الفريق

- **المطور الرئيسي**: [@shxii9](https://github.com/shxii9)
- **تحسينات وإصلاحات**: [@manus-ai](https://github.com/manus-ai)

---

## 🔒 الأمان

إذا وجدت ثغرة أمنيّةً، الرجاء عدم فتح issue عام. بدلاً من ذلك، يرجى التواصل عبر البريد الإلكتروني أو قراءة [سياسة الأمان](./SECURITY.md).

---

## 📞 الدعم

للحصول على الدعم أو الإبلاغ عن مشاكل، يرجى فتح [issue](https://github.com/shxii9/suwayq-pro/issues) جديد.

---

<div align="center">

**صُنع بـ ❤️ في السعودية**

⭐ إذا أعجبك المشروع، لا تنسَ إضافة نجمة!

</div>
