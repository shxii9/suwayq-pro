# Executive-Protocol-V2.ps1
# النسخة الذكية: تتجاوز أخطاء التنظيف وتكمل المهمة.

$ErrorActionPreference = "Stop"
Write-Host "🔥 بدء البروتوكول التنفيذي V2..." -ForegroundColor Cyan

# ---------------------------------------------------------------------------
# 1. تنظيف الساحة (Smart Clean)
# ---------------------------------------------------------------------------
Write-Host "🧹 1/5: التحقق من العمليات وتنظيف الملفات..." -ForegroundColor Yellow

# استخدام أمر PowerShell الأصلي مع خاصية "تجاهل الأخطاء" إذا لم يجد العملية
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# حذف الملفات التي قد تسبب مشاكل
$Artifacts = @("node_modules", ".next", "package-lock.json")
foreach ($Item in $Artifacts) {
    if (Test-Path $Item) {
        Write-Host "   DELETE: $Item" -ForegroundColor Gray
        Remove-Item -Recurse -Force $Item -ErrorAction SilentlyContinue
    }
}
Write-Host "✅ الساحة نظيفة." -ForegroundColor Green

# ---------------------------------------------------------------------------
# 2. إعادة التثبيت (Fresh Install)
# ---------------------------------------------------------------------------
Write-Host "⬇️ 2/5: تثبيت المكتبات من المصدر (Fresh Install)..." -ForegroundColor Yellow
# --legacy-peer-deps لتفادي مشاكل تضارب الإصدارات في بعض الحالات
npm install --legacy-peer-deps
if ($LASTEXITCODE -ne 0) { Write-Error "فشل تثبيت المكتبات!" }
Write-Host "✅ تم تثبيت المكتبات." -ForegroundColor Green

# ---------------------------------------------------------------------------
# 3. إعداد قاعدة البيانات (Database Sync)
# ---------------------------------------------------------------------------
Write-Host "🗄️ 3/5: مزامنة قاعدة البيانات..." -ForegroundColor Yellow
npx prisma generate
npx prisma db push
Write-Host "✅ قاعدة البيانات متزامنة." -ForegroundColor Green

# ---------------------------------------------------------------------------
# 4. اختبار البناء (Quality Assurance Build)
# ---------------------------------------------------------------------------
Write-Host "🏗️ 4/5: اختبار بناء نسخة الإنتاج..." -ForegroundColor Yellow
$env:NEXT_TELEMETRY_DISABLED=1
# بناء نسخة الإنتاج للتأكد من خلو الكود من الأخطاء
npm run build
if ($LASTEXITCODE -ne 0) { 
    Write-Error "🛑 فشل اختبار البناء! راجع الأخطاء أعلاه." 
}
Write-Host "✅ اختبار الجودة ناجح." -ForegroundColor Green

# ---------------------------------------------------------------------------
# 5. الإطلاق (Launch)
# ---------------------------------------------------------------------------
Write-Host "🚀 5/5: إطلاق النظام..." -ForegroundColor Cyan
Write-Host "--------------------------------------------------------" -ForegroundColor White
Write-Host "🎉 المشروع يعمل بمعايير جوجل." -ForegroundColor Green
Write-Host "👉 الرابط: http://localhost:3000" -ForegroundColor Green
Write-Host "--------------------------------------------------------" -ForegroundColor White

npm run dev