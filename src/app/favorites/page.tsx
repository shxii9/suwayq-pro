"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeartOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    fetch("/api/listings")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((item: any) => favIds.includes(item.id));
        setFavorites(filtered);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <h1 className="text-3xl font-black mb-8 text-gray-900 flex items-center gap-3">
          قائمة المفضلة <span className="text-red-500">❤️</span>
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <HeartOff size={60} className="mx-auto text-gray-200 mb-4" />
            <p className="text-xl font-bold text-gray-400">قائمة المفضلة فارغة</p>
            <Link href="/" className="text-blue-600 underline mt-2 block">تصفح الإعلانات الآن</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((item: any) => (
              <Link href={`/listing/${item.id}`} key={item.id} className="bg-white rounded-[2.2rem] overflow-hidden border border-gray-100 shadow-sm">
                <div className="relative aspect-square">
                  <Image src={item.image || "/placeholder.png"} fill className="object-cover" alt="" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-blue-600 font-black">{item.price} د.ك</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
