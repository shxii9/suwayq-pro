$ErrorActionPreference = "Stop"
Write-Host "🧼 تنظيف schema.prisma..." -ForegroundColor Cyan
$Path = "prisma/schema.prisma"
$Content = Get-Content $Path -Raw
# استبدال الرأس لإزالة BOM
$CleanContent = $Content -replace "^[\s\S]*?generator client", "// schema fixed`r`ngenerator client"
$Utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($Path, $CleanContent, $Utf8NoBom)
git add prisma/schema.prisma
git commit -m "fix: Final BOM removal for Vercel P1012"
git push origin master
Write-Host "🚀 تم الرفع! انتقل لـ Vercel." -ForegroundColor Green