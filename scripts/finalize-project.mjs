import fs from "fs";
import path from "path";

const w = (f, c) => {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, c);
  console.log("✅", f);
};

/* ================= ADMIN DASHBOARD ================= */
w("src/app/admin/page.tsx", `
"use client";
import Link from "next/link";
export default function Admin() {
  return (
    <div dir="rtl" className="p-6">
      <h1 className="text-2xl font-bold mb-4">لوحة الإدارة</h1>
      <div className="space-y-3">
        <Link href="/admin/users">إدارة المستخدمين</Link><br/>
        <Link href="/admin/listings">إدارة الإعلانات</Link><br/>
        <Link href="/admin/reports">البلاغات</Link>
      </div>
    </div>
  );
}
`);

/* ================= ADMIN USERS ================= */
w("src/app/admin/users/page.tsx", `
"use client";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/admin/users").then(r => r.json()).then(setUsers);
  }, []);
  return (
    <div dir="rtl" className="p-6">
      <h1 className="text-xl font-bold mb-4">المستخدمين</h1>
      {users.map((u:any) => (
        <div key={u.id} className="border p-2 mb-2">{u.email}</div>
      ))}
    </div>
  );
}
`);

/* ================= ADMIN USERS API ================= */
w("src/app/api/admin/users/route.ts", `
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET() {
  const users = await prisma.user.findMany({ select: { id:true, email:true }});
  return NextResponse.json(users);
}
`);

/* ================= LISTINGS CRUD ================= */
w("src/app/dashboard/listings/page.tsx", `
"use client";
import { useEffect, useState } from "react";

export default function Listings() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");

  const load = () =>
    fetch("/api/listings").then(r=>r.json()).then(setList);

  useEffect(load, []);

  const add = async () => {
    await fetch("/api/listings", {
      method:"POST",
      body: JSON.stringify({ title }),
    });
    setTitle("");
    load();
  };

  return (
    <div dir="rtl" className="p-6">
      <h1 className="font-bold mb-3">إعلاناتي</h1>
      <input value={title} onChange={e=>setTitle(e.target.value)}
        className="border p-2"/>
      <button onClick={add} className="bg-black text-white p-2 mr-2">إضافة</button>
      {list.map((l:any)=>(
        <div key={l.id} className="border p-2 mt-2">{l.title}</div>
      ))}
    </div>
  );
}
`);

/* ================= LISTINGS API ================= */
w("src/app/api/listings/route.ts", `
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  return NextResponse.json(await prisma.listing.findMany());
}

export async function POST(req:Request) {
  const body = await req.json();
  const userId = cookies().get("session")?.value;
  if(!userId) return NextResponse.json({error:"unauth"}, {status:401});

  await prisma.listing.create({
    data:{ title: body.title, userId }
  });
  return NextResponse.json({ok:true});
}
`);

console.log("🔥 Project fully finalized");
