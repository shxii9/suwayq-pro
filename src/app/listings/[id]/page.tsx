"use client";
import { Navbar } from "@/components/Navbar";
import { 
  Phone, 
  MessageCircle, 
  Share2, 
  Heart, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

// ملاحظة: في النسخة الحقيقية يتم جلب البيانات من الـ API بناءً على الـ ID
export default function ListingDetail() {
  const item = {
    title: "مرسيدس G63 AMG موديل 2023",
    price: 48000,
    location: "الشويخ الصناعية",
    createdAt: "منذ ساعتين",
    description: "للبيع مرسيدس G63 AMG، لون أسود مطفي، داخلية أحمر، تشيكات وكالة منتظمة، تحت الكفالة. السيارة بحالة الوكالة تماماً.",
    category: "سيارات",
    status: "ACTIVE",
    seller: {
      name: "بدر المنصور",
      joined: "عضو منذ 2022",
      verified: true
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617]" dir="rtl">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 font-bold">
          <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
          <ArrowRight size={14} />
          <Link href="/search" className="hover:text-blue-600">{item.category}</Link>
          <ArrowRight size={14} />
          <span className="text-gray-900 dark:text-gray-200">{item.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Images & Description */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative rounded-[3rem] overflow-hidden bg-gray-100 aspect-video shadow-2xl">
              <img src="https://images.unsplash.com/photo-1520050206274-a1af4463d84d?w=1200" className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 flex gap-2">
                <button className="p-4 bg-white/90 backdrop-blur rounded-2xl shadow-xl hover:bg-red-50 text-red-500 transition-all">
                  <Heart size={24} />
                </button>
                <button className="p-4 bg-white/90 backdrop-blur rounded-2xl shadow-xl hover:bg-blue-50 text-blue-600 transition-all">
                  <Share2 size={24} />
                </button>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-gray-900/50 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-black mb-6 dark:text-white">تفاصيل الإعلان</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium">
                {item.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t border-gray-200 dark:border-gray-800">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs font-bold uppercase">المنطقة</span>
                  <span className="font-black dark:text-white flex items-center gap-1"><MapPin size={14} className="text-blue-600"/> {item.location}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs font-bold uppercase">نُشر في</span>
                  <span className="font-black dark:text-white flex items-center gap-1"><Clock size={14} className="text-blue-600"/> {item.createdAt}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs font-bold uppercase">الحالة</span>
                  <span className="text-green-500 font-black">ممتازة</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Price & Seller Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl sticky top-32">
              <div className="mb-8">
                <span className="text-gray-400 font-black text-sm uppercase">السعر المطلوب</span>
                <div className="text-5xl font-black text-blue-600 dark:text-blue-400 mt-2">
                  {item.price.toLocaleString()} <span className="text-lg">د.ك</span>
                </div>
              </div>

              {/* Seller Card */}
              <div className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-gray-800 rounded-3xl mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black">
                  {item.seller.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <h4 className="font-black dark:text-white">{item.seller.name}</h4>
                    {item.seller.verified && <ShieldCheck size={16} className="text-blue-500" />}
                  </div>
                  <p className="text-xs text-gray-400 font-bold">{item.seller.joined}</p>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 transition-all">
                  <Phone size={20} /> اتصل بالبائع
                </button>
                <Link href="/chat" className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white h-16 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-800 transition-all">
                  <MessageCircle size={20} /> دردشة فورية
                </Link>
              </div>

              <p className="text-center text-[10px] text-gray-400 font-bold mt-6">
                نوصي دائماً بالمعاينة الشخصية قبل دفع أي مبالغ.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
