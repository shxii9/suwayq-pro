
"use client";
import { useState } from "react";
import { getListings, deleteListing } from "@/lib/listings-store";

export default function ListingsPage() {
  const [items, setItems] = useState(getListings());

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-black mb-6">الإعلانات</h1>

      {items.length === 0 && <p>لا توجد إعلانات</p>}

      {items.map(item => (
        <div key={item.id} className="border p-4 mb-3 rounded">
          <div className="font-bold">{item.title}</div>
          <div>{item.price} د.ك</div>
          <button
            className="text-red-600 mt-2"
            onClick={() => {
              deleteListing(item.id);
              setItems(getListings());
            }}
          >
            حذف
          </button>
        </div>
      ))}
    </div>
  );
}
