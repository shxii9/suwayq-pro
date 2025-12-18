import fs from "fs";
import path from "path";

// ========== USER STORE ==========
const userStore = `
let myListings = [
  { id: "1", title: "آيفون 13", price: 200, status: "ACTIVE" },
  { id: "2", title: "لابتوب HP", price: 150, status: "PENDING" },
];

let reports = [];

export function getMyListings() {
  return myListings;
}

export function report(listingId, reason) {
  reports.push({ listingId, reason });
}

export function getReports() {
  return reports;
}
`;

// ========== PROFILE PAGE ==========
const profilePage = `
"use client";

export default function Profile() {
  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-black mb-4">حسابي</h1>

      <div className="bg-white p-4 rounded border">
        <div>📧 user@email.com</div>
        <div>⭐ مستخدم عادي</div>
      </div>
    </div>
  );
}
`;

// ========== MY LISTINGS ==========
const myListingsPage = `
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
`;

// ========== REPORT PAGE ==========
const reportPage = `
"use client";
import { useState } from "react";
import { report } from "@/lib/user-store";

export default function ReportPage() {
  const [reason, setReason] = useState("");

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-xl font-black mb-4">إبلاغ عن إعلان</h1>

      <textarea
        className="border w-full p-2 rounded mb-3"
        placeholder="سبب البلاغ"
        value={reason}
        onChange={e => setReason(e.target.value)}
      />

      <button
        className="bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => {
          report("1", reason);
          alert("تم إرسال البلاغ");
        }}
      >
        إرسال
      </button>
    </div>
  );
}
`;

// FILES
const files = {
  "src/lib/user-store.ts": userStore,
  "src/app/profile/page.tsx": profilePage,
  "src/app/my-listings/page.tsx": myListingsPage,
  "src/app/report/page.tsx": reportPage,
};

for (const file in files) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, files[file]);
  console.log("✅", file);
}

console.log("\\n🚀 User Area UI جاهز");
