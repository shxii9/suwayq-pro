"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { Search, SlidersHorizontal, LayoutGrid, Car, Smartphone, Home as HomeIcon } from "lucide-react";

const categories = ["الكل", "سيارات", "عقارات", "أجهزة", "أثاث"];

export default function SearchPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ q: "", category: "الكل", minPrice: 0, maxPrice: 100000 });

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const params = new URLSearchParams(filter);
      const res = await fetch(`/api/listings/search?${params}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, [filter]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617]" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-2 font-black text-lg mb-6 dark:text-white">
                <SlidersHorizontal size={20} className="text-blue-600" /> الفلترة المتقدمة
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">القسم</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <button 
                      key={c}
                      onClick={() => setFilter({...filter, category: c})}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter.category === c ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-gray-800 text-slate-600'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">السعر الأقصى: {filter.maxPrice} د.ك</label>
                <input 
                  type="range" min="0" max="200000" step="500"
                  value={filter.maxPrice}
                  onChange={(e) => setFilter({...filter, maxPrice: e.target.value})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <div className="flex-1">
            <div className="relative mb-8">
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="ابحث عن شيء محدد..."
                className="w-full h-14 pr-14 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 font-bold dark:text-white"
                onChange={(e) => setFilter({...filter, q: e.target.value})}
              />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
                {[1,2,3].map(i => <div key={i} className="h-80 bg-slate-200 dark:bg-gray-800 rounded-3xl"></div>)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map(item => <ListingCard key={item.id} item={item} />)}
                {listings.length === 0 && <p className="text-center col-span-full py-20 font-bold text-slate-400">لا توجد نتائج تطابق بحثك</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
