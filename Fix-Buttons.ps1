# Fix-Buttons.ps1
# يقوم بإضافة "use client" للملفات التي تحتوي على تفاعل (UI) لتفعيل الأزرار

$ErrorActionPreference = "Stop"
Write-Host "👑 بدء تفعيل الأزرار والقوائم (Converting to Client Components)..." -ForegroundColor Cyan

# قائمة الملفات التي تحتاج إلى تفاعل (Click/State)
$InteractiveFiles = @(
    "src/components/Navbar.tsx",
    "src/components/ListingCard.tsx",
    "src/app/admin/listings/page.tsx",
    "src/app/admin/users/page.tsx",
    "src/app/admin/page.tsx",
    "src/app/dashboard/page.tsx",
    "src/app/messages/page.tsx",
    "src/app/checkout/page.tsx",
    "src/app/settings/page.tsx",
    "src/app/page.tsx"
)

foreach ($File in $InteractiveFiles) {
    if (Test-Path $File) {
        $Content = Get-Content $File -Raw
        
        # التحقق مما إذا كان الملف يحتوي بالفعل على "use client"
        if ($Content -notmatch "['`"]use client['`"]") {
            Write-Host "🔧 تفعيل التفاعل في: $File" -ForegroundColor Yellow
            
            # إضافة "use client"; في أول سطر
            $NewContent = "'use client';" + "`n" + "`n" + $Content
            
            [System.IO.File]::WriteAllText($File, $NewContent, [System.Text.Encoding]::UTF8)
        } else {
            Write-Host "✅ الملف مفعل مسبقاً: $File" -ForegroundColor Green
        }
    } else {
        Write-Host "⚠️ الملف غير موجود: $File" -ForegroundColor Gray
    }
}

Write-Host "--------------------------------------------------------" -ForegroundColor White
Write-Host "🎉 تم تفعيل الأزرار! يجب عليك الآن إعادة تشغيل السيرفر." -ForegroundColor Green