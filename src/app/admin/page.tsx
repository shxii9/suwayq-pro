"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { Trash2, ShieldCheck, RefreshCw, ShieldAlert, Package, Users } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function AdminDashboard() {
  const [listings, setListings] = useState([]);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617]" dir="rtl">
        <Toaster position="top-center" />
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end">
               <div>
                  <h1 className="text-4xl font-black dark:text-white flex items-center gap-3">
                    <ShieldAlert className="text-red-600" /> غرفة العمليات
                  </h1>
                  <p className="text-gray-400 font-bold mt-2">إدارة شاملة للمحتوى والبائعين</p>
               </div>
               <button onClick={() => window.location.reload()} className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <RefreshCw size={20} className="text-blue-600" />
               </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
              <div className="p-8 border-b border-gray-50 dark:border-gray-800">
                <h3 className="text-xl font-black dark:text-white">الإعلانات النشطة</h3>
              </div>
              <div className="p-20 text-center">
                <Package size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold">لوحة التحكم جاهزة لاستقبال البيانات الحية</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
