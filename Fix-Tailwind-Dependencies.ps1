# Fix-Tailwind-Dependencies.ps1
# إنشاء ملفات إعدادات Tailwind المفقودة وإعادة التثبيت

$ErrorActionPreference = "Stop"
Write-Host "🎨 إصلاح مشاكل Tailwind CSS..." -ForegroundColor Cyan

# 1. إيقاف السيرفر وحذف الكاش
Write-Host "🛑 إيقاف السيرفر وتنظيف الكاش..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }

# 2. إنشاء ملف postcss.config.js (القطعة المفقودة)
Write-Host "📝 إنشاء ملف postcss.config.js..." -ForegroundColor Yellow
$PostCssContent = @'
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
'@
[System.IO.File]::WriteAllText("postcss.config.js", $PostCssContent, [System.Text.Encoding]::UTF8)

# 3. إنشاء ملف tailwind.config.ts (للتأكد من المسارات)
Write-Host "📝 إنشاء ملف tailwind.config.ts..." -ForegroundColor Yellow
$TailwindContent = @'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
'@
[System.IO.File]::WriteAllText("tailwind.config.ts", $TailwindContent, [System.Text.Encoding]::UTF8)

# 4. تثبيت شامل للمكتبات
Write-Host "📦 إعادة تثبيت المكتبات لضمان وجود PostCSS..." -ForegroundColor Cyan
cmd /c "npm install -D tailwindcss postcss autoprefixer"

Write-Host "✅ تم إصلاح مشكلة Tailwind CSS." -ForegroundColor Green
Write-Host "🚀 تشغيل المشروع..." -ForegroundColor Green

# 5. التشغيل
npm run dev