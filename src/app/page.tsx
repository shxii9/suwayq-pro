"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ListingSkeleton } from "@/components/Skeleton";
import { MapPin, Search, Mic, MicOff, LayoutGrid, Car, Home as HomeIcon, Smartphone, Sofa } from "lucide-react";
import toast from "react-hot-toast";

const categories = [
  { label: "الكل", icon: LayoutGrid, value: "" },
  { label: "سيارات", icon: Car, value: "سيارة" },
  { label: "عقارات", icon: HomeIcon, value: "عقار" },
  { label: "أجهزة", icon: Smartphone, value: "جهاز" },
  { label: "أثاث", icon: Sofa, value: "أثاث" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("متصفحك لا يدعم البحث الصوتي");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "ar-SA";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };
    recognition.start();
  };

  const listings = [
    { id: "1", title: "آيفون 15 برو ماكس", price: 320, location: "الكويت العاصمة", category: "جهاز", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=500" },
    { id: "2", title: "تويوتا لاندكروزر 2024", price: 25000, location: "الجهراء", category: "سيارة", image: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=500" },
  ];

  const filteredListings = listings.filter(l => 
    l.title.includes(searchQuery) && (selectedCategory === "" || l.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="mb-12 overflow-hidden rounded-[3rem] bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-12 text-white relative text-right">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">بع أغراضك بلمحة بصر</h2>
            <Link href="/listings/create" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl transition-all inline-block">ابدأ البيع الآن</Link>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mb-12 relative group">
          <input 
            type="text" 
            placeholder="عن ماذا تبحث اليوم؟" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-16 px-14 rounded-3xl bg-white dark:bg-gray-900 border-none shadow-2xl shadow-blue-100/50 dark:shadow-none text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all text-right"
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <button onClick={handleVoiceSearch} className={`absolute left-5 top-1/2 -translate-y-1/2 p-2 rounded-full ${isListening ? "bg-red-500 text-white animate-bounce" : "text-gray-400"}`}>
            {isListening ? <MicOff size={22} /> : <Mic size={22} />}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredListings.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="relative aspect-square">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute top-4 right-4"><FavoriteButton listingId={item.id} /></div>
              </div>
              <div className="p-6 text-right">
                <h3 className="font-black text-xl mb-2 dark:text-white">{item.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-4"><MapPin size={14} className="ml-1" />{item.location}</div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{item.price} د.ك</span>
                  <Link href={`/listing/${item.id}`} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-sm font-bold">التفاصيل</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
