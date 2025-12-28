"use client";

import Link from "next/link";
import { PlusCircle, User, LogOut, Heart, Moon, Sun, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    toast.success("تم تسجيل الخروج بنجاح", { icon: "👋" });
    router.push("/login");
    router.refresh();
  };

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-blue-600 dark:text-blue-400 italic">
          سُوَيق <span className="text-orange-500 text-sm not-italic">PRO</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* زر أضف إعلان */}
          <Link href="/listings/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 dark:shadow-none text-sm transition-all active:scale-95">
            <PlusCircle size={18} />
            <span className="hidden sm:inline">أضف إعلان</span>
          </Link>
          
          <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-[1.3rem] border border-gray-100 dark:border-gray-700 shadow-inner">
            
            {/* زر التبديل للوضع الليلي */}
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 transition-all"
              title="تغيير المظهر"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* أيقونة المفضلة */}
            <Link href="/favorites" className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-red-500 transition-all" title="المفضلة">
              <Heart size={20} />
            </Link>

            {/* أيقونة إعلاناتي */}
            <Link href="/my-listings" className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-all" title="إعلاناتي">
              <User size={20} />
            </Link>

            {/* أيقونة الإعدادات الجديدة */}
            <Link href="/settings" className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all" title="الإعدادات">
              <Settings size={20} />
            </Link>

            {/* خط فاصل */}
            <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>

            {/* زر الخروج */}
            <button onClick={handleLogout} className="p-2 rounded-xl text-gray-400 hover:text-red-500 transition-all" title="تسجيل الخروج">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
