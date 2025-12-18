import fs from "fs";
import path from "path";

const write = (p, c) => {
  const full = path.join(process.cwd(), p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, c);
  console.log("✔", p);
};

/* =====================
   DASHBOARD PAGE
===================== */
write(
  "src/app/dashboard/page.tsx",
  `"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then(r => r.status === 401 ? router.push("/login") : r.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-10">جاري التحميل...</div>;

  return (
    <div className="p-10 space-y-6" dir="rtl">
      <h1 className="text-3xl font-black">لوحة التحكم</h1>

      <div className="grid grid-cols-3 gap-4">
        <Box label="المستخدمين" v={data.stats.users} />
        <Box label="الإعلانات" v={data.stats.listings} />
        <Box label="البلاغات" v={data.stats.reports} />
      </div>

      <a
        href="https://wa.me/96500000000?text=أرغب بالاشتراك"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
      >
        الاشتراك عبر واتساب
      </a>
    </div>
  );
}

const Box = ({ label, v }: any) => (
  <div className="bg-white p-6 rounded-xl border">
    <div className="text-gray-500 font-bold">{label}</div>
    <div className="text-3xl font-black">{v}</div>
  </div>
);`
);

/* =====================
   ADMIN LISTINGS
===================== */
write(
  "src/app/admin/listings/page.tsx",
  `"use client";
import { useEffect, useState } from "react";

export default function AdminListings() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/listings").then(r => r.json()).then(setItems);
  }, []);

  return (
    <div className="p-10" dir="rtl">
      <h1 className="text-2xl font-black mb-4">إدارة الإعلانات</h1>
      {items.map(i => (
        <div key={i.id} className="p-4 border mb-2 flex justify-between">
          <span>{i.title}</span>
          <span>{i.status}</span>
        </div>
      ))}
    </div>
  );
}`
);

/* =====================
   ADMIN API
===================== */
write(
  "src/app/api/admin/listings/route.ts",
  `import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const listings = await prisma.listing.findMany();
  return NextResponse.json(listings);
}`
);

/* =====================
   DASHBOARD API
===================== */
write(
  "src/app/api/dashboard/stats/route.ts",
  `import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const s = cookies().get("session");
  if (!s) return NextResponse.json({}, { status: 401 });

  const [users, listings, reports] = await Promise.all([
    prisma.user.count(),
    prisma.listing.count(),
    prisma.report.count()
  ]);

  return NextResponse.json({ stats: { users, listings, reports } });
}`
);

console.log("🚀 FULL SYSTEM GENERATED SUCCESSFULLY");
