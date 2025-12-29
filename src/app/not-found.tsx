"use client";
import Link from "next/link";
import { Home, Search, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex items-center justify-center p-6 text-center" dir="rtl">
      <div className="max-w-md w-full">
        {/* Icon with Ring Animation */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          <div className="absolute inset-0 bg-blue-600/10 rounded-full animate-ping"></div>
          <div className="relative bg-white dark:bg-gray-900 border-2 border-blue-600 rounded-full w-full h-full flex items-center justify-center text-blue-600 shadow-2xl">
            <Search size={48} />
          </div>
        </div>

        <h1 className="text-8xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tighter">404</h1>
        <h2 className="text-2xl font-black text-slate-800 dark:text-gray-200 mb-4">أوبس! الصفحة غير موجودة</h2>
        <p className="text-gray-400 font-bold mb-10 leading-relaxed">
          يبدو أنك سلكت طريقاً خاطئاً في سويق برو. لا تقلق، جميع بضائعنا الرائعة بانتظارك في الصفحة الرئيسية.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/" className="bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
            <Home size={20} /> العودة للرئيسية
          </Link>
          <Link href="/search" className="text-gray-400 hover:text-blue-600 font-black py-2 transition-all">
            ابحث عن بضاعة أخرى
          </Link>
        </div>
      </div>
    </div>
  );
}
