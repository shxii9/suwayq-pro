# Check-Project.ps1
$ErrorActionPreference = "Continue"
Write-Host "🩺 بدء الفحص الطبي للمشروع..." -ForegroundColor Cyan

# 1. فحص ملف الإعدادات
if (Test-Path "package.json") {
    Write-Host "✅ ملف package.json: موجود." -ForegroundColor Green
} else {
    Write-Host "❌ ملف package.json: مفقود! (المشروع تالف)" -ForegroundColor Red
}

# 2. فحص المكتبات
if (Test-Path "node_modules") {
    Write-Host "✅ مجلد node_modules: موجود." -ForegroundColor Green
} else {
    Write-Host "⚠️ مجلد node_modules: مفقود (تحتاج npm install)." -ForegroundColor Yellow
}

# 3. تحديد المسار النشط (أين يعيش الكود؟)
$InSrc = Test-Path "src\app\page.tsx"
$InRoot = Test-Path "app\page.tsx"

if ($InSrc) {
    Write-Host "📍 هيكلية المشروع: تستخدم مجلد src (src\app)." -ForegroundColor Cyan
    Write-Host "💡 ملاحظة: يجب وضع ملفات سُوَيق داخل src\app" -ForegroundColor Yellow
} elseif ($InRoot) {
    Write-Host "📍 هيكلية المشروع: تستخدم الجذر مباشرة (app)." -ForegroundColor Cyan
    Write-Host "💡 ملاحظة: يجب وضع ملفات سُوَيق داخل app" -ForegroundColor Yellow
} else {
    Write-Host "❌ صفحة page.tsx غير موجودة في أي مكان!" -ForegroundColor Red
}

Write-Host "Done."