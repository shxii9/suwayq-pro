# Install-Missing-Deps.ps1
# إعادة تثبيت Autoprefixer و PostCSS لحل خطأ Cannot find module

$ErrorActionPreference = "Stop"
Write-Host "🔧 إعادة تثبيت Autoprefixer و PostCSS..." -ForegroundColor Cyan

# 1. إيقاف السيرفر
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. إعادة تثبيت الحزم المطلوبة (بشكل صريح)
Write-Host "📦 تثبيت autoprefixer و postcss..." -ForegroundColor Cyan
cmd /c "npm install -D autoprefixer postcss"

# 3. تنظيف الكاش (لإجبار Next.js على قراءة التبعيات الجديدة)
Write-Host "🧹 تنظيف الكاش (.next)..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }

Write-Host "✅ تم تثبيت التبعيات المفقودة. المشروع جاهز للتشغيل." -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر..." -ForegroundColor Green

# 4. التشغيل
npm run dev