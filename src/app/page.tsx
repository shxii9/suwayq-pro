"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { Search, Mic, LayoutGrid, Car, Smartphone, Home as HomeIcon, Sofa, Sparkles } from "lucide-react";

const categories = [
  { label: "الكل", icon: LayoutGrid, color: "bg-gray-100" },
  { label: "سيارات", icon: Car, color: "bg-blue-50 text-blue-600" },
  { label: "عقارات", icon: HomeIcon, color: "bg-green-50 text-green-600" },
  { label: "أجهزة", icon: Smartphone, color: "bg-purple-50 text-purple-600" },
  { label: "أثاث", icon: Sofa, color: "bg-orange-50 text-orange-600" },
];

export default function Home() {
  const listings = [
    { id: "1", title: "آيفون 15 برو ماكس", price: 320, location: "حولي", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500" },
    { id: "2", title: "تويوتا لاندكروزر 2024", price: 25000, location: "الجهراء", image: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=500" },
    { id: "3", title: "شقة مودرن مطلة على البحر", price: 450, location: "السالمية", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" },
    { id: "4", title: "طقم كنب ملكي", price: 180, location: "الفروانية", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#070b14] transition-colors duration-500" dir="rtl">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        {/* Hero Section مع تدرج لوني فخم */}
        <div className="relative mb-16 overflow-hidden rounded-[3.5rem] bg-slate-900 p-12 text-center md:text-right">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <Sparkles size={16} /> جرب البحث الذكي الجديد
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              سوقك الموثوق.. <br/><span className="text-blue-500">بلمسة واحدة</span>
            </h1>
            <p className="text-gray-400 max-w-xl mb-8 font-medium">أفضل العروض الحصرية في الكويت، بيع واشتري بكل أمان وسهولة مع ميزات الذكاء الاصطناعي.</p>
          </div>
        </div>

        {/* شريط البحث العائم */}
        <div className="max-w-4xl mx-auto -mt-24 mb-16 relative z-20">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl p-4 rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-gray-800 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="ما الذي تبحث عنه؟" className="w-full h-14 pr-12 bg-transparent font-bold outline-none dark:text-white" />
            </div>
            <div className="flex gap-2">
              <button className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-500 hover:text-blue-600 transition-colors"><Mic size={20} /></button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-lg shadow-blue-500/30">ابحث الآن</button>
            </div>
          </div>
        </div>

        {/* الأقسام بتصميم كبسولات */}
        <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar justify-start md:justify-center">
          {categories.map((cat, i) => (
            <button key={i} className={`flex items-center gap-3 px-6 py-3 rounded-2xl whitespace-nowrap font-bold transition-all hover:scale-105 shadow-sm ${cat.color} border border-transparent hover:border-current`}>
              <cat.icon size={20} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* شبكة الإعلانات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {listings.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
