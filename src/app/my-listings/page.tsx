
"use client";
import { getMyListings } from "@/lib/user-store";

export default function MyListings() {
  const items = getMyListings();

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-black mb-6">إعلاناتي</h1>

      {items.map(item => (
        <div key={item.id} className="border p-4 mb-3 rounded">
          <div className="font-bold">{item.title}</div>
          <div>{item.price} د.ك</div>
          <span className="text-sm">{item.status}</span>
        </div>
      ))}
    </div>
  );
}
