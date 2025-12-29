"use client";
import Image from "next/image";
import { Star, ShieldCheck, MapPin } from "lucide-react";

export function ListingCard({ item }: any) {
  // افترضنا أن الإعلان المميز يأتي بـ isPromoted: true من القاعدة
  const isPromoted = item.price > 10000; // مثال فقط للتمييز البصري حالياً

  return (
    <div className={`relative bg-white dark:bg-gray-900 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 ${isPromoted ? 'border-yellow-400 shadow-xl shadow-yellow-500/10' : 'border-slate-100 dark:border-gray-800'}`}>
      
      {isPromoted && (
        <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-[10px] font-black shadow-lg flex items-center gap-1">
          <Star size={12} fill="white" /> مميز
        </div>
      )}

      <div className="relative h-56 rounded-t-[2.5rem] overflow-hidden">
        <Image src={item.images?.[0] || 'https://picsum.photos/400/300'} alt={item.title} fill className="object-cover" />
      </div>

      <div className="p-6">
        <h3 className="font-black text-lg dark:text-white line-clamp-1">{item.title}</h3>
        <div className="flex items-center gap-2 mt-2 text-slate-400 text-xs font-bold">
           <MapPin size={14} /> {item.location}
        </div>
        <div className="mt-6 flex justify-between items-center">
           <span className="text-2xl font-black text-blue-600">{item.price} <span className="text-xs">د.ك</span></span>
           <div className={`px-4 py-2 rounded-xl text-[10px] font-black ${isPromoted ? 'bg-yellow-400 text-white' : 'bg-slate-100 dark:bg-gray-800 dark:text-white'}`}>
              تفاصيل
           </div>
        </div>
      </div>
    </div>
  );
}
