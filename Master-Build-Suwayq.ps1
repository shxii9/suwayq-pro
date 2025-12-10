# Master-Build-Suwayq.ps1
# السكريبت الشامل لبناء وتصميم وتنظيم مشروع سُوَيق برو
# الهدف: تحويل الأساس النظيف إلى تطبيق متكامل المزايا

$ErrorActionPreference = "Stop"
Write-Host "🏗️ بدء عملية البناء المعماري الشامل..." -ForegroundColor Cyan

# 1. التأكد من المكتبات الضرورية
Write-Host "📦 فحص وتثبيت مكتبات التصميم..." -ForegroundColor Yellow
cmd /c "npm install lucide-react clsx tailwind-merge"

# 2. تعريف المسارات الصحيحة (نحن الآن متأكدون من src)
$SrcDir = "src"
$AppDir = "$SrcDir\app"
$CompDir = "$SrcDir\components"
$LibDir = "$SrcDir\lib"

# 3. إنشاء هيكلية المجلدات الاحترافية
Write-Host "📂 تنظيم المجلدات..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $CompDir | Out-Null
New-Item -ItemType Directory -Force -Path $LibDir | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\search" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\dashboard" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\messages" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\admin" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\wallet" | Out-Null

# -----------------------------------------------------------
# 4. طبقة البيانات (Mock Data Layer) - لضمان عدم وجود أخطاء Null
# -----------------------------------------------------------
Write-Host "📝 إنشاء طبقة البيانات المركزية..." -ForegroundColor Cyan
$DataContent = @'
export const listings = [
  { id: 1, title: "iPhone 15 Pro Max - 256GB", price: "420 د.ك", location: "حولي", category: "إلكترونيات", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop", date: "منذ ساعة", status: "active" },
  { id: 2, title: "تويوتا لاند كروزر GXR", price: "21,500 د.ك", location: "الشويخ", category: "سيارات", image: "https://images.unsplash.com/photo-1594502184342-2b12f8a65202?w=600&auto=format&fit=crop", date: "منذ 3 ساعات", status: "active" },
  { id: 3, title: "شقة للإيجار (إطلالة بحرية)", price: "450 د.ك", location: "السالمية", category: "عقارات", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop", date: "منذ يوم", status: "active" },
  { id: 4, title: "Rolex Submariner Date", price: "3,800 د.ك", location: "العاصمة", category: "ساعات", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop", date: "منذ يومين", status: "promoted" },
  { id: 5, title: "PlayStation 5 Slim", price: "135 د.ك", location: "الجهراء", category: "ألعاب", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop", date: "منذ 5 ساعات", status: "active" },
  { id: 6, title: "MacBook Air M2", price: "320 د.ك", location: "العارضية", category: "كمبيوتر", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=600&auto=format&fit=crop", date: "منذ أسبوع", status: "active" },
];

export const categories = [
  { name: "سيارات", icon: "Car", color: "bg-orange-100 text-orange-600" },
  { name: "عقارات", icon: "Home", color: "bg-blue-100 text-blue-600" },
  { name: "إلكترونيات", icon: "Smartphone", color: "bg-purple-100 text-purple-600" },
  { name: "وظائف", icon: "Briefcase", color: "bg-green-100 text-green-600" },
];
'@
[System.IO.File]::WriteAllText("$LibDir\data.ts", $DataContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 5. المكونات الأساسية (Components)
# -----------------------------------------------------------
Write-Host "🧩 بناء المكونات (Navbar, Footer, Card)..." -ForegroundColor Cyan

# Navbar
$NavContent = @'
import Link from "next/link";
import { PlusCircle, Search, MessageCircle, User, LayoutDashboard, Shield } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 h-16 shadow-sm">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-blue-600 flex items-center gap-1 hover:opacity-80 transition">
          سُوَيق <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full tracking-wider">PRO</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-600">
          <Link href="/search" className="hover:text-blue-600 flex items-center gap-1 transition"><Search size={18}/> تصفح</Link>
          <Link href="/dashboard" className="hover:text-blue-600 flex items-center gap-1 transition"><LayoutDashboard size={18}/> لوحتي</Link>
          <Link href="/messages" className="hover:text-blue-600 flex items-center gap-1 transition"><MessageCircle size={18}/> الرسائل</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/admin" className="hidden lg:flex text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100 items-center gap-1">
            <Shield size={12}/> الإدارة
          </Link>
          <Link href="/wallet" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition relative">
            <User size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
          </Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            <PlusCircle size={16}/> <span className="hidden sm:inline">أضف إعلان</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
'@
[System.IO.File]::WriteAllText("$CompDir\Navbar.tsx", $NavContent, [System.Text.Encoding]::UTF8)

# Listing Card
$CardContent = @'
import Link from "next/link";
import { MapPin, Clock, Heart } from "lucide-react";

export function ListingCard({ item }: { item: any }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300 relative">
      {item.status === "promoted" && (
        <span className="absolute top-2 right-2 z-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">مميّز</span>
      )}
      <button className="absolute top-2 left-2 z-10 p-1.5 bg-black/20 hover:bg-red-500 text-white rounded-full backdrop-blur-sm transition">
        <Heart size={16} />
      </button>
      
      <div className="h-48 overflow-hidden relative bg-gray-100">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex items-center gap-1 text-white text-xs font-medium">
            <MapPin size={12} /> {item.location}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition">{item.title}</h3>
        <p className="text-blue-600 font-black text-lg mb-3">{item.price}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-3 border-gray-50">
          <span className="bg-gray-50 text-gray-600 px-2 py-0.5 rounded">{item.category}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {item.date}</span>
        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$CompDir\ListingCard.tsx", $CardContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 6. الصفحات الرئيسية (Pages)
# -----------------------------------------------------------
Write-Host "📄 بناء الصفحات (Home, Search, Dashboard, Admin)..." -ForegroundColor Cyan

# Home Page
$HomeContent = @'
import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { listings, categories } from "@/lib/data";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white pt-20 pb-24 rounded-b-[3rem] shadow-xl px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">ابحث.. اشتري.. وبيع</h1>
          <p className="text-lg text-blue-100 mb-10 max-w-xl mx-auto">المنصة الأحدث والأكثر أماناً في الكويت. آلاف الإعلانات بانتظارك.</p>
          
          <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto flex transform translate-y-6">
            <input type="text" placeholder="ابحث عن سيارة، عقار، وظيفة..." className="flex-1 px-4 py-3 text-gray-800 outline-none rounded-r-xl text-lg" />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition flex items-center gap-2">
              <Search size={20} /> بحث
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 mt-16 mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">تصفح حسب القسم</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className={`p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer flex items-center gap-3 bg-white group`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${cat.color} group-hover:scale-110 transition`}>#</div>
              <span className="font-bold text-gray-700 group-hover:text-blue-600">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Listings */}
      <main className="container mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 border-r-4 border-blue-600 pr-3">أحدث الإعلانات</h2>
          <Link href="/search" className="text-blue-600 font-bold hover:underline flex items-center gap-1 text-sm">مشاهدة الكل <ArrowLeft size={16}/></Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </main>
      
      <footer className="bg-slate-900 text-white py-12 text-center mt-12">
        <div className="container mx-auto px-4">
           <h3 className="text-2xl font-black text-blue-500 mb-4">سُوَيق PRO</h3>
           <p className="text-slate-400 mb-8">منصة الإعلانات المبوبة الأولى في الكويت.</p>
           <p className="text-slate-600 text-sm">© 2025 جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\page.tsx", $HomeContent, [System.Text.Encoding]::UTF8)

# Dashboard
$DashContent = @'
import { Navbar } from "@/components/Navbar";
import { listings } from "@/lib/data";
import { BarChart3, Package, Eye } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-black mb-8">لوحة التحكم</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start mb-2">
               <span className="text-gray-500 text-sm font-bold">إجمالي الإعلانات</span>
               <Package className="text-blue-500" size={20}/>
            </div>
            <h3 className="text-3xl font-black">12</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start mb-2">
               <span className="text-gray-500 text-sm font-bold">المشاهدات</span>
               <Eye className="text-orange-500" size={20}/>
            </div>
            <h3 className="text-3xl font-black">1,450</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start mb-2">
               <span className="text-gray-500 text-sm font-bold">الأرباح</span>
               <BarChart3 className="text-green-500" size={20}/>
            </div>
            <h3 className="text-3xl font-black">45 د.ك</h3>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b font-bold">إعلاناتي النشطة</div>
          <div className="divide-y">
            {listings.slice(0,3).map(item => (
              <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <img src={item.image} className="w-10 h-10 rounded object-cover"/>
                  <span className="font-bold text-gray-800">{item.title}</span>
                </div>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">نشط</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\dashboard\page.tsx", $DashContent, [System.Text.Encoding]::UTF8)

# Admin Page
$AdminContent = @'
import { Shield, Users, Activity, AlertTriangle } from "lucide-react";
import Link from "next/link";
export default function Admin() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
      <div className="flex justify-between items-center mb-10">
         <h1 className="text-3xl font-black flex items-center gap-2"><Shield className="text-blue-500"/> لوحة الإدارة العليا</h1>
         <Link href="/" className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 transition">العودة للموقع</Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><Users className="mb-4 text-blue-400" /><h3 className="text-2xl font-bold">1,250</h3><p className="text-slate-400">مستخدم</p></div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><Activity className="mb-4 text-green-400" /><h3 className="text-2xl font-bold">450 د.ك</h3><p className="text-slate-400">إيرادات</p></div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><AlertTriangle className="mb-4 text-red-400" /><h3 className="text-2xl font-bold">5</h3><p className="text-slate-400">بلاغات</p></div>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
        <h3 className="font-bold mb-4 text-xl">آخر النشاطات</h3>
        <p className="text-slate-500">لا توجد نشاطات جديدة تستدعي الانتباه.</p>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\admin\page.tsx", $AdminContent, [System.Text.Encoding]::UTF8)

# Messages Page
$ChatContent = @'
import { Navbar } from "@/components/Navbar";
import { User, Send } from "lucide-react";

export default function Messages() {
  return (
    <div className="h-screen bg-gray-50 font-sans flex flex-col" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm border flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 border-l bg-gray-50 flex flex-col">
            <div className="p-4 border-b font-bold text-gray-700">المحادثات</div>
            <div className="flex-1 overflow-y-auto">
               <div className="p-4 bg-white border-b flex items-center gap-3 cursor-pointer border-r-4 border-r-blue-600">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><User size={20}/></div>
                  <div><h3 className="font-bold text-sm">أحمد محمد</h3><p className="text-xs text-gray-500">هل السعر نهائي؟</p></div>
               </div>
            </div>
          </div>
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
             <div className="p-4 border-b flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white"><User size={16}/></div>
                <span className="font-bold">أحمد محمد</span>
             </div>
             <div className="flex-1 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-5 p-6 space-y-4">
                <div className="flex justify-start"><div className="bg-white p-3 rounded-2xl rounded-tr-none shadow-sm border max-w-sm">مرحباً، هل السلعة متوفرة؟</div></div>
                <div className="flex justify-end"><div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tl-none shadow-md max-w-sm">نعم متوفرة، تفضل.</div></div>
             </div>
             <div className="p-4 bg-white border-t flex gap-2">
               <input type="text" placeholder="اكتب رسالة..." className="flex-1 bg-gray-100 rounded-xl px-4 py-2 outline-none" />
               <button className="bg-blue-600 text-white p-2 rounded-xl"><Send size={20}/></button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\messages\page.tsx", $ChatContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 7. التنظيف والتشغيل
# -----------------------------------------------------------
Write-Host "🧹 تنظيف أخير للكاش..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }

Write-Host "✅ تم البناء بنجاح! جميع الأنظمة جاهزة." -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر..." -ForegroundColor Green
npm run dev