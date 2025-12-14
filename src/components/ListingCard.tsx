"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Heart } from "lucide-react";

export function ListingCard({ item }: { item: any }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300 relative">
      {item.status === "promoted" && (
        <span className="absolute top-2 right-2 z-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
          مميّز
        </span>
      )}
      <button className="absolute top-2 left-2 z-10 p-1.5 bg-black/20 hover:bg-red-500 text-white rounded-full backdrop-blur-sm transition">
        <Heart size={16} />
      </button>

<div className="h-48 overflow-hidden relative bg-gray-100">
	        <Image
	          src={item.image}
	          alt={item.title}
	          fill
	          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
	          className="object-cover group-hover:scale-110 transition duration-700"
	        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex items-center gap-1 text-white text-xs font-medium">
            <MapPin size={12} /> {item.location}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition">{item.title}</h3>
        <p className="text-blue-600 font-black text-lg mb-3">{item.price}</p>

        <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-3 border-gray-50">
          <span className="bg-gray-50 text-gray-600 px-2 py-0.5 rounded">{item.category}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {item.date}
          </span>
        </div>
      </div>
    </div>
  );
}
