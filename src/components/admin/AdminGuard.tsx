"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "ADMIN") {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="h-screen bg-[#020617]" />;

  if (!isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#020617] p-6 text-center">
        <Lock size={48} className="text-red-500 mb-6" />
        <h1 className="text-2xl font-black text-white">منطقة محمية</h1>
        <button onClick={() => router.push("/")} className="mt-4 bg-white px-6 py-2 rounded-xl font-bold">العودة</button>
      </div>
    );
  }

  return <>{children}</>;
}
