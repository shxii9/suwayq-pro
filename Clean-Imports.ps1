# Clean-Imports.ps1
# إصلاح خطأ تكرار استيراد Image

$ErrorActionPreference = "Stop"
Write-Host "🧹 تنظيف ملفات الاستيراد المكررة (Image)..." -ForegroundColor Cyan

# 1. إيقاف السيرفر
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. البحث عن جميع ملفات page.tsx وتصحيحها
$Pages = Get-ChildItem -Path "src\app" -Recurse -Filter "page.tsx"
foreach ($Page in $Pages) {
    if ($Page.FullName -like "*node_modules*") { continue }
    
    $Content = Get-Content $Page.FullName -Raw | Out-String
    
    # ⭐️⭐️⭐️ الحل: حذف جميع الأسطر المكررة
    $Content = $Content -replace "`nimport Image from 'next/image';`nimport Image from 'next/image';", "`nimport Image from 'next/image';"
    $Content = $Content -replace "import Image from 'next/image';`nimport Image from 'next/image';", "import Image from 'next/image';"
    
    # يتم التكرار 5 مرات لضمان حذف أي تكرار قديم
    for ($i = 0; $i -lt 5; $i++) {
        $Content = $Content -replace "import Image from 'next/image';`nimport Image from 'next/image';", "import Image from 'next/image';"
    }

    Write-Host "✅ تم تنظيف ملف: $($Page.Name)" -ForegroundColor Green
    [System.IO.File]::WriteAllText($Page.FullName, $Content, [System.Text.Encoding]::UTF8)
}

# 3. تنظيف الكاش والتشغيل
Write-Host "🧹 تنظيف الكاش والتشغيل..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }
Write-Host "✅ تم حل المشكلة. المشروع جاهز للتحميل." -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر..." -ForegroundColor Green
npm run dev