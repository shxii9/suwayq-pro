"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StarRating } from "@/components/StarRating";
import { Skeleton } from "@/components/Skeleton";
import { QRCode } from "react-qrcode-logo";
import { CheckCircle, MessageCircle, Eye, Phone, MapPin, Calendar, Share2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ListingDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("KWD");
  const [views, setViews] = useState(0);
  const rates = { KWD: 1, SAR: 12.2, USD: 3.25 };

  const listing = {
    title: "آيفون 15 برو ماكس - 256 جيجا",
    price: 320,
    description: "الجهاز بحالة الوكالة، نظيف جداً مع كامل الملحقات والكرتون.",
    location: "الكويت العاصمة",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800"
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    setViews(Math.floor(Math.random() * 500) + 120);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 max-w-6xl"><Skeleton className="aspect-video w-full" /></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-right">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <Image src={listing.image} alt={listing.title} fill className="object-cover" />
          </div>
          <div className="flex flex-col text-right">
            <h1 className="text-4xl font-black mb-4 dark:text-white">{listing.title}</h1>
            <div className="flex items-center gap-4 text-gray-500 mb-8 font-bold justify-end">
              <span className="flex items-center gap-1"><Eye size={16} className="text-blue-500" /> {views} مشاهدة</span>
              <span className="flex items-center gap-1"><Calendar size={16} /> منذ يومين</span>
              <span className="flex items-center gap-1"><MapPin size={16} /> {listing.location}</span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl mb-8 flex justify-between items-center">
              <select className="bg-white dark:bg-gray-800 rounded-xl px-3 py-2 text-sm font-bold outline-none border-none shadow-sm" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="KWD">د.ك</option>
                <option value="SAR">ر.س</option>
                <option value="USD">$ USD</option>
              </select>
              <div>
                <span className="text-blue-600 dark:text-blue-400 text-3xl font-black">{(listing.price * rates[currency]).toLocaleString()}</span>
                <span className="mr-2 font-bold text-blue-500">{currency}</span>
              </div>
            </div>
            <StarRating />
            <div className="mt-8 space-y-4">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"><Phone size={20} /> اتصل الآن</button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"><MessageCircle size={20} /> واتساب</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
