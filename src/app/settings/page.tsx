// src/app/settings/page.tsx
"use client";
import { Navbar } from "@/components/Navbar";
import { User, Mail, Lock, Bell, ChevronLeft } from "lucide-react";
import Link from "next/link";
// (الكود الداخلي للصفحة لم يتغير، فقط نكتبه مرة أخرى لضمان وجوده)
export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-3xl font-black mb-8 border-r-4 border-blue-600 pr-3">الإعدادات الشخصية</h1>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 space-y-6">
          <Link
            href="#"
            className="flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <User size={24} className="text-blue-600" />
              <div>
                <h3 className="font-bold">معلومات الحساب</h3>
                <p className="text-sm text-gray-500">الاسم، الهاتف، الموقع</p>
              </div>
            </div>
            <ChevronLeft size={20} className="text-gray-400" />
          </Link>
          <Link
            href="/security"
            className="flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <Lock size={24} className="text-red-600" />
              <div>
                <h3 className="font-bold">الأمان والخصوصية</h3>
                <p className="text-sm text-gray-500">تغيير كلمة المرور، المصادقة الثنائية</p>
              </div>
            </div>
            <ChevronLeft size={20} className="text-gray-400" />
          </Link>
          <Link
            href="#"
            className="flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <Bell size={24} className="text-orange-600" />
              <div>
                <h3 className="font-bold">إعدادات الإشعارات</h3>
                <p className="text-sm text-gray-500">التحكم في التنبيهات</p>
              </div>
            </div>
            <ChevronLeft size={20} className="text-gray-400" />
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t text-center">
          <button className="text-red-500 hover:text-red-700 font-bold">تسجيل الخروج</button>
        </div>
      </div>
    </div>
  );
}
