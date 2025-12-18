import fs from "fs";
import path from "path";

const w = (f, c) => {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, c);
  console.log("✅", f);
};

/* ================= PRISMA ROLE ================= */
w("prisma/schema.prisma", fs.readFileSync("prisma/schema.prisma","utf8")
.replace(
  /model User \{/,
  `model User {
  role String @default("USER")`
));

/* ================= ADMIN GUARD ================= */
w("src/lib/admin.ts", `
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function requireAdmin() {
  const id = cookies().get("session")?.value;
  if (!id) throw new Error("UNAUTHORIZED");

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.role !== "ADMIN") throw new Error("FORBIDDEN");

  return user;
}
`);

/* ================= ADMIN API PROTECTION ================= */
w("src/app/api/admin/listings/route.ts", `
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  await requireAdmin();
  const listings = await prisma.listing.findMany({
    include:{ user:true }
  });
  return NextResponse.json(listings);
}
`);

/* ================= ADMIN LISTINGS PAGE ================= */
w("src/app/admin/listings/page.tsx", `
"use client";
import { useEffect, useState } from "react";

export default function AdminListings() {
  const [data,setData] = useState([]);

  useEffect(()=>{
    fetch("/api/admin/listings")
      .then(r=>r.json())
      .then(setData);
  },[]);

  return (
    <div dir="rtl" className="p-6">
      <h1 className="text-2xl font-bold mb-4">إدارة الإعلانات</h1>
      <div className="bg-white rounded-xl shadow border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">العنوان</th>
              <th>المالك</th>
            </tr>
          </thead>
          <tbody>
            {data.map((l:any)=>(
              <tr key={l.id} className="border-t">
                <td className="p-2">{l.title}</td>
                <td>{l.user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`);

/* ================= DASHBOARD UI IMPROVE ================= */
w("src/app/dashboard/page.tsx", `
"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats,setStats] = useState<any>(null);

  useEffect(()=>{
    fetch("/api/dashboard/stats")
      .then(r=>r.json())
      .then(setStats);
  },[]);

  if(!stats) return <div className="p-6">Loading...</div>;

  return (
    <div dir="rtl" className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card title="المستخدمين" value={stats.stats.users}/>
        <Card title="الإعلانات" value={stats.stats.listings}/>
        <Card title="البلاغات" value={stats.stats.reports}/>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-bold mb-3">أحدث الإعلانات</h2>
        {stats.latestListings.map((l:any)=>(
          <div key={l.id} className="border-b p-2">
            {l.title} – {l.price || "-"}
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({title,value}:{title:string,value:any}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <div className="text-gray-500">{title}</div>
      <div className="text-3xl font-black">{value}</div>
    </div>
  );
}
`);

console.log("🔥 Roles + UI Done");
