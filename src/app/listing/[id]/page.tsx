"use client";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { MapPin, Phone, MessageCircle, Share2, ShieldCheck, Clock, Tag } from "lucide-react";

export default function ListingDetails() {
  const item = {
    title: "آيفون 15 برو ماكس - شبه جديد",
    price: "320",
    location: "حولي، الكويت",
    description: "الجهاز بحالة الوكالة، استعمال أسبوع واحد فقط. كامل الملحقات موجودة مع الكفالة.",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800",
    user: "أحمد محمد",
    date: "منذ ساعتين"
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-500" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* العمود الأيمن: المعلومات والاتصال */}
          <div className="w-full lg:w-1/3 order-2 lg:order-1">
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl sticky top-32">
              <div className="mb-6">
                <span className="text-blue-600 dark:text-blue-400 font-black text-4xl">{item.price} <small className="text-sm">د.ك</small></span>
              </div>
              
              <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-3xl">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold">أ</div>
                <div>
                  <h4 className="font-black dark:text-white">{item.user}</h4>
                  <span className="text-xs text-gray-400">عضو موثوق منذ 2023</span>
                </div>
                <ShieldCheck className="mr-auto text-green-500" size={20} />
              </div>

              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-center gap-3 w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] font-black shadow-lg shadow-blue-500/30 transition-all active:scale-95">
                  <Phone size={20} /> اتصل الآن
                </button>
                <button className="flex items-center justify-center gap-3 w-full py-5 bg-green-500 hover:bg-green-600 text-white rounded-[1.5rem] font-black shadow-lg shadow-green-500/30 transition-all active:scale-95">
                  <MessageCircle size={20} /> واتساب
                </button>
              </div>
            </div>
          </div>

          {/* العمود الأيسر: الصور والتفاصيل */}
          <div className="w-full lg:w-2/3 order-1 lg:order-2">
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
              <div className="relative aspect-video">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-10 text-right">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                    <Tag size={14} /> الكترونيات
                  </span>
                  <span className="bg-gray-50 dark:bg-gray-800 text-gray-500 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                    <Clock size={14} /> {item.date}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">{item.title}</h1>
                <div className="flex items-center justify-end text-gray-400 gap-2 mb-8 font-bold">
                  <span>{item.location}</span>
                  <MapPin size={18} className="text-blue-500" />
                </div>
                <hr className="border-gray-100 dark:border-gray-800 mb-8" />
                <h3 className="text-xl font-black mb-4 dark:text-white text-right">الوصف</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{item.description}</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
