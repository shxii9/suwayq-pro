"use client"; // 💡 هذا هو الحل: نخبر Next.js أن هذا الملف يتفاعل مع المستخدم.

import { Users, Activity, AlertTriangle, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";

const handleApprove = async () => {
  alert("جاري إرسال طلب الموافقة... (تم ربط الوظيفة!)");
  // هنا سيتم استدعاء API الفعلي
};

import Image from 'next/image';


export default function AdminRoot() {
  return (
    <div>
        <h2 className="text-3xl font-black mb-8 text-white">نظرة عامة</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><Users className="mb-4 text-blue-400" /><h3 className="text-2xl font-bold">1,250</h3><p className="text-slate-400">مستخدم</p></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><Activity className="mb-4 text-green-400" /><h3 className="text-2xl font-bold">450 د.ك</h3><p className="text-slate-400">إيرادات</p></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><AlertTriangle className="mb-4 text-red-400" /><h3 className="text-2xl font-bold">5</h3><p className="text-slate-400">بلاغات</p></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
               {/* الزر الآن يعمل لأنه ضمن Client Component */}
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



