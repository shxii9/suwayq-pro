# Vercel-Deployment-Setup.ps1
# تهيئة المشروع للنشر السحابي (Vercel) لضمان العمل الاحترافي بعد الرفع

$ErrorActionPreference = "Stop"
Write-Host "☁️ تجهيز المشروع للنشر السحابي على Vercel..." -ForegroundColor Cyan

# 1. إيقاف السيرفر
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. بناء ملف Vercel Configuration (vercel.json)
Write-Host "📝 إنشاء ملف vercel.json لإعدادات النشر..." -ForegroundColor Yellow
$VercelConfigContent = @'
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next",
      "config": {
        "maxLambdaSize": "20mb"
      }
    }
  ],
  "rewrites": [
    // هذا يضمن أن يتم توجيه كل مسارات API بشكل صحيح
    {
      "source": "/api/(.*)",
      "destination": "/api/"
    }
  ],
  // متغيرات البيئة ستُضاف يدوياً في إعدادات Vercel
  "env": {
    "NODE_ENV": "production",
    "DATABASE_URL": "@database_url" // يتم سحبها من Vercel Secrets
  }
}
'@
[System.IO.File]::WriteAllText("vercel.json", $VercelConfigContent, [System.Text.Encoding]::UTF8)


# 3. التأكد من ملف .gitignore (لتجاهل مجلدات النشر)
Write-Host "📝 التأكد من إعداد .gitignore..." -ForegroundColor Yellow
$GitIgnoreContent = Get-Content ".gitignore" -Raw | Out-String
if ($GitIgnoreContent -notlike "*.vercel*") {
    $GitIgnoreContent += "`n.vercel`n"
}
[System.IO.File]::WriteAllText(".gitignore", $GitIgnoreContent, [System.Text.Encoding]::UTF8)


# 4. التأكد من وجود Prisma في dependencies
Write-Host "📦 التأكد من وجود @prisma/client كـ dependency..." -ForegroundColor Yellow
cmd /c "npm install @prisma/client"


Write-Host "✅ تم تجهيز المشروع للنشر النهائي على Vercel." -ForegroundColor Green
Write-Host "💡 الخطوة التالية: ربط مشروعك بـ Vercel مباشرة!" -ForegroundColor Yellow
Write-Host "🚀 تشغيل السيرفر للمراجعة النهائية..." -ForegroundColor Green
npm run dev