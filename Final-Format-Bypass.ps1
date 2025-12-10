# Final-Format-Bypass.ps1
# الإصلاح النهائي لتنسيق PowerShell وتنفيذ أوامر Prisma

$ErrorActionPreference = "Stop"
Write-Host "🛡️ إصلاح خطأ تنسيق PowerShell وتنفيذ أوامر Prisma..." -ForegroundColor Cyan

# 1. إيقاف السيرفر
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. تحديث package.json بأوامر Prisma الصريحة (تنسيق PowerShell النظيف)
Write-Host "📝 تحديث package.json بأوامر Prisma..." -ForegroundColor Yellow
$PackageJsonPath = "package.json"
$PackageJsonContent = Get-Content $PackageJsonPath -Raw | Out-String

# البحث عن قسم الـ scripts الأصلي
$ScriptsPattern = '("dev": "next dev",\s+"build": "next build",\s+"start": "next start",\s+"lint": "next lint")'

# النسخة النظيفة الجديدة لأوامر Scripts (بدون فواصل زائدة أو تعليقات)
$NewScriptsWithPrisma = @(
    '"dev": "next dev"',
    '"build": "next build"',
    '"start": "next start"',
    '"lint": "next lint"',
    '"format": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\""',
    '"quality": "npm run format && npm run lint"',
    '"prisma:generate": "prisma generate"',
    '"prisma:migrate": "prisma migrate dev --name init"'
)

# استبدال قسم الـ scripts بالكامل
$PackageJsonContent = $PackageJsonContent -replace $ScriptsPattern, ($NewScriptsWithPrisma -join ",`n\t\t")

# إعادة كتابة الملف بترميز نظيف
[System.IO.File]::WriteAllText($PackageJsonPath, $PackageJsonContent, [System.Text.Encoding]::UTF8)

# 3. توليد عميل Prisma (استخدام الأمر الجديد)
Write-Host "⚙️ توليد عميل Prisma جديد باستخدام 'npm run prisma:generate'..." -ForegroundColor Cyan
cmd /c "npm run prisma:generate"

# 4. تطبيق الهجرة (الخطوة الأخيرة)
Write-Host "💾 تطبيق الهجرة لإنشاء الجداول باستخدام 'npm run prisma:migrate'..." -ForegroundColor Cyan
cmd /c "npm run prisma:migrate"

Write-Host "✅ تم تجاوز خطأ npx. الآن المشروع جاهز للتحميل النهائي." -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر والمشروع متصل بقاعدة بيانات حية!" -ForegroundColor Green
npm run dev