"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ImageUpload } from "@/components/ImageUpload";
import { Loader2 } from "lucide-react";

export default function CreateListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "CARS",
    image: ""
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        }),
      });

      if (response.ok) {
        router.push("/");
        router.refresh();
      } else {
        alert("فشل في نشر الإعلان، تأكد من تسجيل الدخول");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 max-w-2xl">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h1 className="text-2xl font-black mb-8 text-gray-800">تفاصيل إعلانك الجديد</h1>
          
          <form onSubmit={onSubmit} className="space-y-6">
            {/* منطقة رفع الصورة */}
            <div className="space-y-2">
              <label className="font-bold text-gray-700">صورة الإعلان</label>
              <ImageUpload 
                value={formData.image} 
                onChange={(url) => setFormData({ ...formData, image: url })} 
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-gray-700">العنوان</label>
              <input
                required
                className="w-full p-4 rounded-2xl border bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="ماذا تبيع؟"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-bold text-gray-700">السعر (د.ك)</label>
                <input
                  required
                  type="number"
                  className="w-full p-4 rounded-2xl border bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="0.00"
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold text-gray-700">القسم</label>
                <select
                  className="w-full p-4 rounded-2xl border bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="CARS">سيارات</option>
                  <option value="REAL_ESTATE">عقارات</option>
                  <option value="ELECTRONICS">إلكترونيات</option>
                  <option value="HOME">أثاث</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-gray-700">الوصف التفصيلي</label>
              <textarea
                required
                rows={4}
                className="w-full p-4 rounded-2xl border bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="اكتب حالة السلعة، الملحقات، إلخ..."
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <button
              disabled={loading || !formData.image}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
            >
              {loading ? <Loader2 className="animate-spin" /> : "نشر الإعلان الآن"}
            </button>
            {!formData.image && <p className="text-center text-xs text-orange-500">يرجى رفع صورة أولاً لتتمكن من النشر</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
