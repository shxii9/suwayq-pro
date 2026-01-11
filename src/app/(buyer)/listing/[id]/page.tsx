"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, MapPin, Clock, Star, MessageSquare, ShoppingCart, Phone, Mail } from "lucide-react";
import toast from "react-hot-toast";

interface ListingDetailPageProps {
  params: {
    id: string;
  };
}

export default function ListingDetailPage({ params }: ListingDetailPageProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // بيانات تجريبية
  const listing = {
    id: params.id,
    title: "آيفون 15 برو ماكس - جديد",
    price: 450,
    description: "هاتف ذكي جديد تماماً بحالة ممتازة مع جميع الملحقات الأصلية. لم يتم استخدامه إلا مرات قليلة.",
    images: [
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=800&fit=crop",
    ],
    condition: "جديد",
    location: "الكويت - منطقة الشرق",
    createdAt: "2024-01-09",
    category: "إلكترونيات",
    seller: {
      id: "seller-1",
      name: "متجر الإلكترونيات",
      verified: true,
      rating: 4.8,
      reviews: 125,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      responseTime: "في الساعة",
      joinDate: "2023-01-15",
    },
    specifications: {
      "الماركة": "Apple",
      "الموديل": "iPhone 15 Pro Max",
      "السعة": "256GB",
      "اللون": "أسود",
      "الحالة": "جديد",
    },
    rating: 4.8,
    reviews: 125,
  };

  const handleAddToCart = () => {
    toast.success(`تم إضافة ${quantity} عنصر إلى السلة`);
  };

  const handleAddToWishlist = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "تم الحذف من الأمنيات" : "تم الإضافة إلى الأمنيات");
  };

  const handleShare = () => {
    toast.success("تم نسخ الرابط");
  };

  const reviews = [
    {
      id: 1,
      author: "أحمد محمد",
      rating: 5,
      date: "2024-01-08",
      text: "منتج ممتاز وبائع موثوق جداً. التوصيل كان سريع جداً.",
      helpful: 12,
    },
    {
      id: 2,
      author: "فاطمة علي",
      rating: 4,
      date: "2024-01-07",
      text: "المنتج جيد جداً لكن السعر مرتفع قليلاً.",
      helpful: 8,
    },
    {
      id: 3,
      author: "محمود حسن",
      rating: 5,
      date: "2024-01-06",
      text: "أفضل من المتوقع! سأشتري منهم مرة أخرى.",
      helpful: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* شريط التنقل */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-blue-600">
            الإعلانات
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium truncate">
            {listing.title}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* الصور */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-4">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                <Image
                  src={listing.images[selectedImage]}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* معرض الصور */}
            <div className="grid grid-cols-4 gap-4">
              {listing.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`صورة ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* المعلومات والشراء */}
          <div>
            {/* السعر والعنوان */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {listing.title}
              </h1>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-blue-600">
                  {listing.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400">د.ك</span>
              </div>

              {/* التقييم */}
              <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(listing.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {listing.rating} ({listing.reviews} تقييم)
                </span>
              </div>

              {/* المعلومات الأساسية */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <MapPin size={18} className="text-gray-400" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Clock size={18} className="text-gray-400" />
                  <span>{listing.createdAt}</span>
                </div>
              </div>

              {/* الكمية والأزرار */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 dark:text-gray-300">الكمية:</span>
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 border-l border-r border-gray-300 dark:border-gray-700">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  إضافة إلى السلة
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToWishlist}
                    className={`flex-1 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 border-2 ${
                      isFavorite
                        ? "bg-red-50 dark:bg-red-900 border-red-600 text-red-600"
                        : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Heart
                      size={20}
                      className={isFavorite ? "fill-red-600" : ""}
                    />
                    أمنيات
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 py-3 rounded-lg font-bold border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 size={20} />
                    مشاركة
                  </button>
                </div>
              </div>
            </div>

            {/* معلومات البائع */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                معلومات البائع
              </h3>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <Image
                  src={listing.seller.avatar}
                  alt={listing.seller.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 dark:text-white">
                      {listing.seller.name}
                    </span>
                    {listing.seller.verified && (
                      <span className="text-green-600 text-sm">✓ موثق</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span>{listing.seller.rating}</span>
                    <span>({listing.seller.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <span className="font-medium">وقت الرد:</span> {listing.seller.responseTime}
                </div>
                <div>
                  <span className="font-medium">تاريخ الانضمام:</span> {listing.seller.joinDate}
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare size={18} />
                  إرسال رسالة
                </button>
                <button className="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                  <Phone size={18} />
                  اتصل الآن
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* المواصفات */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            المواصفات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(listing.specifications).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700"
              >
                <span className="text-gray-600 dark:text-gray-400">{key}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* الوصف */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            الوصف
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {listing.description}
          </p>
        </div>

        {/* التقييمات */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            التقييمات ({listing.reviews})
          </h2>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {review.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.date}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {review.text}
                </p>
                <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  مفيد ({review.helpful})
                </button>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
            اكتب تقييماً
          </button>
        </div>
      </div>
    </div>
  );
}
