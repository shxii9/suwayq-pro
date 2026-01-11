# 📋 هيكل مشروع Suwayq Pro

## 🎯 نظرة عامة

Suwayq Pro هو منصة تجارة إلكترونية متكاملة مثل Amazon والسوق المفتوح، مبنية باستخدام أحدث التقنيات.

---

## 📁 هيكل المشروع

```
suwayq-pro/
├── src/
│   ├── app/
│   │   ├── (buyer)/                 # صفحات المشتري
│   │   │   ├── page.tsx            # الصفحة الرئيسية
│   │   │   ├── listings/           # قائمة الإعلانات
│   │   │   ├── listing/[id]/       # تفاصيل الإعلان
│   │   │   ├── cart/               # سلة التسوق
│   │   │   ├── checkout/           # الدفع
│   │   │   ├── orders/             # الطلبات
│   │   │   ├── wishlist/           # الأمنيات
│   │   │   ├── messages/           # الرسائل
│   │   │   └── profile/            # الملف الشخصي
│   │   │
│   │   ├── (seller)/                # صفحات البائع
│   │   │   ├── dashboard/          # لوحة التحكم
│   │   │   ├── listings/           # إدارة الإعلانات
│   │   │   ├── listings/create/    # إنشاء إعلان
│   │   │   ├── listings/[id]/edit/ # تعديل إعلان
│   │   │   ├── orders/             # إدارة الطلبات
│   │   │   ├── analytics/          # التحليلات
│   │   │   ├── reviews/            # التقييمات
│   │   │   └── messages/           # الرسائل
│   │   │
│   │   ├── (admin)/                 # صفحات الإدارة
│   │   │   ├── dashboard/          # لوحة التحكم
│   │   │   ├── users/              # إدارة المستخدمين
│   │   │   ├── categories/         # إدارة الفئات
│   │   │   ├── listings/           # إدارة الإعلانات
│   │   │   ├── reports/            # التقارير
│   │   │   ├── settings/           # الإعدادات
│   │   │   └── analytics/          # التحليلات
│   │   │
│   │   └── api/                     # مسارات API
│   │       ├── listings/           # API الإعلانات
│   │       ├── users/              # API المستخدمين
│   │       ├── orders/             # API الطلبات
│   │       ├── reviews/            # API التقييمات
│   │       ├── messages/           # API الرسائل
│   │       └── auth/               # API المصادقة
│   │
│   ├── components/
│   │   ├── shared/                  # مكونات مشتركة
│   │   │   ├── Navbar.tsx          # شريط التنقل
│   │   │   ├── Footer.tsx          # التذييل
│   │   │   ├── SearchBar.tsx       # شريط البحث
│   │   │   ├── Pagination.tsx      # الترقيم
│   │   │   ├── Notifications.tsx   # الإشعارات
│   │   │   └── StatCard.tsx        # بطاقة الإحصائيات
│   │   │
│   │   └── listing/                 # مكونات الإعلانات
│   │       ├── ListingCard.tsx     # بطاقة الإعلان
│   │       ├── ListingFilter.tsx   # تصفية الإعلانات
│   │       └── ListingGallery.tsx  # معرض الصور
│   │
│   ├── lib/
│   │   ├── db.ts                   # اتصال قاعدة البيانات
│   │   ├── prisma.ts               # Prisma Client
│   │   ├── auth.ts                 # نظام المصادقة
│   │   ├── auth-config.ts          # إعدادات NextAuth
│   │   ├── api-middleware.ts       # Middleware للـ API
│   │   └── utils.ts                # دوال مساعدة
│   │
│   ├── middleware.ts               # Middleware عام
│   ├── i18n.ts                    # إعدادات اللغات
│   └── styles/
│       └── globals.css             # الأنماط العامة
│
├── prisma/
│   ├── schema.prisma               # نموذج قاعدة البيانات
│   └── migrations/                 # ملفات الترحيل
│
├── public/                         # الملفات الثابتة
├── docs/                           # التوثيق
│   ├── API_GUIDE.md               # دليل API
│   └── DEPLOYMENT.md              # دليل النشر
│
├── .env.example                    # متغيرات البيئة
├── next.config.mjs                # إعدادات Next.js
├── tsconfig.json                  # إعدادات TypeScript
├── tailwind.config.ts             # إعدادات Tailwind
├── package.json                   # المتطلبات
└── README.md                      # ملف التعريف
```

---

## 🔄 تدفق البيانات

### 1. المشتري (Buyer Flow)

```
المشتري
  ↓
الصفحة الرئيسية (Home)
  ↓
تصفح الإعلانات (Listings)
  ↓
عرض التفاصيل (Listing Detail)
  ↓
إضافة إلى السلة (Cart)
  ↓
الدفع (Checkout)
  ↓
تأكيد الطلب (Order Confirmation)
  ↓
تتبع الطلب (Track Order)
```

### 2. البائع (Seller Flow)

```
البائع
  ↓
لوحة التحكم (Dashboard)
  ↓
إنشاء إعلان (Create Listing)
  ↓
إدارة الإعلانات (Manage Listings)
  ↓
إدارة الطلبات (Manage Orders)
  ↓
عرض التحليلات (View Analytics)
  ↓
الرد على الرسائل (Messages)
```

### 3. الإدارة (Admin Flow)

```
الإدارة
  ↓
لوحة التحكم (Dashboard)
  ↓
إدارة المستخدمين (Users)
  ↓
إدارة الفئات (Categories)
  ↓
مراجعة الإعلانات (Review Listings)
  ↓
عرض التقارير (Reports)
  ↓
إدارة الإعدادات (Settings)
```

---

## 🔌 مسارات API

### Listings API
- `GET /api/listings` - الحصول على الإعلانات
- `POST /api/listings` - إنشاء إعلان
- `GET /api/listings/[id]` - الحصول على تفاصيل إعلان
- `PUT /api/listings/[id]` - تحديث إعلان
- `DELETE /api/listings/[id]` - حذف إعلان

### Users API
- `GET /api/users` - الحصول على المستخدمين
- `POST /api/users` - إنشاء مستخدم جديد
- `GET /api/users/[id]` - الحصول على بيانات المستخدم
- `PUT /api/users/[id]` - تحديث بيانات المستخدم

### Orders API
- `GET /api/orders` - الحصول على الطلبات
- `POST /api/orders` - إنشاء طلب جديد
- `GET /api/orders/[id]` - الحصول على تفاصيل الطلب
- `PUT /api/orders/[id]` - تحديث حالة الطلب

### Reviews API
- `GET /api/reviews` - الحصول على التقييمات
- `POST /api/reviews` - إضافة تقييم جديد
- `PUT /api/reviews/[id]` - تحديث التقييم
- `DELETE /api/reviews/[id]` - حذف التقييم

---

## 🎨 المكونات الرئيسية

### مكونات المشتري
- **Navbar**: شريط التنقل العلوي
- **SearchBar**: شريط البحث المتقدم
- **ListingCard**: بطاقة الإعلان
- **ListingFilter**: تصفية الإعلانات
- **Pagination**: ترقيم الصفحات
- **Notifications**: الإشعارات

### مكونات البائع
- **SellerDashboard**: لوحة تحكم البائع
- **ListingForm**: نموذج إنشاء الإعلان
- **OrdersList**: قائمة الطلبات
- **Analytics**: الرسوم البيانية

### مكونات الإدارة
- **AdminDashboard**: لوحة تحكم الإدارة
- **UserManagement**: إدارة المستخدمين
- **CategoryManagement**: إدارة الفئات
- **ReportsView**: عرض التقارير

---

## 🗄️ قاعدة البيانات

### الجداول الرئيسية

#### Users
- id (UUID)
- name (String)
- email (String, Unique)
- password (String)
- phone (String)
- avatar (String)
- role (Enum: buyer, seller, admin)
- verified (Boolean)
- createdAt (DateTime)
- updatedAt (DateTime)

#### Listings
- id (UUID)
- userId (UUID) - FK to Users
- title (String)
- description (String)
- price (Decimal)
- category (String)
- condition (String)
- location (String)
- images (String[])
- rating (Float)
- reviews (Int)
- status (Enum: active, sold, pending)
- createdAt (DateTime)
- updatedAt (DateTime)

#### Orders
- id (UUID)
- userId (UUID) - FK to Users
- items (JSON)
- total (Decimal)
- status (Enum: pending, processing, shipped, delivered)
- shippingAddress (String)
- createdAt (DateTime)
- updatedAt (DateTime)

#### Reviews
- id (UUID)
- listingId (UUID) - FK to Listings
- userId (UUID) - FK to Users
- rating (Int)
- title (String)
- content (String)
- helpful (Int)
- createdAt (DateTime)

#### Messages
- id (UUID)
- senderId (UUID) - FK to Users
- receiverId (UUID) - FK to Users
- content (String)
- read (Boolean)
- createdAt (DateTime)

---

## 🔐 نظام الأمان

### المصادقة
- NextAuth.js مع JWT
- تشفير كلمات المرور
- جلسات آمنة

### التفويض
- Role-based Access Control (RBAC)
- Middleware للتحقق من الصلاحيات
- API Route Protection

### الحماية
- CSRF Protection
- XSS Prevention
- SQL Injection Prevention
- Rate Limiting

---

## 🚀 الميزات الرئيسية

### للمشتري
- ✅ البحث والتصفية المتقدمة
- ✅ سلة التسوق
- ✅ نظام الدفع
- ✅ تتبع الطلبات
- ✅ الأمنيات
- ✅ التقييمات والتعليقات
- ✅ نظام الرسائل
- ✅ الملف الشخصي

### للبائع
- ✅ إنشاء وإدارة الإعلانات
- ✅ إدارة الطلبات
- ✅ التحليلات والإحصائيات
- ✅ نظام التقييمات
- ✅ نظام الرسائل
- ✅ لوحة تحكم متقدمة

### للإدارة
- ✅ إدارة المستخدمين
- ✅ إدارة الفئات
- ✅ مراجعة الإعلانات
- ✅ التقارير والإحصائيات
- ✅ إدارة الشكاوى
- ✅ إدارة الإعدادات

---

## 📊 الإحصائيات

| الفئة | العدد |
|:---|:---|
| صفحات المشتري | 8 |
| صفحات البائع | 8 |
| صفحات الإدارة | 7 |
| مسارات API | 20+ |
| مكونات React | 10+ |
| خطوط الكود | 10,000+ |

---

## 🛠️ التقنيات المستخدمة

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons

### Backend
- Next.js API Routes
- Prisma ORM
- NextAuth.js
- PostgreSQL/MySQL

### Tools
- Git & GitHub
- Docker
- ESLint
- Prettier

---

## 📝 الملفات المهمة

- `README.md` - ملف التعريف
- `docs/API_GUIDE.md` - دليل API
- `docs/DEPLOYMENT.md` - دليل النشر
- `.env.example` - متغيرات البيئة
- `prisma/schema.prisma` - نموذج قاعدة البيانات

---

## 🔄 دورة التطوير

1. **التخطيط** - تحديد الميزات والمتطلبات
2. **التصميم** - تصميم الواجهات والقواعد
3. **التطوير** - بناء الميزات
4. **الاختبار** - اختبار الوظائف
5. **النشر** - نشر على الإنتاج
6. **المراقبة** - مراقبة الأداء

---

## 📞 الدعم

للحصول على الدعم أو الإبلاغ عن مشاكل، يرجى فتح issue على GitHub.

---

**آخر تحديث:** 2024-01-09
