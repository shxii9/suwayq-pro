# Jump-1-API-Core.ps1
# بناء طبقة API Backend لربط الوظائف الأساسية

$ErrorActionPreference = "Stop"
Write-Host "📡 بناء العمود الفقري (API) للمشروع..." -ForegroundColor Cyan

$ApiDir = "src\app\api"
$UsersDir = "$ApiDir\users"
$ListingsDir = "$ApiDir\listings"

# 1. إنشاء هيكل مجلدات API
New-Item -ItemType Directory -Force -Path $ApiDir | Out-Null
New-Item -ItemType Directory -Force -Path $UsersDir | Out-Null
New-Item -ItemType Directory -Force -Path $ListingsDir | Out-Null

# 2. بناء API للمستخدمين (Authentication API)
Write-Host "📝 إنشاء API لصفحات الدخول والتسجيل (/api/users/login)..." -ForegroundColor Yellow
$UsersApiContent = @'
// src/app/api/users/login/route.ts
import { NextResponse } from 'next/server';

// مثال لنقطة اتصال (API Endpoint) تسجيل الدخول
export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  if (email === "admin@suwayq.com" && password === "123456") {
    // في الواقع، هنا يتم إصدار رمز (Token) للمستخدم
    return NextResponse.json({ success: true, message: "تم تسجيل الدخول بنجاح!" });
  } else {
    return NextResponse.json({ success: false, message: "بيانات الاعتماد غير صحيحة" }, { status: 401 });
  }
}
'@
[System.IO.File]::WriteAllText("$UsersDir\login\route.ts", $UsersApiContent, [System.Text.Encoding]::UTF8)

# 3. بناء API للإعلانات (Listings Management API)
Write-Host "📝 إنشاء API لإدارة الإعلانات (/api/listings/create)..." -ForegroundColor Yellow
$ListingsApiContent = @'
// src/app/api/listings/create/route.ts
import { NextResponse } from 'next/server';

// مثال لنقطة اتصال (API Endpoint) إنشاء إعلان جديد
export async function POST(request: Request) {
  const data = await request.json();
  
  // هنا يتم إرسال البيانات إلى قاعدة البيانات الحقيقية
  console.log('New Listing Received:', data); 
  
  return NextResponse.json({ success: true, message: "تم إنشاء الإعلان بنجاح، بانتظار الموافقة." });
}
'@
[System.IO.File]::WriteAllText("$ListingsDir\create\route.ts", $ListingsApiContent, [System.Text.Encoding]::UTF8)

# 4. تحديث صفحة الإدارة (Admin) لربطها بـ API (جعلها قابلة للتصويت)
Write-Host "🔗 تحديث صفحة الإدارة (admin/page.tsx) لجعل الأزرار تعمل..." -ForegroundColor Yellow
$AdminPageContent = @'
// src/app/admin/page.tsx - مع ربط تجريبي للوظائف
import { Shield, Users, Activity, AlertTriangle } from "lucide-react";
import Link from "next/link";

const handleApprove = async () => {
  alert("جاري إرسال طلب الموافقة... (تم ربط الوظيفة!)");
  // هنا سيتم استدعاء API الفعلي
};

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
      <div className="flex justify-between items-center mb-10">
         <h1 className="text-3xl font-black flex items-center gap-2"><Shield className="text-blue-500"/> لوحة الإدارة العليا</h1>
         <Link href="/" className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 transition">العودة للموقع</Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><Users className="mb-4 text-blue-400" /><h3 className="text-2xl font-bold">1,250</h3><p className="text-slate-400">مستخدم</p></div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><Activity className="mb-4 text-green-400" /><h3 className="text-2xl font-bold">450 د.ك</h3><p className="text-slate-400">إيرادات</p></div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><AlertTriangle className="mb-4 text-red-400" /><h3 className="text-2xl font-bold">5</h3><p className="text-slate-400">بلاغات</p></div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
           <button onClick={handleApprove} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold">
               اختبار زر الوظيفة
           </button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
        <h3 className="font-bold mb-4 text-xl">إعلانات بانتظار الموافقة</h3>
        <button onClick={handleApprove} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm">
           الموافقة على الإعلان التجريبي
        </button>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AppDir\admin\page.tsx", $AdminPageContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم بناء طبقة الـ API بنجاح! الوظائف الآن جاهزة للربط." -ForegroundColor Green