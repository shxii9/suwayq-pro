"use client";
import { Navbar } from "@/components/Navbar";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { Package, Users, ShieldCheck, AlertCircle, Trash2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function AdminDashboard() {
  const stats = [
    { title: "الإعلانات", value: "1,240", icon: Package, color: { bg: "bg-blue-50", text: "text-blue-600" } },
    { title: "المستخدمين", value: "850", icon: Users, color: { bg: "bg-purple-50", text: "text-purple-600" } },
    { title: "الموثقة", value: "45", icon: ShieldCheck, color: { bg: "bg-green-50", text: "text-green-600" } },
    { title: "بلاغات", value: "12", icon: AlertCircle, color: { bg: "bg-red-50", text: "text-red-600" } },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-[#020617]" dir="rtl">
        <Toaster />
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="mb-10">
            <h1 className="text-3xl font-black dark:text-white">إدارة المنصة</h1>
            <p className="text-gray-400 font-bold">نظام التحكم المركزي - معايير Enterprise</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((s, i) => <StatsCard key={i} {...s} />)}
          </div>

          {/* Data Management Table */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-black dark:text-white">أحدث الإعلانات</h2>
              <button className="text-sm font-bold text-blue-600">عرض الكل</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 text-xs font-black">
                  <tr>
                    <th className="p-6">المعرف</th>
                    <th className="p-6">العنوان</th>
                    <th className="p-6">السعر</th>
                    <th className="p-6 text-center">التحكم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-6 font-bold text-gray-400">#AD-992</td>
                    <td className="p-6 font-black dark:text-white">تويوتا لاندكروزر 2024</td>
                    <td className="p-6 font-black text-blue-600">32,000 د.ك</td>
                    <td className="p-6 flex justify-center gap-3">
                      <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                      <button className="p-3 bg-green-50 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all"><ShieldCheck size={18} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
