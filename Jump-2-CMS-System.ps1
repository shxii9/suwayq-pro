# Jump-2-CMS-System.ps1
# بناء نظام إدارة المحتوى (CMS) داخل لوحة الإدارة

$ErrorActionPreference = "Stop"
Write-Host "🗄️ بناء نظام إدارة المحتوى (CMS) داخل /admin..." -ForegroundColor Cyan

$AdminDir = "src\app\admin"
$UsersDir = "$AdminDir\users"
$ReportsDir = "$AdminDir\reports"
$ListingsAdminDir = "$AdminDir\listings"

# 1. إنشاء صفحات CMS داخل Admin
New-Item -ItemType Directory -Force -Path $UsersDir | Out-Null
New-Item -ItemType Directory -Force -Path $ReportsDir | Out-Null
New-Item -ItemType Directory -Force -Path $ListingsAdminDir | Out-Null

# 2. تحديث قائمة الإدارة الجانبية (لربط الصفحات الجديدة)
Write-Host "🔗 تحديث شريط إدارة Admin (admin/page.tsx) للملاحة..." -ForegroundColor Yellow
# (سنعدل هذا الملف ليصبح Layout للتنقل بين الصفحات)
$AdminLayoutContent = @'
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
            <Link key={item.name} href={item.href} className="flex items-center gap-3 text-slate-300 hover:bg-slate-700 hover:text-white px-4 py-3 rounded-xl transition">
              <item.icon size={20} /> {item.name}
              {item.badge && <span className="mr-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>}
            </Link>
          ))}
        </nav>
        <Link href="/" className="mt-auto text-slate-400 hover:text-white text-sm flex items-center gap-2">
           <LogOut size={16}/> العودة للموقع
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
         {children}
      </main>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AdminDir\layout.tsx", $AdminLayoutContent, [System.Text.Encoding]::UTF8)

# 3. إنشاء صفحات الإدارة الداخلية
Write-Host "📝 إنشاء صفحات CMS (الإعلانات، المستخدمين، البلاغات)..." -ForegroundColor Yellow

# Admin Users Page
$UsersPageContent = @'
// src/app/admin/users/page.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // يجب إضافة مكتبة واجهة المستخدم
import { Users, Trash2, ShieldOff } from "lucide-react";

export default function AdminUsers() {
    const users = [
        { id: 1, name: "فهد العلي", email: "fahad@ali.com", status: "Active" },
        { id: 2, name: "سارة خالد", email: "sara@khaled.net", status: "Banned" },
    ];
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2"><Users /> إدارة المستخدمين</h2>
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <table className="w-full text-sm text-right">
                    <thead className="text-slate-400 bg-slate-800/50">
                        <tr>
                            <th className="p-4">الاسم</th>
                            <th className="p-4">البريد</th>
                            <th className="p-4">الحالة</th>
                            <th className="p-4">إجراء</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 text-slate-300">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-slate-700/50 transition">
                                <td className="p-4 font-bold">{user.name}</td>
                                <td className="p-4 text-slate-500">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{user.status}</span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <button className="text-red-500 hover:text-red-300 p-1 rounded"><Trash2 size={16}/></button>
                                    {user.status === 'Active' && <button className="text-orange-500 hover:text-orange-300 p-1 rounded"><ShieldOff size={16}/></button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
'@
[System.IO.File]::WriteAllText("$UsersDir\page.tsx", $UsersPageContent, [System.Text.Encoding]::UTF8)

# 4. تحديث صفحة النظرة العامة (Admin Root)
$AdminRootContent = @'
// src/app/admin/page.tsx
import { Users, Activity, AlertTriangle, Shield } from "lucide-react";
import Link from "next/link";

export default function AdminRoot() {
  return (
    <div>
        <h2 className="text-3xl font-black mb-8 text-white">نظرة عامة</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><Users className="mb-4 text-blue-400" /><h3 className="text-2xl font-bold">1,250</h3><p className="text-slate-400">مستخدم</p></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><Activity className="mb-4 text-green-400" /><h3 className="text-2xl font-bold">450 د.ك</h3><p className="text-slate-400">إيرادات</p></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><AlertTriangle className="mb-4 text-red-400" /><h3 className="text-2xl font-bold">5</h3><p className="text-slate-400">بلاغات</p></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
               <Shield className="mb-4 text-white" /><h3 className="text-xl font-bold">إدارة النظام</h3><p className="text-slate-400 text-sm">إعدادات النظام العامة</p>
            </div>
        </div>
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="font-bold mb-4 text-xl">تحذيرات النظام</h3>
            <p className="text-slate-500">لا توجد تحذيرات حرجة حالياً.</p>
        </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AdminDir\page.tsx", $AdminRootContent, [System.Text.Encoding]::UTF8)

# 5. إنشاء مكون وهمي (مكون Table) ليعمل كود CMS
Write-Host "💡 إنشاء مكونات وهمية لـ UI Table..." -ForegroundColor Yellow

$UITableContent = @'
// src/components/ui/table.tsx - مكون وهمي لضمان عمل CMS
import React from "react";

// (هذا المكون هو لإظهار الجداول في صفحة Admin Users)
export function Table({ children }: { children: React.ReactNode }) {
    return <div className="w-full">{children}</div>;
}
export function TableHeader({ children }: { children: React.ReactNode }) {
    return <thead>{children}</thead>;
}
export function TableHead({ children }: { children: React.ReactNode }) {
    return <th className="py-4 px-6 text-right">{children}</th>;
}
export function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody>{children}</tbody>;
}
export function TableRow({ children }: { children: React.ReactNode }) {
    return <tr>{children}</tr>;
}
export function TableCell({ children }: { children: React.ReactNode }) {
    return <td className="p-4">{children}</td>;
}
'@
New-Item -ItemType Directory -Force -Path "$CompDir\ui" | Out-Null
[System.IO.File]::WriteAllText("$CompDir\ui\table.tsx", $UITableContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم بناء نظام إدارة المحتوى (CMS) بنجاح!" -ForegroundColor Green