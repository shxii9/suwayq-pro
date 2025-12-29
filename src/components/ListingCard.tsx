"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Heart, Zap } from "lucide-react";

export function ListingCard({ item }: { item: any }) {
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2">
      {/* صورة الإعلان مع تأثير التكبير */}
      <div className="relative aspect-[1/1] overflow-hidden">
        <Image 
          src={item.image} 
          alt={item.title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        {/* شارة "مميز" الزجاجية */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Zap size={12} className="text-yellow-400 fill-yellow-400" />
          مميز
        </div>
        {/* زر المفضلة العائم */}
        <button className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-red-500 transition-colors">
          <Heart size={18} />
        </button>
      </div>

      {/* تفاصيل الإعلان */}
      <div className="p-5 text-right">
        <div className="flex justify-between items-start mb-2">
           <span className="text-blue-600 dark:text-blue-400 font-black text-xl leading-none">
            {item.price} <small className="text-xs">د.ك</small>
          </span>
          <h3 className="font-bold text-gray-800 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
        </div>
        
        <div className="flex items-center justify-end text-gray-400 text-xs mb-4 gap-1">
          <span>{item.location}</span>
          <MapPin size={12} />
        </div>

        <Link 
          href={`/listing/${item.id}`} 
          className="block w-full text-center py-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
}
