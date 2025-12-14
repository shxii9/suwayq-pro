// src/app/admin/layout.tsx
import { Shield, Users, ShoppingBag, AlertTriangle, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import React from "react";

const navItems = [
  { name: "نظرة عامة", href: "/admin", icon: LayoutDashboard },
  { name: "إدارة الإعلانات", href: "/admin/listings", icon: ShoppingBag },
  { name: "إدارة المستخدمين", href: "/admin/users", icon: Users },
  { name: "البلاغات", href: "/admin/reports", icon: AlertTriangle, badge: 5 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-l border-slate-700 p-6 flex flex-col">
        <h1 className="text-xl font-black mb-10 text-blue-400">
          <Shield /> سُوَيق <span className="text-white">CMS</span>
        </h1>
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 text-slate-300 hover:bg-slate-700 hover:text-white px-4 py-3 rounded-xl transition"
            >
              <item.icon size={20} /> {item.name}
              {item.badge && (
                <span className="mr-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>
              )}
            </Link>
          ))}
        </nav>
        <Link href="/" className="mt-auto text-slate-400 hover:text-white text-sm flex items-center gap-2">
          <LogOut size={16} /> العودة للموقع
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
