import fs from "fs";
import path from "path";

const files = [
  {
    path: "src/app/dashboard/page.tsx",
    content: `"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Users, Package, Shield } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then(res => {
        if (res.status === 401) router.push("/login");
        return res.json();
      })
      .then(setData)
      .catch(() => router.push("/login"));
  }, []);

  if (!data) return <div className="p-10">جاري التحميل...</div>;

  const isAdmin = data.isAdmin;

  return (
    <div className="p-10 space-y-8" dir="rtl">
      <h1 className="text-3xl font-black">لوحة التحكم</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="المستخدمين" value={data.stats.users} icon={<Users />} show={isAdmin} />
        <Card title="الإعلانات" value={data.stats.listings} icon={<Package />} />
        <Card title="البلاغات" value={data.stats.reports} icon={<Shield />} show={isAdmin} />
      </div>

      <div className="bg-white rounded-xl border">
        <div className="p-4 font-bold border-b">أحدث الإعلانات</div>
        {data.latestListings.map((l:any) => (
          <div key={l.id} className="p-4 border-b">
            {l.title} – {l.price}
          </div>
        ))}
      </div>

      <a
        href="https://wa.me/96500000000?text=أرغب بالاشتراك"
        target="_blank"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
      >
        الاشتراك عبر واتساب
      </a>
    </div>
  );
}

function Card({ title, value, icon, show = true }: any) {
  if (!show) return null;
  return (
    <div className="bg-white p-6 rounded-xl border flex justify-between">
      <div>
        <div className="text-gray-500 font-bold text-sm">{title}</div>
        <div className="text-3xl font-black">{value}</div>
      </div>
      {icon}
    </div>
  );
}
`
  },

  {
    path: "src/app/api/dashboard/stats/route.ts",
    content: `import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  const session = cookies().get("session");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = JSON.parse(session.value);
  const isAdmin = user.role === "ADMIN";

  const [users, listings, reports, latestListings] = await Promise.all([
    prisma.user.count(),
    prisma.listing.count(),
    prisma.report.count(),
    prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, price: true }
    })
  ]);

  return NextResponse.json({
    isAdmin,
    stats: { users, listings, reports },
    latestListings
  });
}
`
  }
];

files.forEach(file => {
  const fullPath = path.join(process.cwd(), file.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, file.content);
  console.log("✔ Created:", file.path);
});

console.log("🚀 Dashboard system installed successfully");
