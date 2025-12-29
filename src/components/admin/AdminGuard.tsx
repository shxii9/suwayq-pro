"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Lock } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // في الواقع سنفحص الجلسة من الـ API
    // هنا سنقوم بمحاكاة الفحص لضمان الحماية
    const checkAuth = async () => {
      // لنفترض أننا نفحص الـ Role من الكوكيز أو التوكن
      const userRole = localStorage.getItem("userRole"); 
      
      if (userRole !== "ADMIN") {
        setTimeout(() => {
          setLoading(false);
          setIsAdmin(false);
        }, 1500);
      } else {
        setIsAdmin(true);
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-black text-xl animate-pulse">جاري التحقق من صلاحيات المدير...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#020617] p-6 text-center">
        <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-[2rem] flex items-center justify-center mb-6">
          <Lock size={48} />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">منطقة محظورة!</h1>
        <p className="text-gray-400 font-bold mb-8">ليس لديك الصلاحيات الكافية لدخول لوحة التحكم.</p>
        <button 
          onClick={() => router.push("/")}
          className="bg-white text-black px-10 py-4 rounded-2xl font-black hover:bg-gray-200 transition-all"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
