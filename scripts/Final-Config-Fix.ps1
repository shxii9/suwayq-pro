# Final-Config-Fix.ps1
# تحويل ملف إعدادات Next.js من TS إلى MJS للتوافق مع النسخة المستقرة

$ErrorActionPreference = "Stop"
Write-Host "⚙️ إصلاح ملفات الإعدادات..." -ForegroundColor Cyan

# 1. حذف ملف الإعدادات غير المدعوم (next.config.ts)
if (Test-Path "next.config.ts") {
    Write-Host "🗑️ حذف next.config.ts (غير مدعوم في هذه النسخة)..." -ForegroundColor Yellow
    Remove-Item -Path "next.config.ts" -Force
}

# 2. إنشاء ملف إعدادات صحيح (next.config.mjs)
Write-Host "📝 إنشاء next.config.mjs الجديد..." -ForegroundColor Cyan
$ConfigContent = @'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
};

export default nextConfig;
'@
[System.IO.File]::WriteAllText("next.config.mjs", $ConfigContent, [System.Text.Encoding]::UTF8)

# 3. تنظيف الكاش مرة أخيرة لضمان قراءة الملف الجديد
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }

Write-Host "✅ تم الإصلاح! الإعدادات الآن صحيحة." -ForegroundColor Green
Write-Host "🚀 تشغيل المشروع..." -ForegroundColor Green

# 4. التشغيل
npm run dev