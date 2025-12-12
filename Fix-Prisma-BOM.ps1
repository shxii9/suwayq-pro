# Fix-Prisma-BOM.ps1
# هذا السكريبت يزيل الحرف الخفي (BOM) الذي يكسر Prisma على Vercel

$ErrorActionPreference = "Stop"
Write-Host "🧼 بدء عملية تنظيف ملف schema.prisma من الأحرف الخفية..." -ForegroundColor Cyan

$Path = "prisma/schema.prisma"

if (Test-Path $Path) {
    # 1. قراءة المحتوى الحالي
    $Content = [System.IO.File]::ReadAllText($Path)
    
    # 2. إعداد تشفير UTF-8 نظيف (بدون BOM)
    $Utf8NoBom = New-Object System.Text.UTF8Encoding $false
    
    # 3. إعادة كتابة الملف بالتشفير النظيف
    [System.IO.File]::WriteAllText($Path, $Content, $Utf8NoBom)
    
    Write-Host "✅ تم تنظيف الملف بنجاح." -ForegroundColor Green
    
    # 4. الرفع الفوري للإصلاح
    Write-Host "☁️ جاري رفع الإصلاح..." -ForegroundColor Yellow
    git add prisma/schema.prisma
    git commit -m "fix: Remove BOM character from schema.prisma causing P1012"
    git push origin master
    
    Write-Host "🚀 تم الرفع! Vercel سيعمل الآن." -ForegroundColor Green
} else {
    Write-Host "❌ الملف غير موجود!" -ForegroundColor Red
}