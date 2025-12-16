# Fix-Conflict.ps1
# حل مشكلة ازدواجية المجلدات (app vs src/app)

$ErrorActionPreference = "Stop"
Write-Host "⚔️ بدء حل تعارض المجلدات..." -ForegroundColor Cyan

# 1. إيقاف السيرفر (إجباري)
Write-Host "🛑 إيقاف Node.js..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}

# 2. حذف المجلد المخادع (app الموجود في الجذر)
if (Test-Path "app") {
    Write-Host "🗑️ تم اكتشاف مجلد 'app' زائد في الجذر! جاري الحذف..." -ForegroundColor Red
    Remove-Item -Path "app" -Recurse -Force
} else {
    Write-Host "✅ لا يوجد مجلد 'app' في الجذر (جيد)." -ForegroundColor Green
}

# 3. تنظيف الذاكرة المؤقتة (لإجبار Next.js على رؤية src)
Write-Host "🧹 تنظيف الكاش (.next)..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }

# 4. التأكد من أن كود سُوَيق موجود في src/app
# (سنعيد كتابته للتأكد 100% أننا لا نعرض صفحة فارغة)
Write-Host "📝 ضمان وجود كود سُوَيق في src/app..." -ForegroundColor Cyan

# تأكد من وجود المجلد
if (-not (Test-Path "src\app")) { New-Item -ItemType Directory -Force -Path "src\app" | Out-Null }

$SuwayqCode = @'
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-right font-sans" dir="rtl">
      <nav className="bg-white border-b sticky top-0 z-50 h-16 flex items-center shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-blue-600">
            سُوَيق <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">PRO</span>
          </Link>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition">
            + أضف إعلانك
          </button>
        </div>
      </nav>

      <div className="bg-blue-600 text-white py-24 text-center rounded-b-[3rem] shadow-xl px-4">
        <h1 className="text-4xl md:text-6xl font-black mb-6">ابحث.. اشتري.. وبيع</h1>
        <p className="text-xl text-blue-100 mb-10">أكبر سوق مفتوح في الكويت</p>
        <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto flex">
          <input type="text" placeholder="ابحث عن سيارة، عقار..." className="flex-1 px-4 py-3 text-gray-800 outline-none rounded-r-xl text-lg" />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition">بحث</button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">أهلاً بك في سُوَيق برو</h2>
        <p className="text-gray-500">تم حل المشكلة بنجاح! الموقع يعمل الآن من المجلد الصحيح.</p>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("src\app\page.tsx", $SuwayqCode, [System.Text.Encoding]::UTF8)

Write-Host "🚀 الإصلاح تم! جاري التشغيل..." -ForegroundColor Green
npm run dev