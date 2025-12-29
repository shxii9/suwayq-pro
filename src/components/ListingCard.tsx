"use client";
import { Heart, MapPin, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";

export function ListingCard({ item }) {
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-5 left-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-1 shadow-sm">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-black dark:text-white">4.8</span>
        </div>
        <button className="absolute top-5 right-5 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-2xl text-white transition-all">
          <Heart size={20} />
        </button>
        <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black">
          {item.category || "مميز"}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            <ShieldCheck size={12} /> بائع موثوق
          </div>
        </div>
        
        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
        
        <div className="flex items-center gap-2 text-slate-400 mb-6 font-bold text-sm">
          <MapPin size={16} className="text-blue-500" />
          {item.location}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">السعر</span>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
              {item.price.toLocaleString()} <span className="text-sm font-bold">د.ك</span>
            </span>
          </div>
          <button className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all group/btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
