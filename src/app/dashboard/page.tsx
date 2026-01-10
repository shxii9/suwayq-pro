
"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState({ users: 0, listings: 0 });

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <div dir="rtl" className="p-8">
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <div className="text-gray-500">المستخدمين</div>
          <div className="text-3xl font-black">{data.users}</div>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <div className="text-gray-500">الإعلانات</div>
          <div className="text-3xl font-black">{data.listings}</div>
        </div>
      </div>

      <a
        href="https://wa.me/96500000000?text=أرغب%20بالاشتراك"
        className="bg-green-600 text-white px-6 py-3 rounded font-bold"
      >
        الاشتراك عبر واتساب
      </a>
    </div>
  );
}
