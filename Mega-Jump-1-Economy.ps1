# Mega-Jump-1-Economy.ps1
# بناء النظام المالي: المحفظة، الباقات، والدفع.

$ErrorActionPreference = "Stop"
Write-Host "💰 تثبيت النظام المالي (Economy System)..." -ForegroundColor Cyan

$AppDir = "src\app"

# إنشاء المجلدات
New-Item -ItemType Directory -Force -Path "$AppDir\wallet" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\premium" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\checkout" | Out-Null

# 1. صفحة المحفظة (Wallet)
$WalletContent = @'
import { Navbar } from "@/components/Navbar";
import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard, History } from "lucide-react";

export default function MyWallet() {
  const transactions = [
    { id: 1, type: "deposit", title: "شحن رصيد", amount: "+ 50.000", date: "2023-10-25", status: "ناجحة" },
    { id: 2, type: "payment", title: "تمييز إعلان (تويوتا كامري)", amount: "- 5.000", date: "2023-10-24", status: "مكتملة" },
    { id: 3, type: "payment", title: "باقة التاجر (شهري)", amount: "- 15.000", date: "2023-10-20", status: "مكتملة" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-black text-gray-900 mb-8">محفظتي</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-150"></div>
            <div className="relative z-10">
              <p className="opacity-80 mb-1">الرصيد الحالي</p>
              <h2 className="text-4xl font-black mb-6">30.000 <span className="text-lg font-normal">د.ك</span></h2>
              <div className="flex gap-3">
                <button className="bg-white text-blue-800 px-6 py-2 rounded-xl font-bold hover:bg-blue-50 transition flex items-center gap-2">
                  <ArrowUpRight size={18} /> شحن
                </button>
                <button className="bg-blue-700 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-600 transition flex items-center gap-2">
                  <ArrowDownLeft size={18} /> سحب
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-center">
            <h3 className="font-bold text-lg mb-4">طرق الدفع المحفوظة</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 border p-4 rounded-xl border-blue-500 bg-blue-50 cursor-pointer">
                <CreditCard className="text-blue-600" />
                <div>
                  <p className="font-bold text-sm">Visa **** 4242</p>
                  <p className="text-xs text-gray-500">تنتهي 12/25</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border p-4 rounded-xl border-gray-200 hover:border-gray-300 cursor-pointer border-dashed">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">+</div>
                <p className="font-bold text-sm text-gray-500">إضافة بطاقة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center gap-2"><History size={20}/> سجل العمليات</h3>
            <button className="text-blue-600 text-sm font-bold">تحميل كشف الحساب</button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-4 text-right">العملية</th>
                <th className="p-4 text-right">التاريخ</th>
                <th className="p-4 text-right">المبلغ</th>
                <th className="p-4 text-right">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="p-4 font-bold">{t.title}</td>
                  <td className="p-4 text-gray-500">{t.date}</td>
                  <td className={`p-4 font-bold ${t.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`} dir="ltr">{t.amount}</td>
                  <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\wallet\page.tsx", $WalletContent, [System.Text.Encoding]::UTF8)

# 2. صفحة الباقات (Premium Plans)
$PremiumContent = @'
import { Navbar } from "@/components/Navbar";
import { Check, Star, Zap, Crown } from "lucide-react";
import Link from "next/link";

export default function Premium() {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      <div className="bg-slate-900 text-white py-20 text-center">
        <h1 className="text-4xl font-black mb-4">ميّز إعلاناتك وضاعف مبيعاتك 🚀</h1>
        <p className="text-slate-400 text-lg">اختر الباقة المناسبة لك واوصل لملايين المشترين</p>
      </div>

      <div className="container mx-auto px-4 -mt-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 mb-6"><Star /></div>
            <h3 className="text-2xl font-bold mb-2">إعلان مميز</h3>
            <p className="text-gray-500 mb-6">جيد للبيع السريع لسلعة واحدة.</p>
            <div className="text-3xl font-black mb-6">5.000 <span className="text-sm font-normal text-gray-500">د.ك</span></div>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li className="flex gap-2"><Check size={18} className="text-green-500"/> يظهر في أعلى القائمة لمدة 3 أيام</li>
              <li className="flex gap-2"><Check size={18} className="text-green-500"/> شارة "مميز" على الإعلان</li>
            </ul>
            <Link href="/checkout?plan=basic" className="block w-full py-3 border border-blue-600 text-blue-600 font-bold text-center rounded-xl hover:bg-blue-50">اختر الباقة</Link>
          </div>

          {/* Pro Plan (Recommended) */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-600 relative transform md:-translate-y-4">
            <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">الأكثر مبيعاً</div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6"><Zap /></div>
            <h3 className="text-2xl font-bold mb-2">باقة التيربو</h3>
            <p className="text-gray-500 mb-6">للتجار وأصحاب المشاريع الصغيرة.</p>
            <div className="text-3xl font-black mb-6">15.000 <span className="text-sm font-normal text-gray-500">د.ك / شهري</span></div>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li className="flex gap-2"><Check size={18} className="text-green-500"/> 5 إعلانات مميزة شهرياً</li>
              <li className="flex gap-2"><Check size={18} className="text-green-500"/> إعادة نشر تلقائي يومياً</li>
              <li className="flex gap-2"><Check size={18} className="text-green-500"/> إحصائيات متقدمة</li>
            </ul>
            <Link href="/checkout?plan=pro" className="block w-full py-3 bg-blue-600 text-white font-bold text-center rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200">اختر الباقة</Link>
          </div>

          {/* Business Plan */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6"><Crown /></div>
            <h3 className="text-2xl font-bold mb-2">معرض السيارات/العقار</h3>
            <p className="text-gray-500 mb-6">للشركات والمعارض الكبرى.</p>
            <div className="text-3xl font-black mb-6">50.000 <span className="text-sm font-normal text-gray-500">د.ك / شهري</span></div>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li className="flex gap-2"><Check size={18} className="text-green-500"/> عدد غير محدود من الإعلانات</li>
              <li className="flex gap-2"><Check size={18} className="text-green-500"/> صفحة معرض خاصة (Branding)</li>
              <li className="flex gap-2"><Check size={18} className="text-green-500"/> مدير حساب شخصي</li>
            </ul>
            <Link href="/checkout?plan=business" className="block w-full py-3 border border-purple-600 text-purple-600 font-bold text-center rounded-xl hover:bg-purple-50">تواصل معنا</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\premium\page.tsx", $PremiumContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم بناء النظام المالي بنجاح!" -ForegroundColor Green