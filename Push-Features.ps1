# Push-Features.ps1
# رفع الميزات الجديدة إلى GitHub

$ErrorActionPreference = "Stop"
git add .
git commit -m "feat: Add dynamic listings, search functionality, and full SEO"
git push origin master
Write-Host "🚀 تم الرفع! Vercel سيقوم الآن بنشر الموقع مع الميزات الجديدة." -ForegroundColor Green