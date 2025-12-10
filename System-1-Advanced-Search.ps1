# System-1-Advanced-Search.ps1
# بناء نظام البحث المتقدم والفلترة

$ErrorActionPreference = "Stop"
Write-Host "🔍 بناء محرك البحث المتقدم..." -ForegroundColor Cyan

$SearchDir = "src\app\search"
if (-not (Test-Path $SearchDir)) { New-Item -ItemType Directory -Force -Path $SearchDir | Out-Null }

$SearchContent = @'
import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { listings } from "@/lib/data";
import { Filter, MapPin, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function AdvancedSearch() {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 sticky top-24">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="font-bold text-lg flex items-center gap-2"><SlidersHorizontal size={20} /> الفلاتر</h2>
                <button className="text-sm text-blue-600 font-bold hover:underline">مسح الكل</button>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-3 text-sm">الموقع</h3>
                <div className="relative">
                  <MapPin size={18} className="absolute top-3 right-3 text-gray-400" />
                  <select className="w-full p-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                    <option>جميع المناطق</option>
                    <option>العاصمة</option>
                    <option>حولي</option>
                    <option>الفروانية</option>
                    <option>الجهراء</option>
                  </select>
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-3 text-sm">القسم</h3>
                <div className="space-y-2">
                  {["الكل", "سيارات", "عقارات", "إلكترونيات", "وظائف"].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition">
                      <input type="radio" name="category" className="w-4 h-4 text-blue-600" defaultChecked={cat === "الكل"} />
                      <span className="text-gray-600 text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-700 mb-3 text-sm">السعر (د.ك)</h3>
                <div className="flex gap-2 items-center">
                  <input type="number" placeholder="من" className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-center" />
                  <span className="text-gray-400">-</span>
                  <input type="number" placeholder="إلى" className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-center" />
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-100">
                تطبيق الفلتر
              </button>
            </div>
          </aside>

          {/* Results Area */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-600 font-bold">تم العثور على <span className="text-blue-600">142</span> إعلان</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:inline">ترتيب حسب:</span>
                <select className="bg-gray-50 border-none text-sm font-bold text-gray-700 rounded-lg p-2 cursor-pointer focus:ring-0">
                  <option>الأحدث</option>
                  <option>الأقل سعراً</option>
                  <option>الأعلى سعراً</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((item) => (
                <ListingCard key={item.id} item={item} />
              ))}
              {listings.map((item) => (
                <ListingCard key={item.id + 99} item={{...item, id: item.id + 99}} />
              ))}
            </div>
            
            <div className="mt-10 flex justify-center">
              <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition">
                تحميل المزيد
              </button>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$SearchDir\page.tsx", $SearchContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم بناء نظام البحث بنجاح!" -ForegroundColor Green