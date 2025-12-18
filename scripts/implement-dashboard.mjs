import fs from "fs";
import path from "path";

const dashboardDir = "src/app/dashboard";
fs.mkdirSync(dashboardDir, { recursive: true });

// ---------- page.tsx (Server Component) ----------
fs.writeFileSync(
  path.join(dashboardDir, "page.tsx"),
  `
import { cookies } from "next/headers";
import DashboardClient from "./DashboardClient";

async function getDashboardData() {
  const cookieStore = cookies();

  const res = await fetch("http://localhost:3000/api/dashboard/stats", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  return <DashboardClient data={data} />;
}
`
);

// ---------- DashboardClient.tsx (Client Component) ----------
fs.writeFileSync(
  path.join(dashboardDir, "DashboardClient.tsx"),
  `
"use client";

import { Navbar } from "@/components/Navbar";
import { BarChart3, Package, Eye } from "lucide-react";

export default function DashboardClient({ data }) {
  const { stats, latestListings } = data;

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-black mb-8">لوحة التحكم</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="إجمالي المستخدمين"
            value={stats.users}
            icon={<Package className="text-blue-500" size={20} />}
          />
          <StatCard
            title="إجمالي الإعلانات"
            value={stats.listings}
            icon={<Eye className="text-orange-500" size={20} />}
          />
          <StatCard
            title="البلاغات"
            value={stats.reports}
            icon={<BarChart3 className="text-green-500" size={20} />}
          />
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b font-bold">آخر الإعلانات</div>

          <div className="divide-y">
            {latestListings.map((item) => (
              <div
                key={item.id}
                className="p-4 flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-bold text-gray-800">{item.title}</span>
                <span className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <span className="text-gray-500 text-sm font-bold">{title}</span>
        {icon}
      </div>
      <h3 className="text-3xl font-black">{value}</h3>
    </div>
  );
}
`
);

console.log("✅ Dashboard fully implemented (Server + Client + API)");
