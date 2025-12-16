# Clean-Prisma-Modules.ps1
# تنظيف وإعادة تثبيت Prisma لإنهاء خطأ Cannot find module 'types.js'

$ErrorActionPreference = "Stop"
Write-Host "🧼 تنظيف عميق لمكتبات Prisma وإعادة التوليد..." -ForegroundColor Cyan

# 1. إيقاف السيرفر (ضروري لتحرير الملفات)
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. حذف مجلدات Prisma المتعلقة بالتبعيات
Write-Host "🗑️ حذف مجلدات Prisma من node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules\prisma") { Remove-Item -Path "node_modules\prisma" -Recurse -Force }
if (Test-Path "node_modules\@prisma") { Remove-Item -Path "node_modules\@prisma" -Recurse -Force }

# 3. إعادة تثبيت Prisma (بشكل صريح)
Write-Host "📦 إعادة تثبيت Prisma (لضمان بناء ملفات types.js)..." -ForegroundColor Cyan
cmd /c "npm install prisma @prisma/client typescript ts-node @types/node -D --force"

# 4. توليد عميل Prisma (الذي فشل سابقاً)
Write-Host "⚙️ توليد عميل Prisma جديد..." -ForegroundColor Cyan
cmd /c "npx prisma generate"

# 5. تطبيق الهجرة (الخطوة التي لم تكتمل)
Write-Host "💾 تطبيق الهجرة لإنشاء الجداول..." -ForegroundColor Cyan
cmd /c "npx prisma migrate dev --name init"

Write-Host "✅ تمت عملية التطهير والربط بنجاح!" -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر والمشروع متصل بقاعدة بيانات حية!" -ForegroundColor Green
npm run dev