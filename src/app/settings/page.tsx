"use client";

import { Navbar } from "@/components/Navbar";
import { User, Lock, Bell, Palette, ChevronLeft } from "lucide-react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 max-w-2xl">
        <h1 className="text-3xl font-black mb-8 dark:text-white">الإعدادات</h1>
        
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* خيار الملف الشخصي */}
          <div className="p-6 flex items-center justify-between border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl"><User size={20} /></div>
              <div>
                <p className="font-bold dark:text-white">الملف الشخصي</p>
                <p className="text-xs text-gray-500">تعديل الاسم والبريد</p>
              </div>
            </div>
            <ChevronLeft size={18} className="text-gray-400" />
          </div>

          {/* خيار المظهر (الليلي/العادي) */}
          <div className="p-6 flex items-center justify-between border-b dark:border-gray-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-2xl"><Palette size={20} /></div>
              <div>
                <p className="font-bold dark:text-white">المظهر</p>
                <p className="text-xs text-gray-500">التبديل بين الوضع الليلي والنهاري</p>
              </div>
            </div>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2 text-sm font-bold outline-none"
            >
              <option value="light">نهاري</option>
              <option value="dark">ليلي</option>
            </select>
          </div>

          {/* خيار الأمان */}
          <div onClick={() => toast.error("قريباً: ميزة تغيير كلمة المرور")} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl"><Lock size={20} /></div>
              <div>
                <p className="font-bold dark:text-white">الأمان</p>
                <p className="text-xs text-gray-500">كلمة المرور وجلسات الدخول</p>
              </div>
            </div>
            <ChevronLeft size={18} className="text-gray-400" />
          </div>
        </div>
      </main>
    </div>
  );
}
