# 📚 دليل API - Suwayq Pro

هذا الدليل يوضح جميع نقاط نهاية (Endpoints) API المتاحة في تطبيق Suwayq Pro.

## 🔐 المصادقة

جميع الطلبات التي تتطلب مصادقة يجب أن تتضمن رمز JWT في رأس الطلب:

```
Authorization: Bearer <token>
```

---

## 📋 الإعلانات (Listings)

### الحصول على جميع الإعلانات
```
GET /api/listings
```

**المعاملات:**
- `category` (اختياري): تصفية حسب الفئة

**مثال:**
```bash
curl http://localhost:3000/api/listings?category=CARS
```

**الرد:**
```json
[
  {
    "id": "clx...",
    "title": "سيارة تويوتا 2020",
    "description": "سيارة بحالة ممتازة",
    "price": 5000,
    "category": "CARS",
    "status": "ACTIVE",
    "userId": "clx...",
    "createdAt": "2024-01-11T10:00:00Z"
  }
]
```

### الحصول على إعلان واحد
```
GET /api/listings/[id]
```

### إنشاء إعلان جديد
```
POST /api/listings/create
```

**المتطلبات:**
- مصادقة مطلوبة

**البيانات:**
```json
{
  "title": "سيارة تويوتا 2020",
  "description": "سيارة بحالة ممتازة",
  "price": 5000,
  "category": "CARS"
}
```

### تحديث إعلان
```
PUT /api/listings/update
```

**المتطلبات:**
- مصادقة مطلوبة

**البيانات:**
```json
{
  "id": "clx...",
  "title": "سيارة تويوتا 2021",
  "price": 5500
}
```

### حذف إعلان
```
DELETE /api/listings/delete
```

**المتطلبات:**
- مصادقة مطلوبة

**البيانات:**
```json
{
  "id": "clx..."
}
```

---

## 👤 المستخدمون (Users)

### تسجيل مستخدم جديد
```
POST /api/auth/register
```

**البيانات:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "أحمد محمد"
}
```

### تسجيل الدخول
```
POST /api/auth/login
```

**البيانات:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**الرد:**
```json
{
  "success": true,
  "user": {
    "id": "clx...",
    "email": "user@example.com",
    "name": "أحمد محمد",
    "role": "USER"
  }
}
```

### الحصول على جلسة المستخدم
```
GET /api/auth/session
```

**المتطلبات:**
- مصادقة مطلوبة

---

## 📊 لوحة التحكم (Dashboard)

### الحصول على إحصائيات البائع
```
GET /api/seller/stats
```

**المتطلبات:**
- مصادقة مطلوبة

**الرد:**
```json
{
  "totalSales": 150000,
  "totalListings": 25,
  "activeListings": 20,
  "averageRating": 4.5,
  "totalReviews": 45
}
```

### الحصول على إحصائيات لوحة التحكم
```
GET /api/dashboard/stats
```

**المتطلبات:**
- مصادقة مطلوبة

---

## 💬 التغذية الراجعة (Feedback)

### إرسال تغذية راجعة
```
POST /api/feedback
```

**المتطلبات:**
- مصادقة مطلوبة

**البيانات:**
```json
{
  "type": "bug",
  "category": "ui_ux",
  "title": "مشكلة في واجهة البحث",
  "description": "البحث لا يعمل بشكل صحيح",
  "rating": 3,
  "page": "/listings"
}
```

---

## ⭐ الأمنيات (Wishlist)

### إضافة إلى الأمنيات
```
POST /api/wishlist
```

**المتطلبات:**
- مصادقة مطلوبة

**البيانات:**
```json
{
  "listingId": "clx..."
}
```

### الحصول على الأمنيات
```
GET /api/wishlist
```

**المتطلبات:**
- مصادقة مطلوبة

---

## 🔔 الإشعارات (Notifications)

### الحصول على الإشعارات
```
GET /api/notifications
```

**المتطلبات:**
- مصادقة مطلوبة

---

## ❌ رموز الأخطاء

| الكود | المعنى |
|:---:|:---|
| 200 | نجح الطلب |
| 201 | تم إنشاء مورد جديد |
| 400 | طلب غير صحيح |
| 401 | غير مصرح - يرجى تسجيل الدخول |
| 403 | لا توجد صلاحيات كافية |
| 404 | المورد غير موجود |
| 500 | خطأ في الخادم |

---

## 📝 ملاحظات مهمة

1. جميع الطلبات يجب أن تكون بصيغة JSON
2. يجب تضمين رأس `Content-Type: application/json`
3. الرموز (Tokens) تنتهي صلاحيتها بعد 30 يوماً
4. استخدم HTTPS في الإنتاج

---

## 🧪 اختبار API

يمكنك استخدام أدوات مثل:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [cURL](https://curl.se/)

