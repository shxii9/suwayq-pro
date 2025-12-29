"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { 
  User, 
  Settings, 
  Heart, 
  Package, 
  LogOut, 
  BarChart3, 
  PlusCircle, 
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("my-listings");
  const [listings, setListings] = useState([]);
  const [user, setUser] = useState({ name: "أحمد الناصري", email: "ahmed@mail.com" });

  const stats = [
    { label: "إعلانات نشطة", value: "12", icon: Package, color: "text-blue-600" },
    { label: "في المفضلة", value: "45", icon: Heart, color: "text-red-500" },
    { label: "مشاهدات الكلية", value: "1.2k", icon: BarChart3, color: "text-green-500" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-500" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar - Navigation */}
          <aside className="w-full lg:w-80">
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl sticky top-32">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-[2rem] mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-500/20">
                  {user.name[0]}
                </div>
                <h3 className="font-black text-xl dark:text-white">{user.name}</h3>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>

              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab("my-listings")}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black transition-all ${activeTab === 'my-listings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                  <Package size={20} /> إعلاناتي
                </button>
                <button 
                  onClick={() => setActiveTab("favorites")}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black transition-all ${activeTab === 'favorites' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                  <Heart size={20} /> المفضلة
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  <Settings size={20} /> الإعدادات
                </button>
                <hr className="my-4 border-gray-100 dark:border-gray-800" />
                <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                  <LogOut size={20} /> تسجيل الخروج
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-10">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between group hover:border-blue-500/50 transition-all">
                  <div>
                    <p className="text-gray-400 font-bold text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-black dark:text-white">{stat.value}</p>
                  </div>
                  <stat.icon size={40} className={`${stat.color} opacity-20 group-hover:opacity-100 transition-all`} />
                </div>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black dark:text-white">
                  {activeTab === 'my-listings' ? 'إعلاناتي المنشورة' : 'الإعلانات المفضلة'}
                </h2>
                {activeTab === 'my-listings' && (
                  <Link href="/listings/create" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-lg shadow-blue-500/20">
                    <PlusCircle size={18} /> إعلان جديد
                  </Link>
                )}
              </div>

              {/* Empty State Placeholder */}
              <div className="text-center py-20 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2.5rem]">
                <Package size={60} className="mx-auto text-gray-200 mb-6" />
                <p className="text-gray-400 font-bold text-lg">لا توجد بيانات لعرضها حالياً</p>
                <p className="text-gray-300 text-sm mt-2 font-medium italic underline">بمجرد قيامك بنشر إعلان سيظهر هنا</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
