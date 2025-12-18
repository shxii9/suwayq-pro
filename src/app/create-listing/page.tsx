
"use client";
import { useState } from "react";
import { createListing } from "@/lib/listings-store";
import { useRouter } from "next/navigation";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-black mb-6">إضافة إعلان</h1>

      <input
        className="border p-2 mb-2 w-full"
        placeholder="العنوان"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        className="border p-2 mb-4 w-full"
        placeholder="السعر"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={() => {
          createListing({ title, price: Number(price) });
          router.push("/listings");
        }}
      >
        حفظ
      </button>
    </div>
  );
}
