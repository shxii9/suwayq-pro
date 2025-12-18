import fs from "fs";
import path from "path";

// ========== ADMIN CHECK ==========
const adminGuard = `
export function isAdmin() {
  return true; // مؤقتًا - سيتم ربطها بالجلسة لاحقًا
}
`;

// ========== STORE ==========
const store = `
let listings = [
  { id: "1", title: "آيفون 14 برو", price: 250, status: "PENDING" },
  { id: "2", title: "سيارة تويوتا", price: 3200, status: "ACTIVE" }
];

export function getPending() {
  return listings.filter(l => l.status === "PENDING");
}

export function approve(id) {
  listings = listings.map(l => l.id === id ? { ...l, status: "ACTIVE" } : l);
}

export function reject(id) {
  listings = listings.map(l => l.id === id ? { ...l, status: "REJECTED" } : l);
}
`;

// ========== ADMIN PAGE ==========
const adminPage = `
"use client";
import { getPending, approve, reject } from "@/lib/admin-store";
import { isAdmin } from "@/lib/admin-guard";

export default function AdminListings() {
  if (!isAdmin()) return <div className="p-8">غير مصرح</div>;

  const items = getPending();

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-black mb-6">إعلانات بانتظار الموافقة</h1>

      {items.length === 0 && <p>لا يوجد</p>}

      {items.map(item => (
        <div key={item.id} className="border p-4 mb-3 rounded">
          <div className="font-bold">{item.title}</div>
          <div>{item.price} د.ك</div>

          <div className="flex gap-3 mt-3">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={() => approve(item.id)}
            >
              قبول
            </button>

            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => reject(item.id)}
            >
              رفض
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
`;

// WRITE FILES
const files = {
  "src/lib/admin-guard.ts": adminGuard,
  "src/lib/admin-store.ts": store,
  "src/app/admin/listings/page.tsx": adminPage,
};

for (const file in files) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, files[file]);
  console.log("✅", file);
}

console.log("\\n🚀 Admin Moderation UI جاهز");
