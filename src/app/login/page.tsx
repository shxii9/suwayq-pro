"use client";
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
}