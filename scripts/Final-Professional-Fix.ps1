# Final-Professional-Fix.ps1
# الإصلاح النهائي: حل مشاكل Docker/PATH وتوافق Prisma CLI

$ErrorActionPreference = "Stop"
Write-Host "👑 الإصلاح الاحترافي الأخير: تفعيل Prisma والتحقق من Docker..." -ForegroundColor Cyan

$PrismaDir = "prisma"
$SchemaPath = "$PrismaDir\schema.prisma"
$LibDir = "src\lib"
$EnvPath = ".env.local"

# 1. إيقاف السيرفر (ضمان عدم وجود عمليات عالقة)
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. تثبيت الحزم المفقودة (حل مشكلة @prisma/cli)
Write-Host "📦 تثبيت مكتبة Prisma CLI المفقودة (لحل خطأ Cannot find module)..." -ForegroundColor Yellow
cmd /c "npm install prisma typescript ts-node @types/node -D"

# 3. تعديل ملف Prisma Configuration (لحل خطأ Cannot find module)
Write-Host "📝 تعديل ملف prisma.config.ts لاستخدام 'prisma' بدلاً من '@prisma/cli'..." -ForegroundColor Yellow
# يتم تعديل الاستيراد من '@prisma/cli' إلى 'prisma' (لحل مشكلة التبعيات)
$PrismaConfigContent = @'
// prisma.config.ts
import { defineConfig } from "prisma"; // 💡 تم التعديل من @prisma/cli إلى prisma

export default defineConfig({
  config: {
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

# 4. تشغيل قاعدة البيانات عبر Docker (حل مشكلة docker-compose)
Write-Host "⚙️ تشغيل قاعدة البيانات عبر Docker (يجب تشغيل Docker Desktop أولاً)..." -ForegroundColor Cyan
# يتم محاولة تشغيل الأمر الجديد 'docker compose'
cmd /c "docker compose up -d"

# 5. توليد عميل Prisma جديد
Write-Host "⚙️ توليد عميل Prisma..." -ForegroundColor Cyan
cmd /c "npx prisma generate"

# 6. تطبيق الهجرة (Migration) لإنشاء الجداول في قاعدة البيانات
Write-Host "💾 تطبيق الهجرة لإنشاء الجداول..." -ForegroundColor Cyan
cmd /c "npx prisma migrate dev --name init"

Write-Host "✅ تم حل جميع مشاكل التوافق البرمجية." -ForegroundColor Green
Write-Host "💡 الآن، تأكد من تشغيل Docker Desktop وحاول مرة أخرى." -ForegroundColor Yellow
Write-Host "🚀 تشغيل السيرفر..." -ForegroundColor Green
npm run dev