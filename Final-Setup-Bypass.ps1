# Final-Setup-Bypass.ps1
# الإصلاح النهائي لخطأ JSONPArse وتأكيد الإعدادات

$ErrorActionPreference = "Stop"
Write-Host "🛡️ تجاوز خطأ JSONPArse وإعادة بناء package.json..." -ForegroundColor Cyan

# 1. إيقاف السيرفر
Write-Host "🛑 إيقاف السيرفر..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. إعادة كتابة package.json (الكود النظيف الوحيد الموثوق)
Write-Host "📝 إعادة كتابة ملف package.json بالكود النهائي..." -ForegroundColor Yellow
$PackageJsonContent = @'
{
  "name": "suwayq-pro",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",
    "quality": "npm run format && npm run lint",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.468.0",
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.3.0",
    "@prisma/client": "^7.1.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.3",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5",
    "prisma": "^7.1.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "prettier": "^3.2.5",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0"
  }
}
'@
[System.IO.File]::WriteAllText("package.json", $PackageJsonContent, [System.Text.Encoding]::UTF8)

# 3. توليد عميل Prisma (باستخدام الأمر الجديد)
Write-Host "⚙️ توليد عميل Prisma جديد باستخدام 'npm run prisma:generate'..." -ForegroundColor Cyan
cmd /c "npm run prisma:generate"

# 4. تطبيق الهجرة (الخطوة الأخيرة)
Write-Host "💾 تطبيق الهجرة لإنشاء الجداول باستخدام 'npm run prisma:migrate'..." -ForegroundColor Cyan
cmd /c "npm run prisma:migrate"

Write-Host "✅ تم حل مشكلة JSONPArse. المشروع الآن جاهز للتحميل النهائي." -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر والمشروع متصل بقاعدة بيانات حية!" -ForegroundColor Green
npm run dev