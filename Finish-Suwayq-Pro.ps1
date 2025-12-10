# Finish-Suwayq-Pro.ps1
# سكريبت التشطيب النهائي: تنظيف الستايلات، ضبط الإعدادات، والتشغيل

$ErrorActionPreference = "Stop"
Write-Host "✨ بدء تشطيب مشروع سُوَيق برو..." -ForegroundColor Cyan

$SrcDir = "src"

# -----------------------------------------------------------
# 1. تنظيف globals.css (لإزالة الوضع الليلي الافتراضي المزعج)
# -----------------------------------------------------------
Write-Host "🎨 تنظيف ملفات CSS لضمان دقة الألوان..." -ForegroundColor Yellow
$GlobalCssPath = "$SrcDir\app\globals.css"
$CssContent = @'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 255, 255, 255;
  --background-end-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
'@
[System.IO.File]::WriteAllText($GlobalCssPath, $CssContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 2. التأكد من إعدادات Tailwind (tailwind.config.ts)
# -----------------------------------------------------------
Write-Host "⚙️ ضبط إعدادات Tailwind لقراءة المجلدات الجديدة..." -ForegroundColor Yellow
$ConfigPath = "tailwind.config.ts"
$ConfigContent = @'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
'@
[System.IO.File]::WriteAllText($ConfigPath, $ConfigContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 3. التشغيل النهائي
# -----------------------------------------------------------
Write-Host "`n✅ تم الانتهاء من كل شيء! مشروعك جاهز 100%." -ForegroundColor Green
Write-Host "🚀 جاري تشغيل السيرفر الآن..." -ForegroundColor Cyan
Write-Host "👉 افتح المتصفح على: http://localhost:3000" -ForegroundColor Green

# تشغيل المشروع
npm run dev