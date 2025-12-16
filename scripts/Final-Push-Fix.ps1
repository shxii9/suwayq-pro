# Final-Push-Fix.ps1
# إصلاح الأخطاء النهائية: YAML Error و Module Not Found قبل النشر

$ErrorActionPreference = "Stop"
Write-Host "👑 بدء إصلاح ملفات الإعداد والتنسيق النهائية..." -ForegroundColor Cyan

# --- 1. إصلاح ملف التنسيق .prettierrc (حل خطأ YAML Error) -------------------
Write-Host "🔧 إصلاح .prettierrc..." -ForegroundColor Yellow
$PrettierContent = @'
{
  "semi": true,
  "singleQuote": false,
  "jsxSingleQuote": false,
  "tabWidth": 2,
  "printWidth": 120,
  "trailingComma": "all"
}
'@
[System.IO.File]::WriteAllText(".prettierrc", $PrettierContent, [System.Text.Encoding]::UTF8)
Write-Host "✅ تم تحديث .prettierrc بنجاح." -ForegroundColor Green


# --- 2. إصلاح المسارات المستعارة tsconfig.json (حل خطأ Module Not Found) ----
Write-Host "🔧 إصلاح tsconfig.json..." -ForegroundColor Yellow
$TsConfigPath = "tsconfig.json"

if (-not (Test-Path $TsConfigPath)) {
    Write-Host "⚠️ تحذير: tsconfig.json غير موجود. قد يفشل البناء." -ForegroundColor Red
} else {
    $TsConfigContent = Get-Content $TsConfigPath -Raw | ConvertFrom-Json

    # التأكد من وجود compilerOptions
    if (-not $TsConfigContent.compilerOptions) {
        $TsConfigContent | Add-Member -Name "compilerOptions" -Value @{} -Force
    }
    
    # تعريف المسار المستعار الأساسي (المطلوب في Next.js)
    $TsConfigContent.compilerOptions.paths = @{
        "@/*" = @("./src/*")
    }

    # إعادة كتابة الملف بصيغة JSON نظيفة
    $TsConfigContent | ConvertTo-Json -Depth 5 | Out-File $TsConfigPath -Encoding UTF8
    
    Write-Host "✅ تم تحديث مسارات tsconfig.json بنجاح." -ForegroundColor Green
}

# --- 3. الرفع النهائي إلى GitHub ---------------------------------------------
Write-Host "💾 تسجيل التغييرات والرفع النهائي إلى GitHub..." -ForegroundColor Cyan

# إضافة الملفات المعدلة
git add .

# تسجيل التغييرات (Commit)
git commit -m "final: Fixed Prettier YAML error and ensured tsconfig paths are correct"

# رفع التغييرات إلى GitHub
git push origin master

Write-Host "🏆 تم الرفع بنجاح! يرجى بدء النشر على Vercel الآن." -ForegroundColor Green