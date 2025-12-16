# Fix-Alias-Path.ps1
# إصلاح خطأ Module not found الناتج عن عدم تعريف المسار المستعار (@/)

$ErrorActionPreference = "Stop"
Write-Host "🔗 إصلاح تعاريف المسارات المستعارة (@/)..." -ForegroundColor Cyan

# 1. إيقاف السيرفر
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. إعادة كتابة tsconfig.json لتعريف المسار @/
Write-Host "📝 تحديث tsconfig.json..." -ForegroundColor Yellow

$TsConfigContent = @'
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    // ⭐️ هذا السطر هو مفتاح الحل: تعريف @/ كاختصار لمجلد src
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
'@
[System.IO.File]::WriteAllText("tsconfig.json", $TsConfigContent, [System.Text.Encoding]::UTF8)

# 3. تنظيف الكاش مرة أخيرة (لإجبار السيرفر على قراءة tsconfig الجديد)
Write-Host "🧹 تنظيف الكاش (.next)..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }

Write-Host "✅ تم الإصلاح! جميع المسارات أصبحت معروفة." -ForegroundColor Green
Write-Host "🚀 تشغيل المشروع..." -ForegroundColor Green

# 4. التشغيل
npm run dev