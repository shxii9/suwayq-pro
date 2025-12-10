# Final-Quality-Fix.ps1
# إصلاح خطأ التنسيق في PowerShell وتثبيت نظام الجودة بشكل سليم

$ErrorActionPreference = "Stop"
Write-Host "🛡️ إصلاح خطأ التنسيق وإعادة تثبيت نظام الجودة (ESLint/Prettier)..." -ForegroundColor Cyan

# 1. إيقاف السيرفر
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. تثبيت مكتبات فحص الجودة والتنسيق (ضمان التثبيت الكامل)
Write-Host "📦 تثبيت ESLint و Prettier..." -ForegroundColor Yellow
cmd /c "npm install -D eslint-config-prettier eslint-plugin-prettier prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser"

# 3. إنشاء ملف Prettier (.prettierrc)
Write-Host "📝 إنشاء ملف تنسيق الكود (Prettier)..." -ForegroundColor Yellow
$PrettierContent = @'
// .prettierrc
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "endOfLine": "lf"
}
'@
[System.IO.File]::WriteAllText(".prettierrc", $PrettierContent, [System.Text.Encoding]::UTF8)

# 4. بناء ملف ESLint (.eslintrc.json)
Write-Host "📝 بناء ملف قواعد فحص الجودة (.eslintrc.json)..." -ForegroundColor Yellow
$EsLintContent = @'
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "plugin:prettier/recommended"],
  "plugins": ["prettier", "@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-use-before-define": "error",
    "import/no-unresolved": "off",
    "no-unused-vars": "off",
    "prettier/prettier": ["error", { "endOfLine": "lf" }]
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  }
}
'@
[System.IO.File]::WriteAllText(".eslintrc.json", $EsLintContent, [System.Text.Encoding]::UTF8)

# 5. تحديث package.json لإضافة أوامر الجودة الجديدة (حل مشكلة الفاصلة والتعليق)
Write-Host "⚙️ إضافة أوامر الفحص التلقائي إلى package.json..." -ForegroundColor Yellow
$PackageJsonPath = "package.json"
$ScriptsPattern = '("dev": "next dev",\s+"build": "next build",\s+"start": "next start",\s+"lint": "next lint")'

# إضافة الأوامر الجديدة (يتم فصلها بفاصلة في ملف JSON)
$NewScripts = @(
    '"dev": "next dev"',
    '"build": "next build"',
    '"start": "next start"',
    '"lint": "next lint"',
    '"format": "prettier --write \\"src/**/*.{js,jsx,ts,tsx}\\""',
    '"quality": "npm run format && npm run lint"'
)

# قراءة محتوى package.json
$PackageJsonContent = Get-Content $PackageJsonPath -Raw | Out-String

# استبدال قسم الـ scripts بالكامل بالنسخة الجديدة
$PackageJsonContent = $PackageJsonContent -replace $ScriptsPattern, ($NewScripts -join ",`n\t\t")

# التأكد من إزالة أي فواصل زائدة
$PackageJsonContent = $PackageJsonContent -replace ',{2,}', ','

# إعادة كتابة الملف
[System.IO.File]::WriteAllText($PackageJsonPath, $PackageJsonContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم بناء نظام الجودة! مشروعك الآن يكتشف الأخطاء تلقائياً." -ForegroundColor Green
Write-Host "💡 لتشغيل الفحص التلقائي (مثل الشركات الكبرى): npm run quality" -ForegroundColor Yellow
Write-Host "🚀 تشغيل السيرفر..." -ForegroundColor Green

# 6. التشغيل
npm run dev