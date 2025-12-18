
"use client";
import { listings } from "@/lib/market-data";
import Image from "next/image";

export default function Listing({ params }) {
  const item = listings.find(l => l.id === params.id);

  if (!item) return <div>غير موجود</div>;

  return (
    <div className="p-8" dir="rtl">
      <Image src={item.image} alt={item.title} width={400} height={300} className="rounded mb-4"/>

      <h1 className="text-2xl font-black">{item.title}</h1>
      <p className="my-2">{item.description}</p>
      <p className="font-bold">{item.price} د.ك</p>

      <a
        href="https://wa.me/96500000000?text=اريد%20الاشتراك%20في%20الخدمة"
        target="_blank"
        className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        اشترك الآن (واتساب)
      </a>

      
<a
  href={"/chat/" + item.id}
  className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
>
  تواصل مع البائع
</a>

    </div>
  );
}
