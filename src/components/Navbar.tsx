"use client";

import Link from "next/link";
import { PlusCircle, Search, MessageCircle, User, LayoutDashboard, Shield } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 h-16 shadow-sm">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black text-blue-600 flex items-center gap-1 hover:opacity-80 transition"
        >
          سُوَيق{" "}
          <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full tracking-wider">PRO</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-600">
          <Link href="/search" className="hover:text-blue-600 flex items-center gap-1 transition">
            <Search size={18} /> تصفح
          </Link>
          <Link href="/dashboard" className="hover:text-blue-600 flex items-center gap-1 transition">
            <LayoutDashboard size={18} /> لوحتي
          </Link>
          <Link href="/messages" className="hover:text-blue-600 flex items-center gap-1 transition">
            <MessageCircle size={18} /> الرسائل
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden lg:flex text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100 items-center gap-1"
          >
            <Shield size={12} /> الإدارة
          </Link>
          <Link href="/wallet" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition relative">
            <User size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
          </Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            <PlusCircle size={16} /> <span className="hidden sm:inline">أضف إعلان</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
