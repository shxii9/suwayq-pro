"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { Search, Mic, LayoutGrid, Car, Smartphone, Home as HomeIcon, Sofa, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link"; // السطر الذي كان مفقوداً

const categories = [
  { label: "الكل", icon: LayoutGrid, color: "bg-blue-600 text-white shadow-blue-200" },
  { label: "سيارات", icon: Car, color: "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400" },
  { label: "عقارات", icon: HomeIcon, color: "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400" },
  { label: "أجهزة", icon: Smartphone, color: "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400" },
  { label: "أثاث", icon: Sofa, color: "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400" },
];

export default function Home() {
  const listings = [
    { id: "1", title: "تويوتا لاندكروزر 2024", price: 32000, location: "الشويخ", image: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=500" },
    { id: "2", title: "ماكبوك برو M3 Max", price: 1600, location: "حولي", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-500" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-5 py-2 rounded-full text-xs font-black mb-6 animate-pulse">
            <Sparkles size={14} /> منصة البيع الأولى في الكويت
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            بيع أي شيء.. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 text-blue-600">بثواني</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            استمتع بتجربة بيع وشراء آمنة مدعومة بالذكاء الاصطناعي وأحدث ميزات البحث الصوتي.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl p-3 rounded-[2.2rem] border border-white/20 dark:border-gray-800 flex flex-col md:flex-row gap-3 shadow-2xl">
            <div className="relative flex-1">
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
              <input type="text" placeholder="ابحث عن سيارة، هاتف، أو عقار..." className="w-full h-16 pr-14 bg-transparent font-bold outline-none dark:text-white text-lg" />
            </div>
            <div className="flex gap-2">
              <button className="h-16 w-16 flex items-center justify-center bg-slate-100 dark:bg-gray-800 rounded-3xl text-slate-500 hover:text-blue-600"><Mic size={24} /></button>
              <button className="h-16 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-black text-lg">ابحث الآن</button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-12 no-scrollbar justify-start md:justify-center">
          {categories.map((cat, i) => (
            <button key={i} className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] whitespace-nowrap font-black transition-all ${cat.color}`}>
              <cat.icon size={20} /> {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8 px-2">
          <Link href="/search" className="text-blue-600 dark:text-blue-400 font-black text-sm hover:underline">عرض الكل ←</Link>
          <div className="flex items-center gap-2 font-black text-xl text-slate-800 dark:text-white">
             أحدث الإعلانات <TrendingUp className="text-orange-500" size={20} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {listings.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
