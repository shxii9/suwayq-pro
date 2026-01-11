# 🚀 دليل النشر - Suwayq Pro

هذا الدليل يوضح كيفية نشر تطبيق Suwayq Pro على منصات مختلفة.

## 📋 المتطلبات

- Node.js 20+
- pnpm 8+
- حساب على منصة النشر (Vercel, Render, Railway, إلخ)
- قاعدة بيانات PostgreSQL

---

## 🌐 النشر على Vercel

### الخطوات:

1. **إنشاء حساب على Vercel**
   - اذهب إلى [vercel.com](https://vercel.com)
   - سجل باستخدام حسابك على GitHub

2. **ربط المستودع**
   ```bash
   # في لوحة تحكم Vercel
   - اختر "New Project"
   - اختر مستودع GitHub الخاص بك
   - اختر "suwayq-pro"
   ```

3. **إعداد متغيرات البيئة**
   ```
   DATABASE_URL=your_postgresql_url
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
   ```

4. **النشر**
   - اضغط على "Deploy"
   - سينشر التطبيق تلقائياً

---

## 🎯 النشر على Render

### الخطوات:

1. **إنشاء حساب على Render**
   - اذهب إلى [render.com](https://render.com)
   - سجل باستخدام حسابك على GitHub

2. **إنشاء Web Service جديد**
   ```bash
   - اختر "New +"
   - اختر "Web Service"
   - اختر المستودع
   ```

3. **إعدادات البناء**
   ```
   Build Command: npm run build
   Start Command: npm start
   ```

4. **متغيرات البيئة**
   - أضف جميع متغيرات البيئة في قسم "Environment"

---

## 🐳 النشر باستخدام Docker

### Dockerfile:

```dockerfile
# المرحلة الأولى: البناء
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

# المرحلة الثانية: التشغيل
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

### البناء والتشغيل:

```bash
# بناء الصورة
docker build -t suwayq-pro .

# تشغيل الحاوية
docker run -p 3000:3000 \
  -e DATABASE_URL="your_db_url" \
  -e NEXTAUTH_SECRET="your_secret" \
  suwayq-pro
```

---

## 🔧 قائمة التحقق قبل النشر

- [ ] تحديث جميع متغيرات البيئة
- [ ] تشغيل الاختبارات بنجاح
- [ ] فحص الأخطاء في وحدة التحكم
- [ ] التحقق من أن قاعدة البيانات تعمل
- [ ] تحديث رقم الإصدار في package.json
- [ ] إنشاء commit نهائي
- [ ] إنشاء tag للإصدار

---

## 📊 المراقبة بعد النشر

### تحقق من:
1. استجابة التطبيق
2. سجلات الأخطاء
3. أداء قاعدة البيانات
4. استخدام الموارد

### أدوات مفيدة:
- [Sentry](https://sentry.io/) - لتتبع الأخطاء
- [LogRocket](https://logrocket.com/) - لتسجيل الجلسات
- [New Relic](https://newrelic.com/) - للمراقبة

---

## 🔐 الأمان في الإنتاج

- ✅ استخدم HTTPS فقط
- ✅ قم بتعطيل Debug Mode
- ✅ استخدم متغيرات بيئة آمنة
- ✅ قم بتحديث التبعيات بانتظام
- ✅ استخدم WAF (Web Application Firewall)
- ✅ قم بعمل نسخ احتياطية منتظمة

---

## 🆘 استكشاف الأخطاء

### المشكلة: التطبيق لا يبدأ
```bash
# تحقق من السجلات
docker logs container_name

# تحقق من متغيرات البيئة
echo $DATABASE_URL
```

### المشكلة: قاعدة البيانات لا تتصل
```bash
# اختبر الاتصال
psql $DATABASE_URL -c "SELECT 1"
```

### المشكلة: أداء بطيء
```bash
# تحقق من استخدام الموارد
docker stats
```

