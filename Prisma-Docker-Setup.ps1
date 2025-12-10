# Prisma-Docker-Setup.ps1
# تفعيل PostgreSQL باستخدام Docker-Compose

$ErrorActionPreference = "Stop"
Write-Host "🐳 بدء إعداد PostgreSQL عبر Docker..." -ForegroundColor Cyan

$AppDir = "src\app"
$LibDir = "src\lib"
$SchemaPath = "prisma\schema.prisma"
$EnvPath = ".env.local"

# 1. إيقاف السيرفر وتنظيف الكاش
Write-Host "🛑 إيقاف السيرفر وتنظيف الكاش..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }

# 2. بناء ملف Docker-Compose (لتشغيل قاعدة البيانات)
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

# 3. تعديل ملف متغيرات البيئة (.env.local)
Write-Host "📝 تحديث .env.local لربطه بـ Docker..." -ForegroundColor Yellow
$EnvContent = Get-Content $EnvPath -Raw | Out-String

$NewDatabaseUrl = 'DATABASE_URL="postgresql://suwayq_user:123456@localhost:5432/suwayq_db"'

# استبدال أي رابط قديم
$EnvContent = $EnvContent -replace 'DATABASE_URL="[^"]*"', $NewDatabaseUrl

# إعادة كتابة الملف
[System.IO.File]::WriteAllText($EnvPath, $EnvContent, [System.Text.Encoding]::UTF8)

# 4. تحديث هيكل Prisma (schema.prisma) لـ PostgreSQL
Write-Host "📜 تحديث schema.prisma لاستخدام provider = postgresql..." -ForegroundColor Yellow
$SchemaContent = Get-Content $SchemaPath -Raw | Out-String

# استبدال SQLite بـ PostgreSQL (إذا تم استخدام SQLite سابقا)
$SchemaContent = $SchemaContent -replace 'provider = "sqlite"', 'provider = "postgresql"'

[System.IO.File]::WriteAllText($SchemaPath, $SchemaContent, [System.Text.Encoding]::UTF8)

# 5. تشغيل قاعدة البيانات عبر Docker
Write-Host "⚙️ تشغيل قاعدة البيانات عبر Docker... (قد يستغرق وقتاً طويلاً في أول تشغيل)" -ForegroundColor Cyan
cmd /c "docker-compose up -d"

# 6. توليد عميل Prisma جديد
Write-Host "⚙️ توليد عميل Prisma..." -ForegroundColor Cyan
cmd /c "npx prisma generate"

# 7. تطبيق الهجرة (Migration) لإنشاء الجداول في قاعدة البيانات
Write-Host "💾 تطبيق الهجرة لإنشاء الجداول..." -ForegroundColor Cyan
cmd /c "npx prisma migrate dev --name init --skip-seed"

Write-Host "✅ تم الإعداد بنجاح. المشروع جاهز للعمل مع قاعدة بيانات احترافية." -ForegroundColor Green
Write-Host "💡 يمكنك الآن تشغيل السيرفر بأمان: npm run dev" -ForegroundColor Yellow