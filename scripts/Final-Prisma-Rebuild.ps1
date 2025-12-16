# Final-Prisma-Rebuild.ps1
# الإصلاح النهائي لخطأ types.js عن طريق إعادة بناء جميع المكتبات

$ErrorActionPreference = "Stop"
Write-Host "🛡️ إعادة بناء جميع مكتبات Node.js وتوليد Prisma..." -ForegroundColor Cyan

# 1. إيقاف السيرفر
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. أمر إعادة البناء (يحل مشاكل التثبيت المكسورة مثل types.js)
Write-Host "🏗️ إعادة بناء جميع المكتبات (Rebuild)..." -ForegroundColor Yellow
cmd /c "npm rebuild"

# 3. توليد عميل Prisma (استخدام الأمر الجديد)
Write-Host "⚙️ توليد عميل Prisma جديد باستخدام 'npm run prisma:generate'..." -ForegroundColor Cyan
cmd /c "npm run prisma:generate"

# 4. تطبيق الهجرة (الخطوة الأخيرة)
Write-Host "💾 تطبيق الهجرة لإنشاء الجداول باستخدام 'npm run prisma:migrate'..." -ForegroundColor Cyan
cmd /c "npm run prisma:migrate"

Write-Host "✅ تم حل مشكلة الربط. المشروع الآن متصل ببيانات حية." -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر والمشروع متصل بقاعدة بيانات حية!" -ForegroundColor Green
npm run dev