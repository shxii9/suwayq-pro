import fs from "fs";
import path from "path";

// ===== DATA =====
const data = `
export const listings = [
  {
    id: "1",
    title: "آيفون 13 برو",
    price: 220,
    location: "الكويت",
    image: "/iphone.jpg",
    description: "جهاز نظيف جدًا"
  },
  {
    id: "2",
    title: "لابتوب Dell",
    price: 180,
    location: "حولي",
    image: "/laptop.jpg",
    description: "ممتاز للطلاب"
  }
];
`;

// ===== MARKET PAGE =====
const marketPage = `
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
`;

// ===== LISTING PAGE =====
const listingPage = `
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
    </div>
  );
}
`;

const files = {
  "src/lib/market-data.ts": data,
  "src/app/market/page.tsx": marketPage,
  "src/app/listing/[id]/page.tsx": listingPage,
};

for (const file in files) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, files[file]);
  console.log("✅", file);
}

console.log("\\n🚀 Marketplace + WhatsApp Subscription جاهز");
