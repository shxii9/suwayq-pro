"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
  seller: string;
  rating: number;
  reviews: number;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      title: "آيفون 15 برو ماكس",
      price: 450,
      image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=200&h=200&fit=crop",
      seller: "متجر الإلكترونيات",
      rating: 4.8,
      reviews: 125,
    },
    {
      id: "2",
      title: "سماعات Sony WH-1000XM5",
      price: 180,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      seller: "متجر الصوتيات",
      rating: 4.7,
      reviews: 198,
    },
    {
      id: "3",
      title: "كاميرا Canon EOS R6",
      price: 2500,
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=200&h=200&fit=crop",
      seller: "محترف التصوير",
      rating: 4.9,
      reviews: 234,
    },
  ]);

  const removeItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    toast.success("تم حذف المنتج من الأمنيات");
  };

  const addToCart = (item: WishlistItem) => {
    toast.success(`تم إضافة ${item.title} إلى السلة`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            الأمنيات
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            المنتجات التي أضفتها إلى قائمة أمنياتك
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              قائمة الأمنيات فارغة
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              لم تضف أي منتجات إلى قائمة أمنياتك حتى الآن
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              تصفح الإعلانات
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* الإحصائيات */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    عدد المنتجات
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {wishlistItems.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    إجمالي القيمة
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {wishlistItems.reduce((sum, item) => sum + item.price, 0)} د.ك
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    متوسط التقييم
                  </p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {(
                      wishlistItems.reduce((sum, item) => sum + item.rating, 0) /
                      wishlistItems.length
                    ).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* قائمة المنتجات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* الصورة */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
                    >
                      <Heart
                        size={20}
                        className="fill-red-500 text-red-500"
                      />
                    </button>
                  </div>

                  {/* المحتوى */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.floor(item.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({item.reviews})
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                      {item.seller}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="font-bold text-blue-600 text-lg">
                        {item.price} د.ك
                      </p>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>

                  {/* رابط الإعلان */}
                  <Link
                    href={`/listing/${item.id}`}
                    className="block w-full px-4 py-2 text-center border-t border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    عرض التفاصيل
                  </Link>
                </div>
              ))}
            </div>

            {/* أزرار الإجراء */}
            <div className="flex gap-4">
              <Link
                href="/listings"
                className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-center"
              >
                متابعة التسوق
              </Link>
              <button
                onClick={() => {
                  setWishlistItems([]);
                  toast.success("تم حذف جميع المنتجات");
                }}
                className="flex-1 border-2 border-red-600 text-red-600 py-3 rounded-lg font-bold hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
              >
                حذف الكل
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
