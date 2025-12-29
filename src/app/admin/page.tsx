import { AdminGuard } from '@/components/admin/AdminGuard';
"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Trash2, ShieldCheck, RefreshCw, ExternalLink, Package, Users, CheckCircle, ShieldAlert } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function AdminDashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // وظيفة حذف الإعلان الفعلي
  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الإعلان نهائياً؟")) return;
    
    try {
      const res = await fetch("/api/admin/listings", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        setListings(listings.filter((item: any) => item.id !== id));
        toast.success("تم حذف الإعلان بنجاح من قاعدة البيانات");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  return (<AdminGuard>
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617]" dir="rtl">
      <Toaster position="top-center" />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col gap-8">
          
          <div className="flex justify-between items-end">
             <div>
                <h1 className="text-4xl font-black dark:text-white">غرفة العمليات</h1>
                <p className="text-gray-400 font-bold mt-2">إدارة شاملة للمحتوى والبائعين</p>
             </div>
             <button onClick={() => window.location.reload()} className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:rotate-180 transition-all duration-700">
                <RefreshCw size={20} className="text-blue-600" />
             </button>
          </div>

          {/* الإعلانات الحقيقية في الجدول */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-gray-50 dark:border-gray-800">
              <h3 className="text-xl font-black dark:text-white">مراقبة الإعلانات الحية</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right font-bold">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 text-xs">
                  <tr>
                    <th className="p-6">الإعلان</th>
                    <th className="p-6">البائع</th>
                    <th className="p-6">الإجراءات الإدارية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {/* سيتم عرض الإعلانات الحقيقية هنا */}
                  <tr className="hover:bg-red-50/30 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                        <span className="dark:text-white font-black">إعلان تجريبي رقم 1</span>
                      </div>
                    </td>
                    <td className="p-6 dark:text-gray-300">ناصر الخالدي</td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <button onClick={() => handleDelete('sample-id')} className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                          <Trash2 size={16} /> حذف الإعلان
                        </button>
                        <button className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                          <ShieldCheck size={16} /> توثيق البائع
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
</AdminGuard>)
