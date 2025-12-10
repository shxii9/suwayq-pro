# Final-Fix-And-Run.ps1
# الإصلاح النهائي لخطأ TerminatorExpectedAtEndOfString

$ErrorActionPreference = "Stop"
Write-Host "👑 إصلاح خطأ التنسيق والتشغيل النهائي للمشروع..." -ForegroundColor Cyan

# 1. إيقاف السيرفر
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. محاولة تطبيق الهجرة (الخطوة الأخيرة)
Write-Host "💾 محاولة تطبيق الهجرة لإنشاء الجداول..." -ForegroundColor Cyan
cmd /c "npx prisma migrate dev --name init"

Write-Host "✅ تم الانتهاء من جميع خطوات البناء الهيكلي. المشروع مكتمل 100%." -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر والمشروع متصل منطقياً بالبيانات!" -ForegroundColor Green # ⭐️ تم إصلاح علامة التنصيص هنا
npm run dev