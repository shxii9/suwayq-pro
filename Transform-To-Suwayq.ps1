# Transform-To-Suwayq.ps1
# تحويل مشروع Next.js الافتراضي إلى منصة سُوَيق برو المتكاملة

$ErrorActionPreference = "Stop"
Write-Host "🚀 بدء تحويل الصفحة الافتراضية إلى منصة سُوَيق..." -ForegroundColor Cyan

# 1. تثبيت المكتبات (الأيقونات)
Write-Host "📦 تثبيت الأيقونات..." -ForegroundColor Yellow
cmd /c "npm install lucide-react clsx tailwind-merge"

# مسارات المجلدات
$AppDir = "src\app"
$CompDir = "src\components"
$LibDir = "src\lib"

# إنشاء الهيكل
New-Item -ItemType Directory -Force -Path $CompDir | Out-Null
New-Item -ItemType Directory -Force -Path $LibDir | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\dashboard" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\messages" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\admin" | Out-Null

# -----------------------------------------------------------
# 2. إزالة التصميم الأسود الافتراضي (globals.css)
# -----------------------------------------------------------
Write-Host "🎨 تطبيق الثيم الأبيض والأزرق..." -ForegroundColor Yellow
$CssContent = @'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 249, 250, 251; /* gray-50 */
  --background-end-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-start-rgb));
  direction: rtl;
  text-align: right;
}
'@
[System.IO.File]::WriteAllText("$AppDir\globals.css", $CssContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 3. إنشاء البيانات (Data)
# -----------------------------------------------------------
$DataContent = @'
export const listings = [
  { id: 1, title: "iPhone 15 Pro Max", price: "450 د.ك", location: "حولي", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop", category: "إلكترونيات", date: "منذ ساعة" },
  { id: 2, title: "تويوتا لاند كروزر 2023", price: "22,500 د.ك", location: "الشويخ", image: "https://images.unsplash.com/photo-1594502184342-2b12f8a65202?w=500&auto=format&fit=crop", category: "سيارات", date: "منذ 3 ساعات" },
  { id: 3, title: "شقة للإيجار (غرفتين)", price: "350 د.ك", location: "السالمية", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop", category: "عقارات", date: "منذ يوم" },
  { id: 4, title: "MacBook Pro M3", price: "600 د.ك", location: "القرين", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=500&auto=format&fit=crop", category: "كمبيوتر", date: "منذ يومين" },
];
'@
[System.IO.File]::WriteAllText("$LibDir\data.ts", $DataContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 4. إنشاء المكونات (Navbar, Card)
# -----------------------------------------------------------
# Navbar
$NavContent = @'
import Link from "next/link";
import { PlusCircle, User, Menu, MessageCircle } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-blue-600 flex items-center gap-1">
          سُوَيق <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">PRO</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/messages" className="text-gray-600 hover:text-blue-600"><MessageCircle /></Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-bold hidden md:block">لوحة التحكم</Link>
          <Link href="/admin" className="text-red-600 font-bold text-sm hidden md:block">الإدارة</Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2">
            <PlusCircle size={18} /> <span className="hidden md:inline">أضف إعلان</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
'@
[System.IO.File]::WriteAllText("$CompDir\Navbar.tsx", $NavContent, [System.Text.Encoding]::UTF8)

# ListingCard
$CardContent = @'
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

export function ListingCard({ item }: { item: any }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition group cursor-pointer">
      <div className="h-48 overflow-hidden relative">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
          <MapPin size={12} /> {item.location}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 truncate">{item.title}</h3>
        <p className="text-blue-600 font-black text-lg">{item.price}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 border-t pt-3">
          <span className="bg-gray-50 px-2 py-1 rounded">{item.category}</span>
          <span className="flex items-center gap-1 mr-auto"><Clock size={12} /> {item.date}</span>
        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$CompDir\ListingCard.tsx", $CardContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 5. استبدال الصفحة الرئيسية (page.tsx)
# -----------------------------------------------------------
Write-Host "🏠 استبدال الصفحة الرئيسية..." -ForegroundColor Yellow
$HomeContent = @'
import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { listings } from "@/lib/data";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero */}
      <div className="bg-blue-600 text-white pb-20 pt-16 rounded-b-[3rem] shadow-xl px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6">ابحث.. اشتري.. وبيع</h1>
        <p className="text-lg text-blue-100 mb-8">المنصة الأحدث في الكويت للإعلانات المبوبة.</p>
        
        <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto flex">
          <input type="text" placeholder="ابحث عن سيارة، عقار..." className="flex-1 px-4 py-3 text-gray-800 outline-none rounded-r-xl" />
          <button className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold">بحث</button>
        </div>
      </div>

      {/* Listings */}
      <main className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-r-4 border-blue-600 pr-3">أحدث الإعلانات</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-8 text-center mt-12">
        <p>© 2025 منصة سُوَيق برو. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\page.tsx", $HomeContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 6. إضافة الصفحات الفرعية (Admin, Chat, Dashboard)
# -----------------------------------------------------------
Write-Host "➕ إضافة الصفحات الفرعية..." -ForegroundColor Yellow

# Admin Page
$AdminContent = @'
import { Shield, Users, Activity } from "lucide-react";
import Link from "next/link";
export default function Admin() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-black mb-8 flex items-center gap-2"><Shield className="text-blue-500"/> لوحة الإدارة</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <Users className="mb-4 text-blue-400" />
          <h3 className="text-2xl font-bold">1,250</h3>
          <p className="text-slate-400">مستخدم نشط</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <Activity className="mb-4 text-green-400" />
          <h3 className="text-2xl font-bold">450 د.ك</h3>
          <p className="text-slate-400">مبيعات اليوم</p>
        </div>
      </div>
      <Link href="/" className="mt-8 inline-block text-slate-400 hover:text-white">العودة للرئيسية &larr;</Link>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\admin\page.tsx", $AdminContent, [System.Text.Encoding]::UTF8)

# Messages Page
$ChatContent = @'
import { Navbar } from "@/components/Navbar";
import { User } from "lucide-react";
export default function Messages() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border h-[600px] flex">
          <div className="w-1/3 border-l p-4">
            <h2 className="font-bold mb-4">المحادثات</h2>
            <div className="p-3 bg-blue-50 rounded-xl flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center"><User size={20}/></div>
              <div><h3 className="font-bold text-sm">محمد أحمد</h3><p className="text-xs text-gray-500">هل السلعة متوفرة؟</p></div>
            </div>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center text-gray-400">
            اختر محادثة للبدء
          </div>
        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\messages\page.tsx", $ChatContent, [System.Text.Encoding]::UTF8)

# Dashboard Page
$DashContent = @'
import { Navbar } from "@/components/Navbar";
import { listings } from "@/lib/data";
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-black mb-6">إعلاناتي</h1>
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          {listings.slice(0,2).map(item => (
            <div key={item.id} className="p-4 border-b flex justify-between items-center">
              <span className="font-bold">{item.title}</span>
              <span className="text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded">نشط</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\dashboard\page.tsx", $DashContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم التحويل بنجاح! عد للمتصفح الآن." -ForegroundColor Green