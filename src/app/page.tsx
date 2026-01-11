"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ListingSkeleton } from "@/components/Skeleton";
import { MapPin, Search, Mic, MicOff, LayoutGrid, Car, Home as HomeIcon, Smartphone, Sofa } from "lucide-react";
import toast from "react-hot-toast";

const categories = [
  { label: "الكل", icon: LayoutGrid, value: "" },
  { label: "سيارات", icon: Car, value: "CARS" },
  { label: "عقارات", icon: HomeIcon, value: "REAL_ESTATE" },
  { label: "إلكترونيات", icon: Smartphone, value: "ELECTRONICS" },
  { label: "أثاث", icon: Sofa, value: "HOME" },
];

export default function Home() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("متصفحك لا يدعم البحث الصوتي");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "ar-SA";
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      toast.success(`تم التعرف على: ${transcript}`);
    };
    recognition.start();
  };

  useEffect(() => {
    const url = selectedCategory ? `/api/listings?category=${selectedCategory}` : "/api/listings";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("فشل تحميل الإعلانات");
        setLoading(false);
      });
  }, [selectedCategory]);

  useEffect(() => {
    const filtered = listings.filter((listing: any) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredListings(filtered);
  }, [searchQuery, listings]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16">
        {/* البطل */}
        <div className="relative mb-16 rounded-[3rem] bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-5xl font-black mb-4">اعرض منتجاتك الآن</h1>
            <p className="text-blue-100 mb-8 font-medium">انضم لآلاف المستخدمين يومياً واعرض إعلاناتك أمام ملايين المشترين في الكويت.</p>
            <Link href="/listings/create" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl transition-all inline-block active:scale-95">
              ابدأ البيع الآن
            </Link>
          </div>
          <div className="absolute left-[-10%] top-[-20%] w-[60%] h-[140%] bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* شريط البحث المطور */}
        <div className="max-w-2xl mx-auto mb-12 relative group">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={24} />
          <input 
            type="text"
            placeholder="ابحث عن سيارة، هاتف، أو أي شيء..."
            className="w-full pr-14 pl-6 py-5 rounded-[2rem] border-0 bg-white shadow-xl shadow-blue-100/20 outline-none focus:ring-4 focus:ring-blue-500/10 text-lg transition-all"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* شريط الفئات */}
        <div className="flex items-center gap-4 overflow-x-auto pb-8 no-scrollbar mb-8">
          {categories.map((cat) => (
            <button key={cat.label} onClick={() => setSelectedCategory(cat.value)} className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${selectedCategory === cat.value ? "bg-blue-600 text-white" : "bg-white text-gray-500 hover:text-blue-600"}`}>
              <cat.icon size={20} /> {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <ListingSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredListings.map((listing: any) => (
              <Link href={`/listing/${listing.id}`} key={listing.id} className="bg-white rounded-[2.2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="relative aspect-square">
                  <Image src={listing.image || "/placeholder.png"} alt="" fill className="object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-xl text-blue-600 font-black text-sm">{listing.price} د.ك</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{listing.title}</h3>
                  <div className="text-gray-400 text-xs flex items-center gap-1"><MapPin size={14}/> الكويت</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
