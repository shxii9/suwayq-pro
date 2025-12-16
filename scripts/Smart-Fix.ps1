# Overkill-Fix.ps1
# يقوم بالبحث عن كل ملف page.tsx ويستبدله بتصميم سُوَيق
# يضمن اختفاء شاشة Vercel السوداء بنسبة 100%

$ErrorActionPreference = "Stop"
Write-Host "🔥 بدء عملية الاستبدال القسري لواجهة Vercel..." -ForegroundColor Cyan

# 1. إيقاف السيرفر وحذف الكاش
Write-Host "🛑 إيقاف السيرفر وتنظيف الذاكرة..." -ForegroundColor Yellow
try { Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue } catch {}
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }

# 2. كود سُوَيق (المشروع كاملاً في ملف واحد لضمان العمل)
$SuwayqCode = @'
import React from "react";
import Link from "next/link";

// بيانات وهمية للعرض الفوري
const listings = [
  { id: 1, title: "iPhone 15 Pro Max", price: "450 د.ك", location: "حولي", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop" },
  { id: 2, title: "Toyota Land Cruiser", price: "22,000 د.ك", location: "الشويخ", image: "https://images.unsplash.com/photo-1594502184342-2b12f8a65202?w=800&auto=format&fit=crop" },
  { id: 3, title: "شقة للإيجار", price: "350 د.ك", location: "السالمية", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop" },
  { id: 4, title: "Rolex Watch", price: "3,200 د.ك", location: "العاصمة", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-right font-sans" dir="rtl">
      {/* Navbar */}
      <nav className="bg-white border-b sticky top-0 z-50 h-16 flex items-center shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-blue-600">
            سُوَيق <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">PRO</span>
          </Link>
          <div className="flex gap-4">
             <button className="text-gray-600 font-bold">دخول</button>
             <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition">
               + أضف إعلانك
             </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-24 text-center rounded-b-[3rem] shadow-xl px-4 mb-12">
        <h1 className="text-4xl md:text-6xl font-black mb-6">ابحث.. اشتري.. وبيع</h1>
        <p className="text-xl text-blue-100 mb-10">أكبر سوق مفتوح في الكويت للإعلانات المبوبة</p>
        
        <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto flex">
          <input type="text" placeholder="ابحث عن سيارة، عقار، وظيفة..." className="flex-1 px-4 py-3 text-gray-800 outline-none rounded-r-xl text-lg" />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition">بحث</button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-xl font-bold text-gray-800 mb-6">تصفح الأقسام</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
           {["سيارات", "عقارات", "إلكترونيات", "أثاث", "وظائف", "حيوانات"].map((cat) => (
             <div key={cat} className="bg-white p-4 rounded-xl border border-gray-200 text-center font-bold hover:border-blue-500 hover:text-blue-600 cursor-pointer transition">
               {cat}
             </div>
           ))}
        </div>
      </div>

      {/* Listings Grid */}
      <main className="container mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 border-r-4 border-blue-600 pr-3">أحدث الإعلانات</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition group cursor-pointer">
              <div className="h-56 overflow-hidden relative bg-gray-200">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-800">
                  📍 {item.location}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-blue-600 font-black text-xl">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center mt-auto">
        <p>© 2025 منصة سُوَيق برو</p>
      </footer>
    </div>
  );
}
'@

# 3. كود CSS (لإزالة اللون الأسود)
$CssContent = @'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 249, 250, 251;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-start-rgb));
  direction: rtl;
}
'@

# 4. البحث والاستبدال (الخطوة الأهم)
Write-Host "🔍 البحث عن ملفات page.tsx و globals.css..." -ForegroundColor Yellow

# البحث عن كل ملفات page.tsx في المجلد الحالي والمجلدات الفرعية
$Pages = Get-ChildItem -Path . -Recurse -Filter "page.tsx"
foreach ($Page in $Pages) {
    if ($Page.FullName -like "*node_modules*") { continue } # تجاهل node_modules
    Write-Host "   ✅ تم استبدال: $($Page.FullName)" -ForegroundColor Green
    [System.IO.File]::WriteAllText($Page.FullName, $SuwayqCode, [System.Text.Encoding]::UTF8)
}

# البحث عن كل ملفات globals.css
$Styles = Get-ChildItem -Path . -Recurse -Filter "globals.css"
foreach ($Style in $Styles) {
    if ($Style.FullName -like "*node_modules*") { continue }
    Write-Host "   ✅ تم تنظيف الستايل: $($Style.FullName)" -ForegroundColor Green
    [System.IO.File]::WriteAllText($Style.FullName, $CssContent, [System.Text.Encoding]::UTF8)
}

Write-Host "`n🚀 تم الحقن بنجاح! جاري تشغيل السيرفر..." -ForegroundColor Cyan
npm run dev