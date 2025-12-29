"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Heart, Zap, ShieldCheck } from "lucide-react";

export function ListingCard({ item }: { item: any }) {
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-all duration-500 hover:-translate-y-2">
      <div className="relative aspect-square overflow-hidden">
        <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 right-4 bg-blue-600/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow-lg">
          <Zap size={10} className="fill-current" /> مُميز
        </div>
        <button className="absolute top-4 left-4 p-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-red-500 transition-all duration-300">
          <Heart size={18} />
        </button>
      </div>
      <div className="p-6 text-right">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col items-start">
            <span className="text-blue-600 dark:text-blue-400 font-black text-2xl tracking-tighter">{item.price}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase">دينار كويتي</span>
          </div>
          <h3 className="font-black text-lg text-gray-800 dark:text-gray-100 line-clamp-1">{item.title}</h3>
        </div>
        <div className="flex items-center justify-end text-gray-400 text-xs mb-5 gap-1.5 font-bold">
          <span>{item.location}</span>
          <MapPin size={14} className="text-blue-500" />
        </div>
        <Link href={`/listing/${item.id}`} className="flex items-center justify-center gap-2 w-full py-4 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-2xl font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-transparent group-hover:border-blue-500">
          تفاصيل الإعلان
        </Link>
      </div>
    </div>
  );
}
