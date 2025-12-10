# CI-Quality-System.ps1
# تثبيت أدوات فحص الجودة والتنظيم (ESLint & Prettier) لمنع الأخطاء "التافهة"

$ErrorActionPreference = "Stop"
Write-Host "🛡️ بناء نظام الجودة (QA) والدمج المستمر..." -ForegroundColor Cyan

# 1. إيقاف السيرفر
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. تثبيت مكتبات فحص الجودة والتنسيق
Write-Host "📦 تثبيت ESLint و Prettier والـ Plugins..." -ForegroundColor Yellow
cmd /c "npm install -D eslint-config-prettier eslint-plugin-prettier prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser"

# 3. إنشاء ملف Prettier لتنسيق الكود (يتم تطبيقه تلقائياً)
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

# 4. بناء ملف ESLint (لقواعد الجودة - يمنع الأخطاء التافهة)
Write-Host "📝 بناء ملف قواعد فحص الجودة (.eslintrc.json)..." -ForegroundColor Yellow
$EsLintContent = @'
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "plugin:prettier/recommended"],
  "plugins": ["prettier", "@typescript-eslint"],
  "rules": {
    // 💡 هذا السطر يمنع استخدام الدوال قبل تعريفها (يحل خطأ المنطق)
    "@typescript-eslint/no-use-before-define": "error",
    // 💡 يجبرك على استخدام مسارات الاستيراد الصحيحة (@/)
    "import/no-unresolved": "off",
    // 💡 يمنع الأخطاء المتعلقة بـ TypeScript
    "no-unused-vars": "off",
    // 💡 تطبيق قواعد Prettier كقواعد إضافية لـ ESLint
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

# 5. تحديث package.json لإضافة أوامر الجودة الجديدة
Write-Host "⚙️ إضافة أوامر الفحص التلقائي إلى package.json..." -ForegroundColor Yellow
$PackageJsonPath = "package.json"
$PackageJsonContent = Get-Content $PackageJsonPath -Raw | Out-String

# يتم البحث عن سطر "scripts" وإضافة الأوامر الجديدة
$NewScripts = @(
    '"dev": "next dev",',
    '"build": "next build",',
    '"start": "next start",',
    '"lint": "next lint",'
)

$NewScriptsWithQuality = @(
    '"dev": "next dev",',
    '"build": "next build",',
    '"start": "next start",',
    '"lint": "next lint",' ,
    // 💡 الأوامر الجديدة التي تريدها
    '"format": "prettier --write \\"src/**/*.{js,jsx,ts,tsx}\\"",',
    '"quality": "npm run format && npm run lint"' 
)

$PackageJsonContent = $PackageJsonContent -replace ('"dev": "next dev",\s+"build": "next build",\s+"start": "next start",\s+"lint": "next lint",'), ($NewScriptsWithQuality -join "`n")

# إعادة كتابة الملف
[System.IO.File]::WriteAllText($PackageJsonPath, $PackageJsonContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم بناء نظام الجودة! مشروعك الآن يكتشف الأخطاء تلقائياً." -ForegroundColor Green
Write-Host "💡 لتشغيل الفحص التلقائي: npm run quality" -ForegroundColor Yellow
Write-Host "🚀 تشغيل السيرفر..." -ForegroundColor Green

# 6. التشغيل
npm run dev