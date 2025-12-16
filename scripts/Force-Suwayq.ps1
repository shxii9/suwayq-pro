# Force-Suwayq.ps1
# حذف الكود الافتراضي بالقوة واستبداله بمشروع سُوَيق

$ErrorActionPreference = "Stop"
Write-Host "🔥 بدء عملية الاستبدال القسري..." -ForegroundColor Cyan

# 1. تنظيف شامل (حذف الكود القديم والذاكرة المؤقتة)
Write-Host "🗑️ حذف الملفات الافتراضية والذاكرة المؤقتة..." -ForegroundColor Yellow
if (Test-Path "src") { Remove-Item -Path "src" -Recurse -Force }
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }

# 2. إعادة إنشاء هيكل المجلدات
Write-Host "uq04ec بناء الهيكل الجديد..." -ForegroundColor Yellow
$AppDir = "src\app"
$CompDir = "src\components"
$LibDir = "src\lib"

New-Item -ItemType Directory -Force -Path $AppDir | Out-Null
New-Item -ItemType Directory -Force -Path $CompDir | Out-Null
New-Item -ItemType Directory -Force -Path $LibDir | Out-Null

# -----------------------------------------------------------
# 3. كتابة الملفات الأساسية (Globals, Layout, Page)
# -----------------------------------------------------------

# globals.css (التصميم الأبيض)
$CssContent = @'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 255, 255, 255;
  --background-end-rgb: 255, 255, 255;
}

body {
  color: #000;
  background: #fff;
  direction: rtl;
}
'@
[System.IO.File]::WriteAllText("$AppDir\globals.css", $CssContent, [System.Text.Encoding]::UTF8)

# layout.tsx
$LayoutContent = @'
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "سُوَيق برو | السوق المفتوح",
  description: "بيع واشتري كل شيء في الكويت",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>{children}</body>
    </html>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\layout.tsx", $LayoutContent, [System.Text.Encoding]::UTF8)

# Navbar Component
$NavContent = @'
import Link from "next/link";
import { PlusCircle, ShoppingBag } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 h-16 flex items-center shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black text-blue-600 flex items-center gap-2">
          <ShoppingBag /> سُوَيق <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">PRO</span>
        </Link>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition">
          <PlusCircle size={18}/> أضف إعلانك
        </button>
      </div>
    </nav>
  );
}
'@
[System.IO.File]::WriteAllText("$CompDir\Navbar.tsx", $NavContent, [System.Text.Encoding]::UTF8)

# Page.tsx (الصفحة الرئيسية)
$HomeContent = @'
import { Navbar } from "@/components/Navbar";
import { Search, MapPin, Clock } from "lucide-react";

export default function Home() {
  const listings = [
    { id: 1, title: "iPhone 15 Pro Max", price: "400 د.ك", loc: "حولي", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop" },
    { id: 2, title: "مرسيدس G-Class 2024", price: "45,000 د.ك", loc: "الشويخ", img: "https://images.unsplash.com/photo-1520050206274-2833eb060127?w=500&auto=format&fit=crop" },
    { id: 3, title: "شقة للإيجار", price: "450 د.ك", loc: "السالمية", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop" },
    { id: 4, title: "Rolex Submariner", price: "3,200 د.ك", loc: "العاصمة", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&auto=format&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-right">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20 px-4 text-center rounded-b-[3rem] shadow-xl mb-12">
        <h1 className="text-4xl md:text-6xl font-black mb-6">سوق الكويت المفتوح</h1>
        <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">بيع واشتري السيارات، العقارات، والإلكترونيات بكل سهولة وأمان.</p>
        
        <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto flex">
          <input type="text" placeholder="ما الذي تبحث عنه؟" className="flex-1 px-4 py-3 text-gray-800 outline-none rounded-r-xl" />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition">بحث</button>
        </div>
      </div>

      {/* Listings */}
      <main className="container mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 border-r-4 border-blue-600 pr-3">أحدث الإعلانات</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition group cursor-pointer">
              <div className="h-56 overflow-hidden relative">
                <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold flex gap-1 items-center">
                  <MapPin size={12}/> {item.loc}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-blue-600 font-black text-xl">{item.price}</p>
                <div className="mt-3 pt-3 border-t flex items-center text-gray-400 text-xs gap-1">
                  <Clock size={12}/> منذ ساعة
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\page.tsx", $HomeContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم الاستبدال القسري بنجاح!" -ForegroundColor Green
Write-Host "👉 الآن شغل السيرفر: npm run dev" -ForegroundColor Green