# Build-Full-Suwayq.ps1
# يحول مشروع Next.js الفارغ إلى منصة سُوَيق متكاملة (صفحات، مكونات، بيانات)

$ErrorActionPreference = "Stop"
Write-Host "🚀 بدء بناء منصة سُوَيق المتكاملة..." -ForegroundColor Cyan

# 1. تثبيت المكتبات الإضافية الضرورية (أيقونات)
Write-Host "📦 تثبيت مكتبة الأيقونات..." -ForegroundColor Yellow
cmd /c "npm install lucide-react clsx tailwind-merge"

# 2. إنشاء هيكل المجلدات
$AppDir = "src\app"
$CompDir = "src\components"
$LibDir = "src\lib"

New-Item -ItemType Directory -Force -Path "$AppDir\listings\[id]" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\create" | Out-Null
New-Item -ItemType Directory -Force -Path $CompDir | Out-Null
New-Item -ItemType Directory -Force -Path $LibDir | Out-Null

# -----------------------------------------------------------
# 3. إنشاء ملف البيانات الوهمية (قاعدة بيانات محلية)
# -----------------------------------------------------------
Write-Host "📝 إنشاء قاعدة البيانات المحلية (lib/data.ts)..." -ForegroundColor Cyan
$DataContent = @'
export const listings = [
  { 
    id: 1, 
    title: "iPhone 15 Pro Max - 256GB", 
    price: "450 د.ك", 
    location: "حولي", 
    category: "إلكترونيات",
    description: "تلفون جديد بالكرتون لم يفتح، كفالة سنة الغانم. اللون تيتانيوم طبيعي.",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
    date: "منذ ساعة"
  },
  { 
    id: 2, 
    title: "تويوتا لاند كروزر GXR 2023", 
    price: "22,500 د.ك", 
    location: "الشويخ", 
    category: "سيارات",
    description: "شرط الفحص قير مكينة شاصي بدي. صبغ الوكالة. ماشية 15 ألف فقط.",
    image: "https://images.unsplash.com/photo-1594502184342-2b12f8a65202?auto=format&fit=crop&q=80&w=800",
    date: "منذ 3 ساعات"
  },
  { 
    id: 3, 
    title: "شقة للإيجار في السالمية", 
    price: "350 د.ك", 
    location: "السالمية", 
    category: "عقارات",
    description: "غرفتين وصالة وحمامين ومطبخ مجهز. اطلالة بحرية مميزة. شامل الماء والكهرباء.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    date: "منذ يوم"
  },
  { 
    id: 4, 
    title: "MacBook Pro M3 Max", 
    price: "900 د.ك", 
    location: "القرين", 
    category: "كمبيوتر",
    description: "الجهاز الجبار للمحترفين. رام 32 جيجا، هاردسك 1 تيرا. استخدام خفيف جداً.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=800",
    date: "منذ يومين"
  },
  { 
    id: 5, 
    title: "ساعة رولكس صب مارينر", 
    price: "3,200 د.ك", 
    location: "العاصمة", 
    category: "ساعات",
    description: "أصلية 100% مع العلبة والضمان. بحالة ممتازة جداً.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800",
    date: "منذ أسبوع"
  },
  { 
    id: 6, 
    title: "بلايستيشن 5 سليم", 
    price: "140 د.ك", 
    location: "الجهراء", 
    category: "ألعاب",
    description: "جديدة بالكرتون مع يدتين ولعبة فيفا 24.",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800",
    date: "منذ 5 ساعات"
  }
];
'@
[System.IO.File]::WriteAllText("$LibDir\data.ts", $DataContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 4. إنشاء المكونات (Navbar, Footer, Card)
# -----------------------------------------------------------
Write-Host "🔨 إنشاء المكونات (Navbar, Footer)..." -ForegroundColor Cyan

# Navbar
$NavContent = @'
import Link from "next/link";
import { PlusCircle, User, Menu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter flex items-center gap-1">
          سُوَيق <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">PRO</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2">
            <User size={18} /> تسجيل الدخول
          </Link>
          <Link href="/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-blue-200">
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

# Listing Card
$CardContent = @'
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

export function ListingCard({ item }: { item: any }) {
  return (
    <Link href={`/listings/${item.id}`} className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-56 bg-gray-200 overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1">
          <MapPin size={12} /> {item.location}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 line-clamp-1 flex-1 ml-2 group-hover:text-blue-600 transition">{item.title}</h3>
          <span className="text-blue-600 font-black text-lg whitespace-nowrap">{item.price}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 border-t pt-3">
          <span className="bg-gray-50 px-2 py-1 rounded text-gray-600">{item.category}</span>
          <span className="flex items-center gap-1 ml-auto"><Clock size={12} /> {item.date}</span>
        </div>
      </div>
    </Link>
  );
}
'@
[System.IO.File]::WriteAllText("$CompDir\ListingCard.tsx", $CardContent, [System.Text.Encoding]::UTF8)

# -----------------------------------------------------------
# 5. إنشاء الصفحات (Home, Details, Create)
# -----------------------------------------------------------
Write-Host "📄 إنشاء الصفحات..." -ForegroundColor Cyan

# Home Page
$HomeContent = @'
import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { listings } from "@/lib/data";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-right font-sans" dir="rtl">
      <Navbar />
      
      {/* Hero */}
      <div className="bg-blue-600 text-white pb-24 pt-16 rounded-b-[3rem] shadow-xl px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">ابحث.. اشتري.. وبيع <br/> <span className="text-orange-400">بكل سهولة</span></h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">المنصة الأحدث في الكويت للإعلانات المبوبة. آلاف المستخدمين بانتظار إعلانك.</p>
          
          <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto flex items-center transform translate-y-8">
            <Search className="text-gray-400 mr-3 ml-2" />
            <input type="text" placeholder="ما الذي تبحث عنه؟ (سيارات، عقارات...)" className="flex-1 py-3 text-gray-800 outline-none text-lg" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition">بحث</button>
          </div>
        </div>
      </div>

      {/* Listings */}
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">أحدث الإعلانات المضافة</h2>
          <button className="text-blue-600 font-bold hover:underline">مشاهدة الكل</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-10 text-center">
        <p className="opacity-70">© 2025 منصة سُوَيق برو. صنع بكل فخر.</p>
      </footer>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\page.tsx", $HomeContent, [System.Text.Encoding]::UTF8)

# Details Page
$DetailsContent = @'
import { Navbar } from "@/components/Navbar";
import { listings } from "@/lib/data";
import { MapPin, Calendar, Share2, Heart, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ListingDetails({ params }: { params: { id: string } }) {
  const item = listings.find((l) => l.id === parseInt(params.id)) || listings[0];

  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <img src={item.image} alt={item.title} className="w-full h-[400px] object-cover" />
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-black text-gray-900">{item.title}</h1>
                <h2 className="text-3xl font-black text-blue-600">{item.price}</h2>
              </div>
              
              <div className="flex gap-4 text-gray-500 mb-6 text-sm border-b pb-6">
                <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full"><MapPin size={14} /> {item.location}</span>
                <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full"><Calendar size={14} /> {item.date}</span>
                <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">#{item.category}</span>
              </div>

              <h3 className="text-xl font-bold mb-3">الوصف</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
              <h3 className="font-bold text-lg mb-1">محمد أحمد</h3>
              <p className="text-gray-500 text-sm mb-6">عضو منذ 2023</p>
              
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 mb-3 transition">
                <Phone size={20} /> اتصل بالبائع
              </button>
              <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                <Share2 size={20} /> مشاركة الإعلان
              </button>
            </div>

            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">نصائح للأمان</h4>
                  <p className="text-sm text-blue-700/80">لا تقم بتحويل الأموال قبل معاينة السلعة. قابل البائع في مكان عام.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\listings\[id]\page.tsx", $DetailsContent, [System.Text.Encoding]::UTF8)

# Create Listing Page
$CreateContent = @'
import { Navbar } from "@/components/Navbar";
import { Upload, Camera } from "lucide-react";

export default function CreateListing() {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl font-black text-gray-900 mb-8">إضافة إعلان جديد</h1>
        
        <form className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
          
          {/* صور الإعلان */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:bg-gray-50 transition cursor-pointer group">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <Camera size={32} />
            </div>
            <h3 className="font-bold text-gray-700 mb-1">أضف صور الإعلان</h3>
            <p className="text-gray-400 text-sm">يمكنك إضافة حتى 5 صور</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-bold text-gray-700 mb-2">عنوان الإعلان</label>
              <input type="text" placeholder="مثال: ايفون 15 برو ماكس مستعمل نظيف" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-2">السعر (د.ك)</label>
                <input type="number" placeholder="000" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-2">القسم</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>سيارات</option>
                  <option>عقارات</option>
                  <option>إلكترونيات</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-2">الوصف</label>
              <textarea rows={5} placeholder="اكتب وصفاً مفصلاً للسلعة..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
            </div>
          </div>

          <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-blue-200 transition">
            نشر الإعلان فوراً
          </button>
        </form>
      </main>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\create\page.tsx", $CreateContent, [System.Text.Encoding]::UTF8)

Write-Host "`n✅ تم بناء المشروع بالكامل!" -ForegroundColor Green
Write-Host "👉 الآن شغل المشروع واستمتع بالنتيجة: npm run dev" -ForegroundColor Green