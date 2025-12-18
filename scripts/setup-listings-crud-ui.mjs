import fs from "fs";
import path from "path";

const files = {
  // -------- MOCK STORE --------
  "src/lib/listings-store.ts": `
let listings = [
  {
    id: "1",
    title: "آيفون 14 برو",
    price: 250,
    description: "نظيف جدًا",
    status: "ACTIVE",
  },
  {
    id: "2",
    title: "سيارة تويوتا",
    price: 3200,
    description: "استخدام شخصي",
    status: "PENDING",
  },
];

export function getListings() {
  return listings;
}

export function getListing(id) {
  return listings.find(l => l.id === id);
}

export function createListing(data) {
  const item = { id: Date.now().toString(), status: "PENDING", ...data };
  listings.push(item);
  return item;
}

export function deleteListing(id) {
  listings = listings.filter(l => l.id !== id);
}
`,

  // -------- LISTINGS PAGE --------
  "src/app/listings/page.tsx": `
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
`,

  // -------- CREATE LISTING --------
  "src/app/create-listing/page.tsx": `
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
`
};

for (const file in files) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, files[file]);
  console.log("✅ created", file);
}

console.log("\\n🚀 Listings CRUD UI جاهز");
