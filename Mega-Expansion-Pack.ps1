# Mega-Expansion-Pack.ps1
# يقوم ببناء 4 أنظمة ضخمة دفعة واحدة: لوحة التحكم، الدخول، المفضلة، والتصنيفات.

$ErrorActionPreference = "Stop"
Write-Host "🏗️ بدء تثبيت حزمة التوسع العملاقة لمشروع سُوَيق برو..." -ForegroundColor Cyan

$AppDir = "src\app"
$CompDir = "src\components"

# 1. إنشاء المجلدات الجديدة
New-Item -ItemType Directory -Force -Path "$AppDir\dashboard" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\login" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\register" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\saved" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\categories" | Out-Null

# -----------------------------------------------------------
# 1. بناء نظام لوحة التحكم (Dashboard System)
# -----------------------------------------------------------
Write-Host "📊 بناء لوحة تحكم المستخدم..." -ForegroundColor Yellow
$DashboardContent = @'
import { Navbar } from "@/components/Navbar";
import { listings } from "@/lib/data";
import { BarChart3, Eye, MessageCircle, Package, Settings, LogOut, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                م
              </div>
              <div>
                <h3 className="font-bold">محمد أحمد</h3>
                <p className="text-xs text-gray-500">عضو مميز</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-bold">
                <BarChart3 size={20} /> لوحة المعلومات
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-600 hover:bg-gray-50 px-4 py-3 rounded-xl transition">
                <Package size={20} /> إعلاناتي <span className="mr-auto bg-gray-100 px-2 rounded text-xs">4</span>
              </a>
              <a href="/saved" className="flex items-center gap-3 text-gray-600 hover:bg-gray-50 px-4 py-3 rounded-xl transition">
                <HeartIcon /> المفضلة
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-600 hover:bg-gray-50 px-4 py-3 rounded-xl transition">
                <MessageCircle size={20} /> الرسائل
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-600 hover:bg-gray-50 px-4 py-3 rounded-xl transition">
                <Settings size={20} /> الإعدادات
              </a>
              <div className="pt-4 mt-4 border-t">
                <a href="#" className="flex items-center gap-3 text-red-500 hover:bg-red-50 px-4 py-3 rounded-xl transition">
                  <LogOut size={20} /> تسجيل الخروج
                </a>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <h1 className="text-2xl font-black text-gray-900 mb-6">نظرة عامة</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Eye size={24} /></div>
                <span className="text-green-500 text-sm font-bold flex items-center gap-1">+12% <TrendingUp size={14}/></span>
              </div>
              <p className="text-gray-500 text-sm">إجمالي المشاهدات</p>
              <h3 className="text-3xl font-black text-gray-900">1,245</h3>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-orange-100 p-3 rounded-xl text-orange-600"><Package size={24} /></div>
              </div>
              <p className="text-gray-500 text-sm">الإعلانات النشطة</p>
              <h3 className="text-3xl font-black text-gray-900">4</h3>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-purple-100 p-3 rounded-xl text-purple-600"><MessageCircle size={24} /></div>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">2 جديد</span>
              </div>
              <p className="text-gray-500 text-sm">رسائل المهتمين</p>
              <h3 className="text-3xl font-black text-gray-900">18</h3>
            </div>
          </div>

          {/* Recent Listings Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="font-bold text-lg">آخر إعلاناتك</h2>
              <button className="text-blue-600 text-sm font-bold">إدارة الكل</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-500 text-sm">
                  <tr>
                    <th className="py-4 px-6 text-right">الإعلان</th>
                    <th className="py-4 px-6 text-right">السعر</th>
                    <th className="py-4 px-6 text-right">المشاهدات</th>
                    <th className="py-4 px-6 text-right">الحالة</th>
                    <th className="py-4 px-6 text-right">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {listings.slice(0, 4).map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={item.image} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-bold text-gray-800 line-clamp-1">{item.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-blue-600">{item.price}</td>
                      <td className="py-4 px-6 text-gray-600">{(item.id * 124) + 40}</td>
                      <td className="py-4 px-6"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">نشط</span></td>
                      <td className="py-4 px-6 text-sm">
                        <button className="text-gray-500 hover:text-blue-600 ml-3">تعديل</button>
                        <button className="text-red-500 hover:text-red-700">حذف</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

function HeartIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
}
'@
[System.IO.File]::WriteAllText("$AppDir\dashboard\page.tsx", $DashboardContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 2. بناء نظام التوثيق (Login/Register)
# -----------------------------------------------------------
Write-Host "🔐 بناء صفحات تسجيل الدخول..." -ForegroundColor Yellow
$LoginContent = @'
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-white flex" dir="rtl">
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <Link href="/" className="text-gray-400 hover:text-gray-800 flex items-center gap-2 mb-10 w-fit">
          <ArrowRight size={20} /> العودة للرئيسية
        </Link>
        
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl font-black text-gray-900 mb-2">مرحباً بعودتك! 👋</h1>
          <p className="text-gray-500 mb-8">سجل دخولك لإدارة إعلاناتك والتواصل مع البائعين.</p>
          
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
              <input type="email" placeholder="name@example.com" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
              <input type="password" placeholder="••••••••" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              <div className="text-left mt-2">
                <a href="#" className="text-sm text-blue-600 hover:underline">نسيت كلمة المرور؟</a>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition">
              تسجيل الدخول
            </button>
          </form>

          <div className="mt-8 text-center text-gray-500 text-sm">
            ليس لديك حساب؟ <Link href="/register" className="text-blue-600 font-bold hover:underline">إنشاء حساب جديد</Link>
          </div>
        </div>
      </div>
      
      {/* Left Side - Image */}
      <div className="hidden lg:block w-1/2 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute bottom-16 right-16 text-white max-w-lg z-10">
          <h2 className="text-5xl font-black mb-6 leading-tight">المكان الأمثل لبيع وشراء كل شيء.</h2>
          <p className="text-xl text-blue-100">انضم لأكثر من 50,000 مستخدم في الكويت.</p>
        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\login\page.tsx", $LoginContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 3. بناء صفحة التصنيفات (Categories Hub)
# -----------------------------------------------------------
Write-Host "📂 بناء صفحة التصنيفات..." -ForegroundColor Yellow
$CatsContent = @'
import { Navbar } from "@/components/Navbar";
import { Car, Home, Laptop, Watch, Gamepad2, Shirt, Armchair, Briefcase, ChevronLeft } from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "السيارات والمركبات", count: "4,200+", icon: Car, color: "bg-orange-100 text-orange-600" },
  { name: "العقارات", count: "1,500+", icon: Home, color: "bg-blue-100 text-blue-600" },
  { name: "الإلكترونيات", count: "8,900+", icon: Laptop, color: "bg-purple-100 text-purple-600" },
  { name: "الساعات والمجوهرات", count: "850+", icon: Watch, color: "bg-yellow-100 text-yellow-700" },
  { name: "ألعاب الفيديو", count: "2,100+", icon: Gamepad2, color: "bg-red-100 text-red-600" },
  { name: "الأزياء والموضة", count: "5,300+", icon: Shirt, color: "bg-pink-100 text-pink-600" },
  { name: "الأثاث والديكور", count: "3,200+", icon: Armchair, color: "bg-green-100 text-green-600" },
  { name: "الوظائف والخدمات", count: "450+", icon: Briefcase, color: "bg-cyan-100 text-cyan-600" },
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-black text-gray-900 mb-2">تصفح الأقسام</h1>
        <p className="text-gray-500 mb-10">اختر القسم المناسب لما تبحث عنه</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link key={idx} href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition group">
              <div className={`w-14 h-14 ${cat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                <cat.icon size={28} />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{cat.name}</h3>
                  <p className="text-xs text-gray-400 font-medium">{cat.count} إعلان</p>
                </div>
                <ChevronLeft size={20} className="text-gray-300 group-hover:text-blue-600 transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\categories\page.tsx", $CatsContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 4. بناء صفحة المفضلة (Favorites)
# -----------------------------------------------------------
Write-Host "❤️ بناء صفحة المفضلة..." -ForegroundColor Yellow
$SavedContent = @'
import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { listings } from "@/lib/data";

export default function SavedItems() {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-black text-gray-900 mb-8">الإعلانات المحفوظة ❤️</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.slice(0, 3).map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\saved\page.tsx", $SavedContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 5. تحديث الـ Navbar لربط الصفحات الجديدة
# -----------------------------------------------------------
Write-Host "🔗 تحديث القائمة العلوية لربط الصفحات..." -ForegroundColor Yellow
$NavContent = @'
import Link from "next/link";
import { PlusCircle, User, Menu, LayoutGrid, Heart } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter flex items-center gap-1">
          سُوَيق <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">PRO</span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition">الرئيسية</Link>
            <Link href="/categories" className="hover:text-blue-600 transition flex items-center gap-1"><LayoutGrid size={16}/> الأقسام</Link>
            <Link href="/saved" className="hover:text-blue-600 transition flex items-center gap-1"><Heart size={16}/> المفضلة</Link>
        </div>

        {/* Right Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-bold text-sm flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-transparent hover:border-gray-200 transition">
            <User size={18} /> حسابي
          </Link>
          <Link href="/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-blue-200 text-sm">
            <PlusCircle size={18} /> أضف إعلانك
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-gray-600">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
'@
[System.IO.File]::WriteAllText("$CompDir\Navbar.tsx", $NavContent, [System.Text.Encoding]::UTF8)

Write-Host "`n✅ تم تثبيت حزمة التوسع بنجاح!" -ForegroundColor Green
Write-Host "🚀 مشروعك أصبح الآن يحتوي على 8 صفحات وأنظمة متكاملة." -ForegroundColor Green
Write-Host "👉 قم بالتحديث في المتصفح لرؤية التغييرات فوراً." -ForegroundColor Green