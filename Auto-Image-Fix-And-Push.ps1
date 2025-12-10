# Auto-Image-Fix-And-Push.ps1
# يقوم بحذف سطر 'import Image from 'next/image';' المكرر في جميع الملفات المتضررة

$ErrorActionPreference = "Stop"
Write-Host "👑 بدء عملية المسح التلقائي لأخطاء التكرار (Image Import)..." -ForegroundColor Cyan

# قائمة بجميع الملفات المتضررة التي أبلغ عنها Vercel
$FilesToFix = @(
    "src/app/admin/listings/page.tsx",
    "src/app/admin/page.tsx",
    "src/app/admin/users/page.tsx",
    "src/app/dashboard/page.tsx",
    "src/app/messages/page.tsx"
)

$SearchPattern = "import Image from 'next/image';"
$FoundIssues = $false

foreach ($File in $FilesToFix) {
    Write-Host "--- معالجة الملف: $File" -ForegroundColor Yellow

    if (-not (Test-Path $File)) {
        Write-Host "⚠️ الملف غير موجود. تخطي." -ForegroundColor Red
        continue
    }

    $Content = Get-Content $File -Raw
    $Lines = $Content -split "`n"
    
    $Count = $Lines | Where-Object { $_.Trim() -eq $SearchPattern } | Measure-Object | Select-Object -ExpandProperty Count

    if ($Count -le 1) {
        Write-Host "✅ لا يوجد تكرار في هذا الملف." -ForegroundColor Green
    } else {
        Write-Host "❌ تم العثور على $Count تكرارات. يتم تنظيف الملف..." -ForegroundColor Red
        $FoundIssues = $true
        
        # حذف جميع التكرارات ماعدا الأول
        $NewLines = @()
        $FirstOccurrenceFound = $false

        foreach ($Line in $Lines) {
            if ($Line.Trim() -eq $SearchPattern) {
                if ($FirstOccurrenceFound -eq $false) {
                    $NewLines += $Line
                    $FirstOccurrenceFound = $true
                }
                # تخطي التكرارات اللاحقة
            } else {
                $NewLines += $Line
            }
        }
        
        # إعادة كتابة الملف بالنسخة المنقحة
        $NewLines -join "`n" | Out-File $File -Encoding UTF8

        Write-Host "✅ تم إصلاح التكرار في $File بنجاح." -ForegroundColor Green
    }
}

Write-Host "--------------------------------------------------------" -ForegroundColor White

if ($FoundIssues) {
    Write-Host "💾 تسجيل التغييرات والرفع النهائي إلى GitHub..." -ForegroundColor Cyan

    # 1. إضافة الملفات المعدلة
    git add .

    # 2. تسجيل التغييرات (Commit)
    git commit -m "auto: Resolved all repeated Image import errors via script"

    # 3. رفع التغييرات إلى GitHub
    git push origin master

    Write-Host "🏆 تم الرفع بنجاح! يمكن بدء النشر على Vercel الآن." -ForegroundColor Green
} else {
    Write-Host "✅ لا توجد أخطاء تكرار تحتاج إلى إصلاح." -ForegroundColor Green
}