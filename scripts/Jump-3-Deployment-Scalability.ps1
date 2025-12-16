# Jump-3-Deployment-Scalability.ps1
# بناء ملفات النشر (Docker, ENV) لضمان قابلية التوسع

$ErrorActionPreference = "Stop"
Write-Host "☁️ تهيئة ملفات النشر وقابلية التوسع..." -ForegroundColor Cyan

# 1. بناء ملفات Environment Variables (.env)
Write-Host "📝 إنشاء ملفات متغيرات البيئة (.env)..." -ForegroundColor Yellow
$EnvContent = @'
# ملف متغيرات البيئة (لتخزين مفاتيح API الخاصة وقاعدة البيانات)

# إعدادات قاعدة البيانات (مثال: PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/suwayq_db"
DATABASE_USER="suwayq_user"

# مفتاح التشفير (يستخدم في الـ Authentication)
NEXTAUTH_SECRET="your_very_secret_key_here_for_auth"

# مفتاح الدفع (للتجارة الإلكترونية)
PAYMENT_GATEWAY_API_KEY="pk_test_abcdef123456"

# متغير يحدد وضع المشروع (تطوير/إنتاج)
NODE_ENV=development
'@
[System.IO.File]::WriteAllText(".env.local", $EnvContent, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText(".env", $EnvContent, [System.Text.Encoding]::UTF8)

# 2. بناء ملف Dockerfile (للنشر على السيرفرات السحابية)
Write-Host "📝 إنشاء Dockerfile (للنشر السحابي)..." -ForegroundColor Yellow
$DockerContent = @'
# Dockerfile: ملف تهيئة للنشر السحابي (Docker)

# المرحلة الأولى: بناء التطبيق
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# المرحلة الثانية: التشغيل النهائي
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# نسخ ملفات التشغيل الأساسية فقط
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# تهيئة المنفذ
EXPOSE 3000

# أمر التشغيل (Start)
CMD ["npm", "start"]
'@
[System.IO.File]::WriteAllText("Dockerfile", $DockerContent, [System.Text.Encoding]::UTF8)

# 3. بناء ملف Git Ignore (لإدارة الكود)
Write-Host "📝 تحديث ملف Git Ignore (لتجاهل الملفات الكبيرة)..." -ForegroundColor Yellow
$GitIgnoreContent = @'
# Git Ignore - الملفات التي يجب تجاهلها عند مشاركة الكود

# Next.js specific
.next/
/out/
/dist/

# Dependencies
/node_modules/
.pnp
.pnp.js

# Environments
.env.local
.env.development.local
.env.production.local

# Logs
npm-debug.log*
.vercel/
npm-error.log*
'#
[System.IO.File]::WriteAllText(".gitignore", $GitIgnoreContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم تهيئة المشروع بالكامل للنشر والمقارنة!" -ForegroundColor Green