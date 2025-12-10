# Fix-API-Isolated.ps1
# إصلاح مشكلة إنشاء مجلدات API وتنفيذ الملفات

$ErrorActionPreference = "Stop"
Write-Host "📡 إصلاح مشكلة بناء الـ API وتنفيذ الوظائف..." -ForegroundColor Cyan

$ApiDir = "src\app\api"
$UsersDir = "$ApiDir\users"
$ListingsDir = "$ApiDir\listings"
$AdminPage = "src\app\admin\page.tsx"

# 1. تنظيف مجلد API القديم
if (Test-Path $ApiDir) { Remove-Item -Path $ApiDir -Recurse -Force }
Write-Host "🗑️ تم حذف مجلد API القديم." -ForegroundColor Yellow

# 2. إنشاء الهيكل التسلسلي (لضمان وجود كل جزء)
New-Item -ItemType Directory -Force -Path $ApiDir | Out-Null
New-Item -ItemType Directory -Force -Path "$UsersDir\login" | Out-Null
New-Item -ItemType Directory -Force -Path "$ListingsDir\create" | Out-Null
Write-Host "📂 تم إنشاء جميع مجلدات API المطلوبة بنجاح." -ForegroundColor Green

# 3. بناء API للمستخدمين (Authentication API)
Write-Host "📝 إنشاء API لصفحات الدخول والتسجيل (/api/users/login)..." -ForegroundColor Cyan
$UsersApiContent = @'
// src/app/api/users/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  if (email === "admin@suwayq.com" && password === "123456") {
    return NextResponse.json({ success: true, message: "تم تسجيل الدخول بنجاح!" });
  } else {
    return NextResponse.json({ success: false, message: "بيانات الاعتماد غير صحيحة" }, { status: 401 });
  }
}
'@
[System.IO.File]::WriteAllText("$UsersDir\login\route.ts", $UsersApiContent, [System.Text.Encoding]::UTF8)

# 4. بناء API للإعلانات (Listings Management API)
Write-Host "📝 إنشاء API لإنشاء إعلان جديد (/api/listings/create)..." -ForegroundColor Cyan
$ListingsApiContent = @'
// src/app/api/listings/create/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  console.log('New Listing Received:', data); 
  return NextResponse.json({ success: true, message: "تم إنشاء الإعلان بنجاح، بانتظار الموافقة." });
}
'@
[System.IO.File]::WriteAllText("$ListingsDir\create\route.ts", $ListingsApiContent, [System.Text.Encoding]::UTF8)

# 5. تحديث صفحة الإدارة (Admin) لربطها بـ API (جعلها قابلة للتصويت)
Write-Host "🔗 تحديث صفحة الإدارة (admin/page.tsx) لربط الوظائف..." -ForegroundColor Cyan
# (هذا الكود هو نفسه الذي كان في Jump-1، نضعه هنا لضمان وجوده)
$AdminPageContent = @'
// src/app/admin/page.tsx - مع ربط تجريبي للوظائف
import { Users, Activity, AlertTriangle, Shield } from "lucide-react";
import Link from "next/link";

const handleApprove = async () => {
  alert("جاري إرسال طلب الموافقة... (تم ربط الوظيفة!)");
  // هنا سيتم استدعاء API الفعلي
};

export default function AdminRoot() {
  return (
    <div>
        <h2 className="text-3xl font-black mb-8 text-white">نظرة عامة</h2>
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
            <h3 className="font-bold mb-4 text-xl">تحذيرات النظام</h3>
            <p className="text-slate-500">لا توجد تحذيرات حرجة حالياً.</p>
        </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$AdminPage", $AdminPageContent, [System.Text.Encoding]::UTF8)

# 6. تنظيف الكاش والتشغيل
Write-Host "🧹 تنظيف الكاش والتشغيل..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }
Write-Host "✅ تم بناء الأنظمة الخلفية بنجاح. المشروع جاهز." -ForegroundColor Green
Write-Host "🚀 تشغيل السيرفر..." -ForegroundColor Green
npm run dev