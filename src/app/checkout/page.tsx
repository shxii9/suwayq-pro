// src/app/checkout/page.tsx
"use client";
import { Navbar } from "@/components/Navbar";
import { CreditCard, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Checkout() {
  const handlePayment = () => {
    alert("جاري الاتصال ببوابة الدفع (KNET)... تم تنفيذ الوظيفة!");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Link href="/" className="text-blue-600 font-bold flex items-center gap-1 mb-6">
          <ArrowLeft size={18} /> العودة للتسوق
        </Link>
        <h1 className="text-3xl font-black mb-8 border-r-4 border-blue-600 pr-3">إتمام عملية الدفع</h1>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 space-y-6">
          <div className="flex justify-between border-b pb-4">
            <h3 className="font-bold text-lg">الباقة المختارة: تمييز إعلان</h3>
            <span className="text-2xl font-black text-blue-600">15.000 د.ك</span>
          </div>

          <h3 className="font-bold text-gray-700">بيانات البطاقة</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="رقم البطاقة"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="الشهر"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none"
              />
              <input
                type="text"
                placeholder="السنة"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none"
              />
              <input
                type="text"
                placeholder="رمز الأمان (CVV)"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none"
              />
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition shadow-lg shadow-green-200"
          >
            <Lock size={20} /> تأكيد الدفع الآمن
          </button>

          <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2 pt-2 border-t">
            <CreditCard size={16} /> يتم تشفير بيانات الدفع بالكامل.
          </div>
        </div>
      </div>
    </div>
  );
}
