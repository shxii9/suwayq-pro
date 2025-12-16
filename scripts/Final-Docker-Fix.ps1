# Final-Docker-Fix.ps1
# إصلاح خطأ المسار المفقود وإنشاء مجلد Prisma قبل البدء

$ErrorActionPreference = "Stop"
Write-Host "🐳 إصلاح خطأ المسار وإعادة إعداد PostgreSQL عبر Docker..." -ForegroundColor Cyan

$PrismaDir = "prisma" # ⭐️ المجلد المفقود
$AppDir = "src\app"
$LibDir = "src\lib"
$SchemaPath = "$PrismaDir\schema.prisma"
$EnvPath = ".env.local"

# 1. إيقاف السيرفر وتنظيف الكاش
Write-Host "🛑 إيقاف السيرفر وتنظيف الكاش..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }

# 2. إنشاء مجلد Prisma (الحل)
Write-Host "📂 إنشاء مجلد Prisma المفقود..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $PrismaDir | Out-Null
if (-not (Test-Path $LibDir)) { New-Item -ItemType Directory -Force -Path $LibDir | Out-Null }


# 3. بناء ملف Docker-Compose (لتشغيل قاعدة البيانات)
Write-Host "📝 بناء ملف docker-compose.yml..." -ForegroundColor Yellow
$DockerComposeContent = @'
# docker-compose.yml
# لتشغيل قاعدة بيانات PostgreSQL معزولة للمشروع.
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: suwayq_user
      POSTGRES_PASSWORD: 123456
      POSTGRES_DB: suwayq_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
'@
[System.IO.File]::WriteAllText("docker-compose.yml", $DockerComposeContent, [System.Text.Encoding]::UTF8)

# 4. تحديث ملف متغيرات البيئة (.env.local)
Write-Host "📝 تحديث .env.local لربطه بـ Docker..." -ForegroundColor Yellow
$EnvContent = Get-Content $EnvPath -Raw | Out-String
$NewDatabaseUrl = 'DATABASE_URL="postgresql://suwayq_user:123456@localhost:5432/suwayq_db"'
$EnvContent = $EnvContent -replace 'DATABASE_URL="[^"]*"', $NewDatabaseUrl
[System.IO.File]::WriteAllText($EnvPath, $EnvContent, [System.Text.Encoding]::UTF8)

# 5. بناء هيكل قاعدة البيانات (schema.prisma)
Write-Host "📜 بناء ملف schema.prisma (جداول المستخدمين والإعلانات)..." -ForegroundColor Yellow

$SchemaContent = @'
// schema.prisma
// هذا الملف يحدد هيكل قاعدة البيانات الخاصة بك (جداولها وعلاقاتها).

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// -----------------------------------------------------------
// 1. جدول المستخدمين (User)
// -----------------------------------------------------------
model User {
  id              String       @id @default(cuid())
  email           String       @unique
  password        String
  name            String?
  role            Role         @default(USER)
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  
  listings        Listing[]
  reportsFiled    Report[]     @relation("FiledReports")
  reportsTargeted Report[]     @relation("TargetedReports")
}

// -----------------------------------------------------------
// 2. جدول الإعلانات (Listing)
// -----------------------------------------------------------
model Listing {
  id              String    @id @default(cuid())
  title           String
  description     String?
  price           Float
  location        String?
  images          String[]
  status          ListingStatus @default(PENDING)
  
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  
  reports         Report[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

// -----------------------------------------------------------
// 3. جدول البلاغات (Report)
// -----------------------------------------------------------
model Report {
  id              String    @id @default(cuid())
  reason          String
  isResolved      Boolean   @default(false)
  
  listingId       String
  listing         Listing   @relation(fields: [listingId], references: [id])

  reporterId      String
  reporter        User      @relation("FiledReports", fields: [reporterId], references: [id])

  targetUserId    String
  targetUser      User      @relation("TargetedReports", fields: [targetUserId], references: [id])
  
  createdAt       DateTime  @default(now())
}


// الأنواع (Enums)
enum Role {
  USER
  ADMIN
}

enum ListingStatus {
  PENDING
  ACTIVE
  REJECTED
  EXPIRED
}
'@
[System.IO.File]::WriteAllText($SchemaPath, $SchemaContent, [System.Text.Encoding]::UTF8)


# 6. بناء ملف جسر اتصال قاعدة البيانات (db.ts)
Write-Host "📝 بناء جسر اتصال قاعدة البيانات (db.ts)..." -ForegroundColor Yellow
$DbTsContent = @'
// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
'@
[System.IO.File]::WriteAllText("$LibDir\db.ts", $DbTsContent, [System.Text.Encoding]::UTF8)


# 7. تشغيل قاعدة البيانات عبر Docker (يجب أن يكون Docker Desktop يعمل)
Write-Host "⚙️ تشغيل قاعدة البيانات عبر Docker... (يتطلب عمل Docker Desktop)" -ForegroundColor Cyan
cmd /c "docker-compose up -d"

# 8. توليد عميل Prisma جديد
Write-Host "⚙️ توليد عميل Prisma..." -ForegroundColor Cyan
cmd /c "npx prisma generate"

# 9. تطبيق الهجرة (Migration) لإنشاء الجداول في قاعدة البيانات
Write-Host "💾 تطبيق الهجرة لإنشاء الجداول..." -ForegroundColor Cyan
cmd /c "npx prisma migrate dev --name init --skip-seed"

Write-Host "✅ تم الإعداد بنجاح. المشروع جاهز للعمل مع قاعدة بيانات احترافية." -ForegroundColor Green
Write-Host "💡 يمكنك الآن تشغيل السيرفر بأمان: npm run dev" -ForegroundColor Yellow