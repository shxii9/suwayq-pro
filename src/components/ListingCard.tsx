"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Heart, ShieldCheck } from "lucide-react";

export function ListingCard({ item }: any) {
  return (
    <Link href={`/listings/${item.id}`} className="group block">
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-slate-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-500">
        {/* Optimized Image Container */}
        <div className="relative h-60 w-full bg-slate-100 dark:bg-gray-800">
          <Image 
            src={item.images?.[0] || 'https://picsum.photos/400/300'} 
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 z-10">
            <button className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-all">
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">
              {item.category}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-green-600 font-black uppercase">
              <ShieldCheck size={12} /> موثوق
            </span>
          </div>
          
          <h3 className="text-lg font-black dark:text-white line-clamp-1 mb-2">
            {item.title}
          </h3>
          
          <div className="flex items-center gap-1 text-slate-400 text-xs font-bold mb-6">
            <MapPin size={14} className="text-blue-500" />
            {item.location || 'الكويت'}
          </div>

          <div className="pt-4 border-t border-slate-50 dark:border-gray-800 flex justify-between items-center">
            <span className="text-xl font-black text-blue-600 dark:text-blue-400">
              {item.price.toLocaleString()} <span className="text-xs uppercase">د.ك</span>
            </span>
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
