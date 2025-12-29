"use client";
export const dynamic = 'force-dynamic';
import { Navbar } from "@/components/Navbar";
import { Upload, Plus, Info, Image as ImageIcon } from "lucide-react";

export default function CreateListing() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617]" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">أضف إعلانك الجديد</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">املأ البيانات التالية لتبدأ ببيع سلعتك اليوم</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 shadow-2xl shadow-blue-500/5 border border-gray-100 dark:border-gray-800">
            <form className="space-y-8">
              {/* رفع الصور بتصميم عصري */}
              <div className="group relative border-4 border-dashed border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-12 text-center hover:border-blue-500 transition-all cursor-pointer bg-gray-50/50 dark:bg-gray-800/30">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-3xl flex items-center justify-center">
                    <ImageIcon size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black dark:text-white">ارفع صور إعلانك</h3>
                    <p className="text-gray-400 text-sm mt-1 font-bold">يمكنك رفع حتى 5 صور (JPG, PNG)</p>
                  </div>
                </div>
              </div>

              {/* حقول المدخلات */}
              <div className="grid gap-6">
                <div className="space-y-2 text-right">
                  <label className="font-black text-gray-700 dark:text-gray-300 mr-2">عنوان الإعلان</label>
                  <input type="text" placeholder="مثال: آيفون 15 برو بحالة ممتازة" className="w-full h-16 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-blue-500 dark:text-white font-bold" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 text-right">
                    <label className="font-black text-gray-700 dark:text-gray-300 mr-2">السعر (د.ك)</label>
                    <input type="number" placeholder="0.00" className="w-full h-16 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-blue-500 dark:text-white font-black" />
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="font-black text-gray-700 dark:text-gray-300 mr-2">القسم</label>
                    <select className="w-full h-16 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-blue-500 dark:text-white font-bold appearance-none">
                      <option>اختر القسم</option>
                      <option>سيارات</option>
                      <option>الكترونيات</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <label className="font-black text-gray-700 dark:text-gray-300 mr-2">تفاصيل الإعلان</label>
                  <textarea rows="5" placeholder="اشرح تفاصيل السلعة بوضوح..." className="w-full p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-blue-500 dark:text-white font-medium"></textarea>
                </div>
              </div>

              <button className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-blue-500/40 transition-all active:scale-95">
                نشر الإعلان الآن
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
