"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Trash2, ExternalLink, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyListings = async () => {
    const res = await fetch("/api/my-listings");
    const data = await res.json();
    setListings(data);
    setLoading(false);
  };

  useEffect(() => { fetchMyListings(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الإعلان؟")) return;
    
    const res = await fetch(`/api/listings/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("تم حذف الإعلان بنجاح", { icon: '🗑️', style: { borderRadius: '15px', background: '#333', color: '#fff' } });
      fetchMyListings();
    } else {
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 pt-28">
        <h1 className="text-3xl font-black mb-8 text-gray-900">إعلاناتي النشطة</h1>
        
        {loading ? (
          <p className="text-gray-500">جاري جلب بياناتك...</p>
        ) : listings.length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-gray-100">
            <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-bold">لا توجد لديك إعلانات حالياً</p>
            <Link href="/listings/create" className="text-blue-600 underline mt-2 block">أضف إعلانك الأول الآن</Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {listings.map((item: any) => (
              <div key={item.id} className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden">
                    <Image src={item.image || "/placeholder.png"} fill className="object-cover" alt="" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                    <p className="text-blue-600 font-black">{item.price} د.ك</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link href={`/listing/${item.id}`} className="p-4 bg-gray-50 text-gray-600 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <ExternalLink size={20} />
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
