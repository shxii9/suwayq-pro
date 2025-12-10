# Clean-JSON.ps1
# إصلاح خطأ Unexpected token في ملف package.json
# يقوم بكتابة الملف بترميز UTF-8 نظيف بدون BOM

$ErrorActionPreference = "Stop"
Write-Host "🧹 تنظيف ملف package.json من الرموز المخفية..." -ForegroundColor Cyan

# محتوى الملف النظيف
$Content = @'
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

# حذف الملف القديم
if (Test-Path "package.json") { Remove-Item "package.json" -Force }

# كتابة الملف الجديد بترميز UTF-8 NoBOM (الحل السحري)
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText("$PWD\package.json", $Content, $Utf8NoBomEncoding)

Write-Host "✅ تم تنظيف الملف بنجاح!" -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر..." -ForegroundColor Green

# تشغيل السيرفر
npm run dev