import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { listings, categories } from "@/lib/data";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

import Image from 'next/image';


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


