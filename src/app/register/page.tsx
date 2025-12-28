"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { User, Mail, Lock, Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/login?message=success");
      } else {
        const data = await res.json();
        setError(data.error || "فشل التسجيل، حاول مرة أخرى");
      }
    } catch (err) {
      setError("خطأ في الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 flex flex-col font-sans" dir="rtl">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 pt-20">
        <div className="bg-white p-8 md:p-12 md:rounded-[3rem] md:shadow-2xl md:shadow-blue-100/50 border-0 md:border border-gray-100 w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-8 duration-500">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 rounded-3xl mb-6">
              <User className="text-orange-500" size={35} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">ابدأ رحلتك!</h1>
            <p className="text-gray-400 font-medium">أنشئ حسابك الآن وابدأ بالبيع والشراء في دقائق</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold text-center border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 pr-2">الاسم الكامل</label>
              <div className="relative group">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="text"
                  required
                  placeholder="مثال: محمد الأحمد"
                  className="w-full pr-12 pl-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 pr-2">البريد الإلكتروني</label>
              <div className="relative group">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pr-12 pl-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 pr-2">كلمة المرور</label>
              <div className="relative group">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pr-12 pl-12 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 group active:scale-[0.98] mt-4"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  <span>إنشاء الحساب</span>
                  <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-gray-500 font-medium">
              تملك حساباً بالفعل؟{" "}
              <Link href="/login" className="text-blue-600 font-black hover:underline underline-offset-4">
                سجل دخولك الآن
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
