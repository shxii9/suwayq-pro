import { Skeleton } from "@/components/Skeleton";`nimport { QRCode } from 'react-qrcode-logo';
"use client";  import { useEffect, useState } from "react"; import { Navbar } from "@/components/Navbar"; import { StarRating } from "@/components/StarRating";`nimport { CheckCircle, MessageCircle, Eye, Phone, MapPin, Calendar, ChevronRight, Share2 } from "lucide-react"; import Image from "next/image"; import Link from "next/link"; import { useParams } from "next/navigation";  export default function ListingDetail() {   const { id } = useParams();   const [listing, setListing] = useState<any>(null);   const [loading, setLoading] = useState(true);`n  const [currency, setCurrency] = useState("KWD");
  const [views, setViews] = useState(0);
  useEffect(() => {
    setViews(Math.floor(Math.random() * 500) + 120); // محاكاة لعدد مشاهدات حقيقي
  }, []);`n  const rates = { KWD: 1, SAR: 12.2, USD: 3.25 };    useEffect(() => {     fetch("/api/listings")       .then(res => res.json())       .then(data => {         const item = data.find((l: any) => l.id === id);         setListing(item);         setLoading(false);       });   }, [id]);       const handleShare = () => {     if (navigator.share) {       navigator.share({         title: listing.title,         url: window.location.href,       }).catch(() => toast.error("فشلت المشاركة"));     } else {       navigator.clipboard.writeText(window.location.href);       toast.success("تم نسخ رابط الإعلان!");     }   };    const handleWhatsApp = () => {     const message = `مرحباً، أنا مهتم بإعلانك: ${listing.title} المعروض بسعر ${listing.price} د.ك. هل لا يزال متوفراً؟`;     const whatsappUrl = `https://wa.me/96590000000?text=${encodeURIComponent(message)}`;     window.open(whatsappUrl, "_blank");   };    if (loading) return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-[3rem]" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );   if (!listing) return <div className="min-h-screen flex items-center justify-center">الإعلان غير موجود</div>;    return (     <div className="min-h-screen bg-white pb-20" dir="rtl">       <Navbar />       <div className="container mx-auto px-4 pt-24 max-w-6xl">         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">           <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">             <Image src={listing.image || "/placeholder.png"} fill className="object-cover" alt="" />           </div>           <div className="flex flex-col">

            <div className="hidden md:flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 mb-8">
              <p className="text-xs font-bold text-gray-400 mb-4">مسح سريع للإعلان</p>
              <QRCode 
                value={typeof window !== "undefined" ? window.location.href : ""} 
                size={120}
                qrStyle="dots"
                eyeRadius={10}
                fgColor={theme === "dark" ? "#60a5fa" : "#2563eb"}
              />
            </div>             <h1 className="text-4xl font-black text-gray-900 mb-6">{listing.title}</h1>                          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl mb-8 flex items-center justify-between border border-gray-100 dark:border-gray-700">               <div className="flex items-center gap-4">                 <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">                   B                 </div>                 <div>                   <div className="flex items-center gap-1">                     <span className="font-bold text-gray-900 dark:text-white">بائع موثوق</span>                     <CheckCircle size={16} className="text-blue-500 fill-blue-500 text-white" />                   </div>                   <p className="text-xs text-gray-500 dark:text-gray-400">عضو منذ 2024</p>                 </div>               </div>               <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">متصل الآن</span>             </div>             <div className="bg-blue-50 p-6 rounded-3xl mb-8">               <span className="text-blue-600 text-3xl font-black">{listing.price} د.ك</span>             </div>             <p className="text-gray-600 text-lg mb-8 leading-relaxed bg-gray-50 p-6 rounded-3xl">               {listing.description}             </p>`n            <div className="mb-8"><StarRating /></div>             <div className="grid grid-cols-2 gap-4">               <button onClick={handleShare} className="col-span-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all mb-4">                 <Share2 size={20} /> مشاركة الإعلان مع الأصدقاء               </button>               <button onClick={handleWhatsApp} className="bg-green-500 hover:bg-green-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-100 transition-transform active:scale-95">                 <MessageCircle size={24} /> واتساب               </button>               <a href="tel:96590000000" className="bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition-transform active:scale-95">                 <Phone size={24} /> اتصل الآن               </a>             </div>           </div>         </div>       </div>     </div>   ); }
