"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { 
  Users, 
  Package, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  BarChart3, 
  Search,
  MoreVertical,
  ExternalLink,
  ShieldAlert
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("listings");

  // بيانات وهمية متطورة للمحاكاة
  const stats = [
    { label: "إجمالي الإعلانات", value: "1,240", icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "المستخدمين النشطين", value: "850", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "إعلانات تم بيعها", value: "320", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "بلاغات مخالفة", value: "12", icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50" },
  ];

  const mockListings = [
    { id: "101", title: "مرسيدس G63", seller: "بدر المنصور", date: "2023-10-25", status: "نشط", price: "48,000 د.ك" },
    { id: "102", title: "آيفون 15 برو", seller: "نورة المطيري", date: "2023-10-24", status: "مراجعة", price: "350 د.ك" },
    { id: "103", title: "شقة في السالمية", seller: "سليمان الفضلي", date: "2023-10-23", status: "نشط", price: "450 د.ك" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617]" dir="rtl">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col gap-8">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black dark:text-white flex items-center gap-3">
                <ShieldAlert className="text-red-600" size={36} /> لوحة تحكم الإدارة
              </h1>
              <p className="text-gray-400 font-bold mt-2">مرحباً بك، أيها المدير. لديك كامل الصلاحيات لإدارة المحتوى.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl font-black text-sm dark:text-white hover:bg-gray-50 transition-all">تصدير التقرير</button>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-500/20">تحديث البيانات</button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:scale-105">
                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                  <stat.icon size={28} />
                </div>
                <p className="text-gray-400 font-bold text-sm">{stat.label}</p>
                <p className="text-3xl font-black dark:text-white mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Management Area */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex gap-4">
                <button onClick={() => setActiveTab("listings")} className={`px-6 py-3 rounded-xl font-black text-sm transition-all ${activeTab === 'listings' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-gray-400 hover:bg-gray-50'}`}>الإعلانات</button>
                <button onClick={() => setActiveTab("users")} className={`px-6 py-3 rounded-xl font-black text-sm transition-all ${activeTab === 'users' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-gray-400 hover:bg-gray-50'}`}>المستخدمين</button>
              </div>
              <div className="relative w-full md:w-96">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="البحث عن إعلان، مستخدم، أو رقم ID..." className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 dark:text-white" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right font-bold">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 text-xs uppercase tracking-widest">
                    <th className="p-6">الإعلان</th>
                    <th className="p-6">البائع</th>
                    <th className="p-6">التاريخ</th>
                    <th className="p-6">الحالة</th>
                    <th className="p-6 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {mockListings.map((list) => (
                    <tr key={list.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-xl overflow-hidden">
                             <img src="https://picsum.photos/100" className="object-cover w-full h-full" />
                          </div>
                          <div>
                            <div className="dark:text-white">{list.title}</div>
                            <div className="text-blue-600 text-xs">{list.price}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 dark:text-gray-300">{list.seller}</td>
                      <td className="p-6 text-gray-400 text-sm">{list.date}</td>
                      <td className="p-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] ${list.status === 'نشط' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                          {list.status}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-3 text-gray-400 hover:text-blue-600 transition-all"><ExternalLink size={18} /></button>
                          <button className="p-3 text-gray-400 hover:text-red-600 transition-all"><Trash2 size={18} /></button>
                          <button className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"><MoreVertical size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
