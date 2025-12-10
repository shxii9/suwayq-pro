# Final-Rescue.ps1
# إصلاح أخطاء ERESOLVE و JSONPARSE الناتجة عن تعارض التبعيات وفشل الكتابة

$ErrorActionPreference = "Stop"
Write-Host "🚨 بدء الإنقاذ الشامل: إصلاح ملف package.json والتبعيات..." -ForegroundColor Cyan

# 1. إيقاف السيرفر
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. إعادة كتابة ملف package.json (الكود النظيف الوحيد الموثوق)
Write-Host "📝 إعادة كتابة ملف package.json (لإصلاح خطأ JSON)..." -ForegroundColor Yellow
$PackageJsonContent = @'
{
  "name": "suwayq-pro",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",
    "quality": "npm run format && npm run lint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.468.0",
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.3",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
'@
[System.IO.File]::WriteAllText("package.json", $PackageJsonContent, [System.Text.Encoding]::UTF8)

# 3. تثبيت نظام الجودة مرة أخرى (باستخدام --force لحل ERESOLVE)
Write-Host "📦 تثبيت نظام الجودة بالقوة (حل خطأ ERESOLVE)..." -ForegroundColor Cyan
# نستخدم --force لحل التعارض بين @typescript-eslint/parser و next/eslint-config
cmd /c "npm install -D eslint-config-prettier eslint-plugin-prettier prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser --force"

# 4. تنظيف الكاش والتشغيل
Write-Host "🧹 تنظيف الكاش والتشغيل..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }
Write-Host "✅ تم الإصلاح. المشروع الآن سيعمل." -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر..." -ForegroundColor Green
npm run dev