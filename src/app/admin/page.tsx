
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
