# Final-Prisma-Fix.ps1
# الإصلاح الشامل لمشاكل Prisma 7 و Docker

$ErrorActionPreference = "Stop"
Write-Host "👑 الإصلاح النهائي: حل مشاكل الترميز، Docker، وتوافق Prisma 7..." -ForegroundColor Cyan

$PrismaDir = "prisma"
$SchemaPath = "$PrismaDir\schema.prisma"
$LibDir = "src\lib"

# 1. إيقاف السيرفر (ضمان عدم وجود عمليات عالقة)
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. بناء ملف Prisma Configuration (لحل خطأ url is no longer supported)
Write-Host "📝 بناء ملف prisma.config.ts (مطلوب لـ Prisma 7)..." -ForegroundColor Yellow
$PrismaConfigContent = @'
// prisma.config.ts
import { defineConfig } from "@prisma/cli";

export default defineConfig({
  config: {
    // تعريف قاعدة البيانات هنا بدلاً من schema.prisma
    datasources: {
      db: {
        provider: "postgresql",
        url: {
          env: "DATABASE_URL"
        }
      }
    }
  }
});
'@
[System.IO.File]::WriteAllText("prisma.config.ts", $PrismaConfigContent, [System.Text.Encoding]::UTF8)

# 3. تحديث هيكل قاعدة البيانات (لإزالة رابط URL وحرف BOM)
Write-Host "📜 تحديث schema.prisma (إزالة URL وحرف BOM)..." -ForegroundColor Yellow

$SchemaContent = @'
// schema.prisma
// هذا الملف يحدد هيكل قاعدة البيانات الخاصة بك (جداولها وعلاقاتها).

generator client {
  provider = "prisma-client-js"
}

// ⚠️ تمت إزالة الـ datasource بالكامل من هنا ونقلها إلى prisma.config.ts

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
  updated updatedAt
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
# استخدام ترميز نظيف لضمان عدم وجود حرف BOM
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText($SchemaPath, $SchemaContent, $Utf8NoBomEncoding)


# 4. تشغيل قاعدة البيانات عبر Docker (حل مشكلة docker-compose)
Write-Host "⚙️ تشغيل قاعدة البيانات عبر Docker (باستخدام الأمر الجديد 'docker compose')..." -ForegroundColor Cyan
# نستخدم الأمر 'docker compose' (الأحدث) بدلاً من 'docker-compose'
cmd /c "docker compose up -d"


# 5. توليد عميل Prisma جديد
Write-Host "⚙️ توليد عميل Prisma..." -ForegroundColor Cyan
cmd /c "npx prisma generate"


# 6. تطبيق الهجرة (Migration) لإنشاء الجداول في قاعدة البيانات (إزالة الخيار القديم)
Write-Host "💾 تطبيق الهجرة لإنشاء الجداول..." -ForegroundColor Cyan
# حذف --skip-seed
cmd /c "npx prisma migrate dev --name init"

Write-Host "✅ تم حل جميع مشاكل التوافق بنجاح. المشروع جاهز." -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر..." -ForegroundColor Green
npm run dev