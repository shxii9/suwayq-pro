# System-3-Admin-Panel.ps1
# بناء لوحة تحكم الإدارة العليا (Admin Dashboard)

$ErrorActionPreference = "Stop"
Write-Host "👮 بناء لوحة الإدارة العليا..." -ForegroundColor Cyan

$AdminDir = "src\app\admin"
if (-not (Test-Path $AdminDir)) { New-Item -ItemType Directory -Force -Path $AdminDir | Out-Null }

$AdminContent = @'
import { Users, ShoppingBag, AlertTriangle, Activity, Search, Shield, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-l border-slate-700 p-6 flex flex-col">
        <h1 className="text-2xl font-black mb-10 flex items-center gap-2 text-blue-400">
          <Shield /> سُوَيق <span className="text-white">ADMIN</span>
        </h1>
        
        <nav className="space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold">
            <Activity size={20} /> نظرة عامة
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:bg-slate-700 hover:text-white px-4 py-3 rounded-xl transition">
            <Users size={20} /> المستخدمين
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:bg-slate-700 hover:text-white px-4 py-3 rounded-xl transition">
            <ShoppingBag size={20} /> الإعلانات
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:bg-slate-700 hover:text-white px-4 py-3 rounded-xl transition">
            <AlertTriangle size={20} /> البلاغات <span className="mr-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">5</span>
          </a>
        </nav>
        
        <Link href="/" className="mt-auto text-slate-400 hover:text-white text-sm flex items-center gap-2">
           العودة للموقع
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">لوحة القيادة</h2>
          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute top-2.5 right-3 text-slate-400" size={18} />
                <input type="text" placeholder="بحث سريع..." className="bg-slate-800 border border-slate-700 rounded-lg py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-blue-500" />
             </div>
             <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
           {[
             { title: "إجمالي المستخدمين", val: "54,200", icon: Users, color: "bg-blue-500" },
             { title: "الإعلانات النشطة", val: "12,850", icon: ShoppingBag, color: "bg-green-500" },
             { title: "إيرادات الشهر", val: "4,200 د.ك", icon: Activity, color: "bg-purple-500" },
             { title: "بلاغات جديدة", val: "15", icon: AlertTriangle, color: "bg-red-500" },
           ].map((stat, idx) => (
             <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
               <div className="flex justify-between items-start mb-4">
                 <div className={`p-3 rounded-lg ${stat.color} bg-opacity-20 text-white`}>
                   <stat.icon size={24} className={stat.color.replace("bg-", "text-")} />
                 </div>
               </div>
               <p className="text-slate-400 text-sm mb-1">{stat.title}</p>
               <h3 className="text-2xl font-black">{stat.val}</h3>
             </div>
           ))}
        </div>

        {/* Recent Pending Listings */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h3 className="font-bold text-lg">إعلانات بانتظار الموافقة</h3>
          </div>
          <table className="w-full text-sm text-right">
            <thead className="text-slate-400 bg-slate-800/50">
              <tr>
                <th className="p-4">الإعلان</th>
                <th className="p-4">المستخدم</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-slate-300">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="hover:bg-slate-700/50 transition">
                  <td className="p-4 font-bold">لابتوب ماك بوك برو للبيع</td>
                  <td className="p-4">Ahmed Ali</td>
                  <td className="p-4 text-slate-500">منذ 10 دقائق</td>
                  <td className="p-4"><span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded text-xs">مراجعة</span></td>
                  <td className="p-4 flex gap-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded"><CheckCircle size={16}/></button>
                    <button className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded"><XCircle size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AdminDir\page.tsx", $AdminContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم بناء لوحة الإدارة بنجاح!" -ForegroundColor Green