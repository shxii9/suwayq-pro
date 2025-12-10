# Fix-Crash.ps1
# إصلاح خطأ Turbopack والتحويل للوضع المستقر

$ErrorActionPreference = "Stop"
Write-Host "🚑 بدء عملية الإنقاذ والتحويل للوضع المستقر..." -ForegroundColor Cyan

# 1. إيقاف العمليات السابقة
Write-Host "🛑 إيقاف Node.js..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. حذف الكاش المعطوب (السبب الرئيسي للخطأ)
Write-Host "🧹 تنظيف الذاكرة المؤقتة (.next)..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }

# 3. إعادة كتابة package.json لضمان عدم استخدام --turbo
Write-Host "⚙️ ضبط إعدادات التشغيل على الوضع المستقر (Webpack)..." -ForegroundColor Yellow

# محتوى package.json القياسي والنظيف
$PackageJson = @'
{
  "name": "suwayq-pro",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
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
# ملاحظة: قمنا بتثبيت نسخة next 14 المستقرة جداً في الكود أعلاه لتجنب مشاكل النسخة 16 التجريبية
[System.IO.File]::WriteAllText("package.json", $PackageJson, [System.Text.Encoding]::UTF8)

# 4. تحديث المكتبات للنسخة المستقرة
Write-Host "📦 تثبيت النسخة المستقرة (Next.js 14)..." -ForegroundColor Cyan
cmd /c "npm install"

Write-Host "✅ تم الإصلاح! جاري التشغيل في الوضع الآمن..." -ForegroundColor Green
Write-Host "👉 انتظر قليلاً حتى يفتح المتصفح..." -ForegroundColor Green

# 5. التشغيل
npm run dev