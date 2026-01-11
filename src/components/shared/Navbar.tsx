"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { 
  Search, Menu, X, ShoppingCart, Heart, User, LogOut, 
  Settings, LayoutGrid, Bell, MessageSquare, Sun, Moon 
} from "lucide-react";
import toast from "react-hot-toast";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("تم تسجيل الخروج بنجاح");
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm" dir="rtl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* اللوجو */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <span className="font-black text-xl text-gray-900 dark:text-white hidden sm:block">
              Suwayq Pro
            </span>
          </Link>

          {/* شريط البحث */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:flex items-center">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {/* الأيقونات اليمين */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* تبديل المظهر */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* الإشعارات */}
            {session && (
              <Link href="/notifications" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
            )}

            {/* سلة التسوق */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* الأمنيات */}
            {session && (
              <Link href="/wishlist" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <Heart size={20} />
              </Link>
            )}

            {/* القائمة المستخدم */}
            {session ? (
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2">
                  <User size={20} />
                  <span className="hidden sm:block text-sm font-medium truncate max-w-[100px]">
                    {session.user?.name}
                  </span>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg">
                    الملف الشخصي
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    الطلبات
                  </Link>
                  {session.user?.role === "SELLER" && (
                    <Link href="/seller/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                      لوحة التحكم
                    </Link>
                  )}
                  <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    الإعدادات
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-right px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg flex items-center gap-2 text-red-600"
                  >
                    <LogOut size={16} /> تسجيل الخروج
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                دخول
              </Link>
            )}

            {/* زر القائمة */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* القائمة المحمول */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="ابحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
            </form>
            <div className="space-y-2">
              <Link href="/listings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                الإعلانات
              </Link>
              <Link href="/categories" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                الفئات
              </Link>
              {!session && (
                <>
                  <Link href="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    تسجيل الدخول
                  </Link>
                  <Link href="/register" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    التسجيل
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
