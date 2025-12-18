
"use client";
import { listings } from "@/lib/market-data";
import Image from "next/image";

export default function Market() {
  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-black mb-6">السوق</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {listings.map(item => (
          <div key={item.id} className="border rounded-2xl p-4 bg-white">
            <Image src={item.image} alt={item.title} width={300} height={200} className="rounded mb-3"/>
            <h2 className="font-black">{item.title}</h2>
            <p>{item.price} د.ك</p>
            <p className="text-sm text-gray-500">{item.location}</p>

            <a
              href={"/listing/" + item.id}
              className="block mt-3 bg-black text-white text-center py-2 rounded"
            >
              عرض الإعلان
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
