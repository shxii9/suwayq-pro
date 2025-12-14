# Auto-Features-Install.ps1
# يقوم بإنشاء صفحات التفاصيل، البحث، وتحديث النافبار تلقائياً

$ErrorActionPreference = "Stop"
Write-Host "🚀 بدء إضافة الميزات الجديدة (صفحة التفاصيل + البحث)..." -ForegroundColor Cyan

# -----------------------------------------------------------
# 1. إنشاء صفحة تفاصيل الإعلان [id]/page.tsx
# -----------------------------------------------------------
$ListingDir = "src/app/listings/[id]"
if (-not (Test-Path $ListingDir)) { New-Item -ItemType Directory -Force -Path $ListingDir | Out-Null }

$ListingPagePath = "$ListingDir/page.tsx"
$ListingPageContent = @'
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, User, ShieldCheck } from "lucide-react";

const prisma = new PrismaClient();

// SEO ديناميكي لكل إعلان
export async function generateMetadata({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({ where: { id: params.id } });
  if (!listing) return { title: "إعلان غير موجود" };
  return {
    title: listing.title,
    description: listing.description?.substring(0, 160),
    openGraph: {
      images: listing.images[0] ? [listing.images[0]] : [],
    },
  };
}

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: { user: true }
  });

  if (!listing) notFound();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Image */}
      <div className="relative w-full h-[400px] bg-slate-900">
        {listing.images[0] ? (
          <Image 
            src={listing.images[0]} 
            alt={listing.title} 
            fill 
            className="object-cover opacity-90"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">لا توجد صورة</div>
        )}
        <div className="absolute top-4 right-4">
          <Link href="/" className="bg-white/90 p-2 rounded-full hover:bg-white transition flex items-center gap-2 px-4 text-sm font-bold">
            <ArrowRight size={18} /> عودة للرئيسية
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-black text-gray-800">{listing.title}</h1>
                <span className="bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold text-xl">
                  {listing.price.toLocaleString()} د.ك
                </span>
              </div>
              
              <div className="flex gap-4 text-gray-500 text-sm mb-6 pb-6 border-b">
                <span className="flex items-center gap-1"><MapPin size={16}/> {listing.location || "الكويت"}</span>
                <span className="flex items-center gap-1"><Calendar size={16}/> {new Date(listing.createdAt).toLocaleDateString("ar-KW")}</span>
              </div>

              <h3 className="text-xl font-bold mb-3">التفاصيل</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                {listing.description || "لا يوجد وصف متاح لهذا الإعلان."}
              </p>
            </div>
          </div>

          {/* Sidebar / Seller Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-blue-600"/> معلومات البائع
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  <User size={28}/>
                </div>
                <div>
                  <p className="font-bold text-lg">{listing.user.name || "مستخدم سويق"}</p>
                  <p className="text-xs text-gray-500">عضو موثوق</p>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-200 mb-3">
                اتصل بالبائع
              </button>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-green-200">
                واتساب
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
'@
Set-Content -Path $ListingPagePath -Value $ListingPageContent -Encoding UTF8
Write-Host "✅ تم إنشاء صفحة تفاصيل الإعلان (Dynamic Listing Page)." -ForegroundColor Green

# -----------------------------------------------------------
# 2. إنشاء صفحة البحث /search/page.tsx
# -----------------------------------------------------------
$SearchDir = "src/app/search"
if (-not (Test-Path $SearchDir)) { New-Item -ItemType Directory -Force -Path $SearchDir | Out-Null }

$SearchPagePath = "$SearchDir/page.tsx"
$SearchPageContent = @'
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Clock } from "lucide-react";

const prisma = new PrismaClient();

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  
  const listings = await prisma.listing.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
      status: "ACTIVE"
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="mb-8 mt-4">
        <h1 className="text-2xl font-bold mb-2">نتائج البحث عن: "{query}"</h1>
        <p className="text-gray-500">تم العثور على {listings.length} إعلان</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.map((item) => (
          <Link href={`/listings/${item.id}`} key={item.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300">
             <div className="relative h-48 w-full bg-gray-200">
                {item.images[0] ? (
                  <Image 
                    src={item.images[0]} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400"><Search/></div>
                )}
             </div>
             <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                   <span className="text-blue-600 font-bold text-sm">{item.price} د.ك</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400 mt-3">
                   <span className="flex items-center gap-1"><MapPin size={12}/> {item.location || "الكويت"}</span>
                   <span className="flex items-center gap-1"><Clock size={12}/> {new Date(item.createdAt).toLocaleDateString("ar-KW")}</span>
                </div>
             </div>
          </Link>
        ))}
        
        {listings.length === 0 && (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl">
            <Search className="mx-auto h-12 w-12 text-gray-300 mb-4"/>
            <h3 className="text-lg font-bold text-gray-600">لم يتم العثور على نتائج</h3>
            <p className="text-gray-400">حاول البحث بكلمات مختلفة</p>
          </div>
        )}
      </div>
    </div>
  );
}
'@
Set-Content -Path $SearchPagePath -Value $SearchPageContent -Encoding UTF8
Write-Host "✅ تم إنشاء صفحة البحث (Search Page)." -ForegroundColor Green

# -----------------------------------------------------------
# 3. تحديث Navbar.tsx ليعمل البحث فيه
# -----------------------------------------------------------
$NavbarPath = "src/components/Navbar.tsx"
$NavbarContent = @'
"use client";
import Link from "next/link";
import { Search, Plus, User, Menu, LayoutDashboard, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-blue-600 flex items-center gap-1 hover:opacity-80 transition">
          سُوَيق<span className="text-gray-800">PRO</span>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative mx-4">
          <input 
            type="text" 
            placeholder="ابحث عن سيارة، عقار، وظيفة..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pr-12 pl-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
            <Search size={20} />
          </button>
        </form>

        {/* Actions - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium text-sm flex items-center gap-1 transition">
            <LayoutDashboard size={18} /> لوحتي
          </Link>
          <Link href="/messages" className="text-gray-600 hover:text-blue-600 font-medium text-sm flex items-center gap-1 transition">
            <MessageCircle size={18} /> الرسائل
          </Link>
          <Link href="/admin" className="hidden lg:flex text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100 items-center gap-1">
             الإدارة
          </Link>
          <Link href="/api/auth/signin" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition shadow-lg shadow-blue-200">
            <Plus size={18} /> أضف إعلان
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 absolute w-full shadow-xl">
          <form onSubmit={handleSearch} className="relative mb-4">
            <input 
              type="text" 
              placeholder="ابحث..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-10 pl-4 outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-3.5 text-gray-400" size={18}/>
          </form>
          <div className="flex flex-col gap-3">
             <Link href="/dashboard" className="p-3 hover:bg-gray-50 rounded-xl flex items-center gap-3 font-bold text-gray-700"><LayoutDashboard size={20}/> لوحتي</Link>
             <Link href="/messages" className="p-3 hover:bg-gray-50 rounded-xl flex items-center gap-3 font-bold text-gray-700"><MessageCircle size={20}/> الرسائل</Link>
             <Link href="/api/auth/signin" className="bg-blue-600 text-white p-3 rounded-xl flex items-center justify-center gap-2 font-bold"><Plus size={20}/> أضف إعلان</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
'@
Set-Content -Path $NavbarPath -Value $NavbarContent -Encoding UTF8
Write-Host "✅ تم تحديث Navbar ليدعم البحث الحقيقي." -ForegroundColor Green

Write-Host "🎉 تم تثبيت جميع الميزات بنجاح!" -ForegroundColor Cyan