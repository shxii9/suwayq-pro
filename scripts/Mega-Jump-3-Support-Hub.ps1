# Mega-Jump-3-Support-Hub.ps1
# بناء مركز الدعم والإشعارات

$ErrorActionPreference = "Stop"
Write-Host "🔔 تثبيت مركز الدعم والإشعارات..." -ForegroundColor Cyan

$AppDir = "src\app"
New-Item -ItemType Directory -Force -Path "$AppDir\notifications" | Out-Null
New-Item -ItemType Directory -Force -Path "$AppDir\help" | Out-Null

# 1. صفحة الإشعارات
$NotifyContent = @'
import { Navbar } from "@/components/Navbar";
import { Bell, Heart, Tag, Info, CheckCircle } from "lucide-react";

export default function Notifications() {
  const notifies = [
    { id: 1, title: "تم الموافقة على إعلانك", desc: "إعلانك 'ايفون 15 برو' أصبح نشطاً الآن ويظهر للمستخدمين.", time: "منذ دقيقتين", icon: CheckCircle, color: "bg-green-100 text-green-600", read: false },
    { id: 2, title: "شخص ما أعجب بإعلانك", desc: "أضاف محمد العلي إعلانك للمفضلة.", time: "منذ ساعة", icon: Heart, color: "bg-red-100 text-red-600", read: true },
    { id: 3, title: "تخفيضات الباقات المميزة", desc: "خصم 50% على جميع باقات التمييز لنهاية اليوم!", time: "أمس", icon: Tag, color: "bg-purple-100 text-purple-600", read: true },
    { id: 4, title: "تحديث سياسة الاستخدام", desc: "قمنا بتحديث شروط الاستخدام، يرجى الاطلاع عليها.", time: "منذ يومين", icon: Info, color: "bg-blue-100 text-blue-600", read: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black text-gray-900">الإشعارات</h1>
          <button className="text-blue-600 text-sm font-bold">تحديد الكل كمقروء</button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {notifies.map((n) => (
            <div key={n.id} className={`p-5 border-b last:border-0 flex gap-4 hover:bg-gray-50 transition ${!n.read ? "bg-blue-50/40" : ""}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                <n.icon size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold text-gray-900 mb-1 ${!n.read ? "text-black" : "text-gray-700"}`}>{n.title}</h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{n.time}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{n.desc}</p>
              </div>
              {!n.read && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\notifications\page.tsx", $NotifyContent, [System.Text.Encoding]::UTF8)

# 2. مركز المساعدة (Help Center)
$HelpContent = @'
import { Navbar } from "@/components/Navbar";
import { Search, HelpCircle, FileText, Shield, CreditCard, Mail } from "lucide-react";

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      
      {/* Hero Search */}
      <div className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-6">كيف يمكننا مساعدتك؟</h1>
        <div className="max-w-2xl mx-auto px-4 relative">
          <input type="text" placeholder="ابحث عن سؤالك (مثال: كيف أضيف إعلان؟)" className="w-full py-4 pr-12 pl-4 rounded-xl text-gray-800 shadow-lg outline-none" />
          <Search className="absolute top-4 right-8 text-gray-400" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "الحساب والإعدادات", icon: FileText },
            { title: "البيع والشراء", icon: ShoppingBagIcon },
            { title: "الأمان والخصوصية", icon: Shield },
            { title: "الدفع والاشتراكات", icon: CreditCard },
          ].map((topic, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer text-center group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <topic.icon size={28} />
              </div>
              <h3 className="font-bold text-lg text-gray-900">{topic.title}</h3>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {[
              "كيف يمكنني استعادة كلمة المرور؟",
              "ما هي طرق الدفع المتاحة؟",
              "كيف أحمي نفسي من الاحتيال؟",
              "كم يستغرق نشر الإعلان؟"
            ].map((q, i) => (
              <div key={i} className="border-b last:border-0 pb-4 last:pb-0">
                <button className="w-full flex justify-between items-center text-right font-bold text-gray-700 hover:text-blue-600">
                  {q}
                  <span className="text-gray-400">+</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">لم تجد إجابة لسؤالك؟</p>
          <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center gap-2 mx-auto">
            <Mail size={18} /> تواصل مع الدعم الفني
          </button>
        </div>
      </div>
    </div>
  );
}

function ShoppingBagIcon({size}: {size: number}) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
}
'@
[System.IO.File]::WriteAllText("$AppDir\help\page.tsx", $HelpContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم بناء مركز الدعم بنجاح!" -ForegroundColor Green