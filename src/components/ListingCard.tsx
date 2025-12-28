"use client";

import Link from "next/link";
import Image from "next/image";

type ListingCardProps = {
  item: {
    id: string;
    title: string;
    price: number;
    description?: string;
    category?: string;
    image?: string;
  };
};

export function ListingCard({ item }: ListingCardProps) {
  // صورة افتراضية حسب الفئة لجعل الموقع يبدو ممتلئاً واحترافياً
  const defaultImages: Record<string, string> = {
    CARS: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80",
    REAL_ESTATE: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
    ELECTRONICS: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
    DEFAULT: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=400&q=80"
  };

  const displayImage = item.image || defaultImages[item.category || "DEFAULT"];

  return (
    <Link href={`/listing/${item.id}`} className="block group">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
        <div className="relative h-48 w-full">
          <Image
            src={displayImage}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-blue-600 shadow-sm">
            {item.category === 'CARS' ? 'سيارة' : item.category === 'REAL_ESTATE' ? 'عقار' : 'إعلان'}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-gray-800 text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2 h-10">
            {item.description || "لا يوجد وصف متاح حالياً لهذا الإعلان."}
          </p>
          
          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <span className="text-xl font-black text-orange-500">
              {item.price.toLocaleString()} <span className="text-xs font-normal text-gray-400">د.ك</span>
            </span>
            <span className="text-blue-600 text-xs font-bold">تفاصيل أكثر ←</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
