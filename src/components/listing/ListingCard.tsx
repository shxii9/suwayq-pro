"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Clock, Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  createdAt: string;
  seller: {
    name: string;
    verified: boolean;
  };
}

export function ListingCard({
  id,
  title,
  price,
  image,
  location,
  rating,
  reviews,
  createdAt,
  seller,
}: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "تم الحذف من الأمنيات" : "تم الإضافة إلى الأمنيات");
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now.getTime() - postDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "اليوم";
    if (diffDays === 1) return "أمس";
    if (diffDays < 7) return `قبل ${diffDays} أيام`;
    if (diffDays < 30) return `قبل ${Math.floor(diffDays / 7)} أسابيع`;
    return `قبل ${Math.floor(diffDays / 30)} أشهر`;
  };

  return (
    <Link href={`/listing/${id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col">
        {/* الصورة */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={image || "/placeholder.png"}
            alt={title}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
          {/* السعر */}
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-sm">
            {price.toLocaleString()} د.ك
          </div>
          {/* زر الأمنيات */}
          <button
            onClick={handleAddToWishlist}
            className="absolute top-4 left-4 p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Heart
              size={20}
              className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
            />
          </button>
        </div>

        {/* المحتوى */}
        <div className="p-4 flex-1 flex flex-col">
          {/* العنوان */}
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600">
            {title}
          </h3>

          {/* الموقع والوقت */}
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <MapPin size={14} />
            <span>{location}</span>
            <span>•</span>
            <Clock size={14} />
            <span>{timeAgo(createdAt)}</span>
          </div>

          {/* التقييم */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({reviews})
            </span>
          </div>

          {/* معلومات البائع */}
          <div className="text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
            <span className="font-medium">{seller.name}</span>
            {seller.verified && <span className="text-green-600 ml-1">✓ موثق</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
