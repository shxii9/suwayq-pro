"use client";
import { Navbar } from "@/components/Navbar";
import { Phone, MessageCircle, Heart, Share2, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function ListingDetail({ params }: { params: { id: string } }) {
  const item = {
    title: "تويوتا لاندكروزر 2024",
    price: 32000,
    phone: "96590000000", // رقم تجريبي
    location: "الشويخ",
    description: "السيارة بحالة الوكالة، سيرفس منتظم."
  };

  const whatsappLink = `https://wa.me/${item.phone}?text=${encodeURIComponent('السلام عليكم، بخصوص إعلانك: ' + item.title + ' في موقع سويق برو')}`;

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617]" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-8">
                <img src="https://picsum.photos/seed/car1/1200/600" className="w-full object-cover" />
             </div>
             <div className="p-8 bg-slate-50 dark:bg-gray-900 rounded-[3rem]">
                <h1 className="text-3xl font-black dark:text-white mb-4">{item.title}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">{item.description}</p>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[3rem] shadow-xl sticky top-32">
              <div className="text-4xl font-black text-blue-600 mb-8">{item.price} د.ك</div>
              
              <div className="space-y-4">
                <a href={whatsappLink} target="_blank" className="flex items-center justify-center gap-3 w-full h-16 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black transition-all">
                  <MessageCircle size={24} /> تواصل عبر واتساب
                </a>
                <a href={`tel:${item.phone}`} className="flex items-center justify-center gap-3 w-full h-16 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black transition-all">
                  <Phone size={24} /> اتصال هاتفي
                </a>
              </div>
              
              <p className="mt-6 text-[10px] text-gray-400 text-center font-bold">هذا الإعلان مقدم مجاناً عبر منصة سويق برو</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
