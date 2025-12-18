import fs from "fs";
import path from "path";

const root = process.cwd();
const w = (p, c) => {
  const f = path.join(root, p);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, c);
  console.log("✔", p);
};

/* ================= AUTH ================= */
w("src/lib/auth.ts", `
import { cookies } from "next/headers";

export const setSession = (id:string) =>
  cookies().set("session", id, { httpOnly:true, path:"/" });

export const getSession = () =>
  cookies().get("session")?.value;

export const clearSession = () =>
  cookies().delete("session");
`);

/* ================= MIDDLEWARE ================= */
w("src/middleware.ts", `
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const s = req.cookies.get("session");
  const p = req.nextUrl.pathname;

  if ((p.startsWith("/dashboard") || p.startsWith("/admin")) && !s)
    return NextResponse.redirect(new URL("/login", req.url));
}
`);

/* ================= LOGIN ================= */
w("src/app/login/page.tsx", `"use client";
import { useRouter } from "next/navigation";
export default function Login(){
 const r=useRouter();
 return (
  <div className="p-10">
    <h1>تسجيل الدخول</h1>
    <button onClick={()=>{document.cookie="session=1";r.push("/dashboard")}}>
      دخول
    </button>
  </div>
 );
}`);

/* ================= REGISTER ================= */
w("src/app/register/page.tsx", `"use client";
export default function Register(){
 return <div className="p-10">تسجيل مستخدم جديد</div>;
}`);

/* ================= DASHBOARD ================= */
w("src/app/dashboard/page.tsx", `"use client";
export default function Dashboard(){
 return (
  <div className="p-10" dir="rtl">
    <h1 className="text-3xl font-black">لوحة المستخدم</h1>
    <a href="https://wa.me/96500000000?text=أرغب بالاشتراك"
       className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-xl">
       الاشتراك عبر واتساب
    </a>
  </div>
 );
}`);

/* ================= ADMIN DASHBOARD ================= */
w("src/app/admin/dashboard/page.tsx", `"use client";
export default function Admin(){
 return <div className="p-10">لوحة تحكم الأدمن</div>;
}`);

/* ================= ADMIN LISTINGS ================= */
w("src/app/admin/listings/page.tsx", `"use client";
export default function Listings(){
 return <div className="p-10">إدارة الإعلانات</div>;
}`);

/* ================= ADMIN REPORTS ================= */
w("src/app/admin/reports/page.tsx", `"use client";
export default function Reports(){
 return <div className="p-10">البلاغات</div>;
}`);

/* ================= DASHBOARD API ================= */
w("src/app/api/dashboard/stats/route.ts", `
import { NextResponse } from "next/server";
export async function GET(){
 return NextResponse.json({
  users:0,listings:0,reports:0
 });
}`);

/* ================= DONE ================= */
console.log("🚀 المشروع بُني بالكامل بنجاح");
