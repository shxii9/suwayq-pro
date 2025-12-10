import { Navbar } from "@/components/Navbar";
import { listings } from "@/lib/data";
import { BarChart3, Package, Eye } from "lucide-react";

import Image from 'next/image';

import Image from 'next/image';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-black mb-8">لوحة التحكم</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start mb-2">
               <span className="text-gray-500 text-sm font-bold">إجمالي الإعلانات</span>
               <Package className="text-blue-500" size={20}/>
            </div>
            <h3 className="text-3xl font-black">12</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start mb-2">
               <span className="text-gray-500 text-sm font-bold">المشاهدات</span>
               <Eye className="text-orange-500" size={20}/>
            </div>
            <h3 className="text-3xl font-black">1,450</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start mb-2">
               <span className="text-gray-500 text-sm font-bold">الأرباح</span>
               <BarChart3 className="text-green-500" size={20}/>
            </div>
            <h3 className="text-3xl font-black">45 د.ك</h3>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b font-bold">إعلاناتي النشطة</div>
          <div className="divide-y">
            {listings.slice(0,3).map(item => (
              <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <img src={item.image} className="w-10 h-10 rounded object-cover"/>
                  <span className="font-bold text-gray-800">{item.title}</span>
                </div>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">نشط</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


