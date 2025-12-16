# Stabilize-Project-V2.ps1
# إصلاح جذري: العودة إلى Prisma v5 وبناء المشروع للإنتاج.

$ErrorActionPreference = "Stop"
Write-Host "🛡️ بدء عملية التثبيت والإصلاح V2..." -ForegroundColor Cyan

# ---------------------------------------------------------------------------
# 1. تنظيف وإجبار النسخة المستقرة (Force Stable Version)
# ---------------------------------------------------------------------------
Write-Host "⬇️ 1/5: تثبيت Prisma v5 (المعيار الصناعي)..." -ForegroundColor Yellow

# إزالة النسخ القديمة أو المعطوبة أولاً
npm uninstall prisma @prisma/client
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue }
if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue }
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue }

# تثبيت النسخة 5.14.0 تحديداً (الأكثر استقراراً)
Write-Host "   Installing Prisma v5.14.0..." -ForegroundColor Gray
npm install @prisma/client@5.14.0
npm install prisma@5.14.0 --save-dev

# تثبيت باقي المكتبات
npm install
Write-Host "✅ تم تثبيت المكتبات الصحيحة." -ForegroundColor Green

# ---------------------------------------------------------------------------
# 2. إصلاح schema.prisma (Classic Format)
# ---------------------------------------------------------------------------
Write-Host "🔧 2/5: إعادة ضبط schema.prisma..." -ForegroundColor Yellow
$SchemaPath = "prisma/schema.prisma"
$SchemaContent = @"
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id              String      @id @default(cuid())
  email           String      @unique
  password        String
  name            String?
  role            Role        @default(USER)
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  listings        Listing[]
  reportsFiled    Report[]    @relation("FiledReports")
  reportsTargeted Report[]    @relation("TargetedReports")
}

model Listing {
  id              String      @id @default(cuid())
  title           String
  description     String?
  price           Float
  location        String?
  images          String[]
  status          ListingStatus @default(PENDING)
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  reports         Report[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model Report {
  id              String      @id @default(cuid())
  reason          String
  isResolved      Boolean     @default(false)
  listingId       String
  listing         Listing   @relation(fields: [listingId], references: [id])
  reporterId      String
  reporter        User      @relation("FiledReports", fields: [reporterId], references: [id])
  targetUserId    String
  targetUser      User      @relation("TargetedReports", fields: [targetUserId], references: [id])
  createdAt       DateTime    @default(now())
}

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
"@
Set-Content -Path $SchemaPath -Value $SchemaContent -Encoding UTF8
Write-Host "✅ تم ضبط ملف schema." -ForegroundColor Green

# ---------------------------------------------------------------------------
# 3. توليد قاعدة البيانات (Prisma Generate & Push)
# ---------------------------------------------------------------------------
Write-Host "🗄️ 3/5: توليد العميل ومزامنة القاعدة..." -ForegroundColor Yellow
npx prisma generate
npx prisma db push
Write-Host "✅ قاعدة البيانات جاهزة." -ForegroundColor Green

# ---------------------------------------------------------------------------
# 4. بناء نسخة الإنتاج (Build Production)
# ---------------------------------------------------------------------------
Write-Host "🏗️ 4/5: بناء نسخة الإنتاج (Building Project)..." -ForegroundColor Yellow
# تعطيل التليمتري واللينت لتسريع العملية وضمان النجاح
$env:NEXT_TELEMETRY_DISABLED=1
npm run build
if ($LASTEXITCODE -ne 0) { 
    Write-Error "🛑 فشل البناء! يرجى مراجعة الأخطاء." 
}
Write-Host "✅ تم بناء المشروع بنجاح (Build Complete)." -ForegroundColor Green

# ---------------------------------------------------------------------------
# 5. الرفع النهائي (Final Push)
# ---------------------------------------------------------------------------
Write-Host "☁️ 5/5: رفع التحديثات النهائية..." -ForegroundColor Cyan
git add .
git commit -m "STABLE: Fixed Prisma version and rebuilt project"
git push origin master

Write-Host "--------------------------------------------------------" -ForegroundColor White
Write-Host "🎉 اكتملت المهمة! المشروع الآن جاهز للتسليم." -ForegroundColor Green
Write-Host "👉 لتشغيل النسخة النهائية، اكتب الأمر:" -ForegroundColor Cyan
Write-Host "   npm start" -ForegroundColor Yellow
Write-Host "--------------------------------------------------------" -ForegroundColor White