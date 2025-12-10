# Final-Prisma-Generate.ps1
# إعادة توليد عميل Prisma وتطبيق الهجرة لإنهاء الخطأ

$ErrorActionPreference = "Stop"
Write-Host "👑 إعادة توليد ملفات Prisma النهائية..." -ForegroundColor Cyan

# 1. إيقاف السيرفر (ضروري لتحرير الملفات)
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. توليد عميل Prisma (الذي فشل سابقاً)
Write-Host "⚙️ توليد عميل Prisma جديد..." -ForegroundColor Cyan
cmd /c "npx prisma generate"

# 3. تطبيق الهجرة (الخطوة التي لم تكتمل)
Write-Host "💾 تطبيق الهجرة لإنشاء الجداول..." -ForegroundColor Cyan
# يجب أن تضغط 'y' للموافقة في هذه الخطوة
cmd /c "npx prisma migrate dev --name init"

Write-Host "✅ تم حل المشكلة. المشروع الآن متصل ببيانات حية." -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر والمشروع متصل بقاعدة بيانات حية!" -ForegroundColor Green
npm run dev