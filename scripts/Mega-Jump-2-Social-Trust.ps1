# Mega-Jump-2-Social-Trust.ps1
# بناء نظام الثقة: بروفايل البائع، التقييمات، والتعليقات.

$ErrorActionPreference = "Stop"
Write-Host "⭐ تثبيت نظام الثقة والمجتمع..." -ForegroundColor Cyan

$AppDir = "src\app"
New-Item -ItemType Directory -Force -Path "$AppDir\seller\[id]" | Out-Null

# صفحة البائع العلنية (Public Seller Profile)
$SellerContent = @'
import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { listings } from "@/lib/data";
import { MapPin, Calendar, Star, ShieldCheck, MessageCircle, Phone } from "lucide-react";

export default function SellerProfile() {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      
      {/* Header Cover */}
      <div className="h-48 bg-gradient-to-r from-slate-800 to-slate-900"></div>
      
      <div className="container mx-auto px-4 -mt-16 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Info */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 text-center relative">
              <div className="w-32 h-32 bg-white p-1 rounded-full mx-auto -mt-20 mb-4 shadow-sm">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-full h-full rounded-full bg-gray-100" />
              </div>
              
              <h1 className="text-2xl font-black text-gray-900 flex items-center justify-center gap-2">
                معرض الفخامة للسيارات <ShieldCheck className="text-blue-500" size={20} />
              </h1>
              <div className="flex justify-center items-center gap-1 text-yellow-400 my-2">
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} className="text-gray-300" />
                <span className="text-gray-500 text-sm mr-1">(4.0)</span>
              </div>
              
              <p className="text-gray-500 mb-6">نبيع ونشتري جميع أنواع السيارات الفارهة. ثقة، أمان، وسرعة في المعاملة.</p>
              
              <div className="flex justify-center gap-4 text-sm text-gray-500 mb-8">
                <span className="flex items-center gap-1"><MapPin size={16}/> الشويخ الصناعية</span>
                <span className="flex items-center gap-1"><Calendar size={16}/> عضو منذ 2019</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition">
                  <Phone size={18} /> اتصال
                </button>
                <button className="bg-gray-100 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition">
                  <MessageCircle size={18} /> دردشة
                </button>
              </div>
            </div>

            {/* Reviews Widget */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-6">
              <h3 className="font-bold mb-4">آراء العملاء (124)</h3>
              <div className="space-y-4">
                {[1, 2].map((r) => (
                  <div key={r} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-sm">عبدالله المري</span>
                      <div className="flex text-yellow-400 text-xs"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                    </div>
                    <p className="text-gray-500 text-sm">تعامل راقي جداً والسيارة كانت نظيفة كما بالوصف. أنصح بالتعامل معهم.</p>
                  </div>
                ))}
                <button className="w-full text-blue-600 text-sm font-bold mt-2">عرض كل التقييمات</button>
              </div>
            </div>
          </aside>

          {/* Listings */}
          <main className="flex-1">
            <h2 className="text-2xl font-bold mb-6 border-r-4 border-blue-600 pr-3">إعلانات المعرض (45)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((item) => (
                <ListingCard key={item.id} item={item} />
              ))}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\seller\[id]\page.tsx", $SellerContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم بناء نظام الثقة والبروفايل بنجاح!" -ForegroundColor Green