import fs from "fs";
import path from "path";

const files = {
  // ---------- MOCK API ----------
  "src/lib/mock.ts": `
export const mockStats = {
  users: 12,
  listings: 34,
  reports: 2,
};

export const mockListings = [
  {
    id: "1",
    title: "آيفون 14 برو",
    price: 250,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "سيارة تويوتا",
    price: 3200,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  },
];
`,

  // ---------- DASHBOARD PAGE ----------
  "src/app/dashboard/page.tsx": `
"use client";
import { mockStats, mockListings } from "@/lib/mock";

export default function Dashboard() {
  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-black mb-6">لوحة التحكم</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Stat title="المستخدمين" value={mockStats.users} />
        <Stat title="الإعلانات" value={mockStats.listings} />
        <Stat title="البلاغات" value={mockStats.reports} />
      </div>

      <h2 className="font-bold mb-2">أحدث الإعلانات</h2>
      <ul className="space-y-2">
        {mockListings.map(l => (
          <li key={l.id} className="border p-3 rounded">
            {l.title} — {l.price} د.ك
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ title, value }: any) {
  return (
    <div className="bg-white border rounded p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-black">{value}</div>
    </div>
  );
}
`,

  // ---------- ADMIN PAGE ----------
  "src/app/admin/page.tsx": `
"use client";
import { mockListings } from "@/lib/mock";

export default function AdminPage() {
  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-black mb-6">لوحة الإدارة</h1>
      {mockListings.map(l => (
        <div key={l.id} className="border p-4 mb-2 rounded">
          {l.title} — <b>{l.status}</b>
        </div>
      ))}
    </div>
  );
}
`
};

for (const file in files) {
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, files[file]);
  console.log("✅ created", file);
}

console.log("\n🚀 UI + Mock APIs جاهزة بالكامل");
