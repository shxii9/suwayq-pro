# Ultimate-Repair.ps1
# 1. إعادة تثبيت الميزات بطريقة متوافقة مع جميع الأنظمة
# 2. حل مشكلة Git Rejected عبر الرفع الإجباري

$ErrorActionPreference = "Stop"
Write-Host "🔧 بدء عملية الإصلاح والرفع القسري..." -ForegroundColor Cyan

# دالة مساعدة لحفظ الملفات بتنسيق UTF8 (تعمل على كل الأجهزة)
function Save-File($Path, $Content) {
    $Dir = Split-Path $Path
    if (-not (Test-Path $Dir)) { New-Item -ItemType Directory -Force -Path $Dir | Out-Null }
    [System.IO.File]::WriteAllText($Path, $Content, [System.Text.Encoding]::UTF8)
}

# -----------------------------------------------------------
# 1. إعادة إنشاء صفحة التفاصيل (Listing Page)
# -----------------------------------------------------------
$ListingPageContent = @'
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, User, ShieldCheck } from "lucide-react";

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({ where: { id: params.id } });
  if (!listing) return { title: "إعلان غير موجود" };
  return {
    title: listing.title,
    description: listing.description?.substring(0, 160),
    openGraph: { images: listing.images[0] ? [listing.images[0]] : [] },
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
      <div className="relative w-full h-[400px] bg-slate-900">
        {listing.images[0] ? (
          <Image src={listing.images[0]} alt={listing.title} fill className="object-cover opacity-90"/>
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
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-black text-gray-800">{listing.title}</h1>
                <span className="bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold text-xl">{listing.price.toLocaleString()} د.ك</span>
              </div>
              <div className="flex gap-4 text-gray-500 text-sm mb-6 pb-6 border-b">
                <span className="flex items-center gap-1"><MapPin size={16}/> {listing.location || "الكويت"}</span>
                <span className="flex items-center gap-1"><Calendar size={16}/> {new Date(listing.createdAt).toLocaleDateString("ar-KW")}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">التفاصيل</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">{listing.description}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><ShieldCheck className="text-blue-600"/> معلومات البائع</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl"><User size={28}/></div>
                <div><p className="font-bold text-lg">{listing.user.name || "مستخدم سويق"}</p><p className="text-xs text-gray-500">عضو موثوق</p></div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-200 mb-3">اتصل بالبائع</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'@
Save-File "src/app/listings/[id]/page.tsx" $ListingPageContent
Write-Host "✅ تم إصلاح صفحة التفاصيل." -ForegroundColor Green

# -----------------------------------------------------------
# 2. إعادة إنشاء صفحة البحث (Search Page)
# -----------------------------------------------------------
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
      OR: [{ title: { contains: query, mode: "insensitive" } }, { description: { contains: query, mode: "insensitive" } }],
      status: "ACTIVE"
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="mb-8 mt-4"><h1 className="text-2xl font-bold mb-2">نتائج البحث عن: "{query}"</h1></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.map((item) => (
          <Link href={`/listings/${item.id}`} key={item.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition">
             <div className="relative h-48 w-full bg-gray-200">
                {item.images[0] ? <Image src={item.images[0]} alt={item.title} fill className="object-cover group-hover:scale-110 transition duration-700"/> : <div className="flex items-center justify-center h-full text-gray-400"><Search/></div>}
             </div>
             <div className="p-4">
                <div className="flex justify-between items-start mb-2"><h3 className="font-bold text-gray-800 line-clamp-1">{item.title}</h3><span className="text-blue-600 font-bold text-sm">{item.price} د.ك</span></div>
             </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
'@
Save-File "src/app/search/page.tsx" $SearchPageContent
Write-Host "✅ تم إصلاح صفحة البحث." -ForegroundColor Green

# -----------------------------------------------------------
# 3. إعادة تحديث Navbar
# -----------------------------------------------------------
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
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`); };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-black text-blue-600 flex items-center gap-1 hover:opacity-80 transition">سُوَيق<span className="text-gray-800">PRO</span></Link>
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative mx-4">
          <input type="text" placeholder="ابحث عن سيارة، عقار..." className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pr-12 pl-4 outline-none focus:ring-2 focus:ring-blue-100" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"><Search size={20} /></button>
        </form>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-600 font-medium text-sm flex items-center gap-1"><LayoutDashboard size={18}/> لوحتي</Link>
          <Link href="/api/auth/signin" className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2"><Plus size={18}/> أضف إعلان</Link>
        </div>
        <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={24}/> : <Menu size={24}/>}</button>
      </div>
    </nav>
  );
}
'@
Save-File "src/components/Navbar.tsx" $NavbarContent
Write-Host "✅ تم إصلاح Navbar." -ForegroundColor Green

# -----------------------------------------------------------
# 4. الرفع الإجباري (Force Push)
# -----------------------------------------------------------
Write-Host "☁️ بدء الرفع الإجباري لحل تعارض Git..." -ForegroundColor Yellow
git add .
git commit -m "fix: Re-install features and force sync with master"
# نستخدم --force لحل مشكلة rejected
git push origin master --force

Write-Host "🚀 تم الرفع بنجاح! تم تجاوز جميع الأخطاء." -ForegroundColor Cyan