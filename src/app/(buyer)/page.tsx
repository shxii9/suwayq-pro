import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ListingCard } from "@/components/listing/ListingCard";
import { ArrowRight, Star, Zap, Shield, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Suwayq Pro - منصة تجارة إلكترونية",
  description: "اشتري وبع بأمان على منصة Suwayq Pro الموثوقة",
};

const featuredListings = [
  {
    id: "1",
    title: "آيفون 15 برو ماكس - جديد",
    price: 450,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop",
    location: "الكويت",
    rating: 4.8,
    reviews: 125,
    createdAt: new Date().toISOString(),
    seller: { name: "متجر الإلكترونيات", verified: true },
  },
  {
    id: "2",
    title: "لابتوب Dell XPS 13",
    price: 350,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop",
    location: "حولي",
    rating: 4.5,
    reviews: 89,
    createdAt: new Date().toISOString(),
    seller: { name: "أحمد محمد", verified: false },
  },
  {
    id: "3",
    title: "كاميرا Canon EOS R6",
    price: 2500,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop",
    location: "الفروانية",
    rating: 4.9,
    reviews: 234,
    createdAt: new Date().toISOString(),
    seller: { name: "محترف التصوير", verified: true },
  },
  {
    id: "4",
    title: "ساعة ذكية Apple Watch",
    price: 280,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    location: "الجهراء",
    rating: 4.6,
    reviews: 156,
    createdAt: new Date().toISOString(),
    seller: { name: "متجر الساعات", verified: true },
  },
];

const categories = [
  { name: "إلكترونيات", icon: "📱", color: "from-blue-500 to-blue-600" },
  { name: "ملابس وأحذية", icon: "👕", color: "from-pink-500 to-pink-600" },
  { name: "أثاث", icon: "🛋️", color: "from-orange-500 to-orange-600" },
  { name: "سيارات", icon: "🚗", color: "from-red-500 to-red-600" },
  { name: "عقارات", icon: "🏠", color: "from-green-500 to-green-600" },
  { name: "خدمات", icon: "🔧", color: "from-purple-500 to-purple-600" },
];

const features = [
  {
    icon: Shield,
    title: "آمن وموثوق",
    description: "نظام حماية متقدم لحماية بيانات المستخدمين",
  },
  {
    icon: Truck,
    title: "شحن سريع",
    description: "توصيل سريع وآمن إلى جميع أنحاء الكويت",
  },
  {
    icon: Star,
    title: "تقييمات حقيقية",
    description: "تقييمات من مستخدمين حقيقيين للبائعين",
  },
  {
    icon: Zap,
    title: "سهل الاستخدام",
    description: "واجهة بسيطة وسهلة للبحث والشراء",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-black mb-6 leading-tight">
              اشتري وبع بأمان وسهولة
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              منصة تجارة إلكترونية موثوقة تربط البائعين والمشترين في السوق الكويتي
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/listings"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                تصفح الإعلانات
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/register?type=seller"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
              >
                ابدأ البيع الآن
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* الفئات */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            تصفح حسب الفئة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/listings?category=${cat.name}`}
                className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 text-white text-center hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer`}
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <p className="font-bold">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* الإعلانات المميزة */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              الإعلانات المميزة
            </h2>
            <Link
              href="/listings"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              عرض الكل
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        </div>
      </section>

      {/* المميزات */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            لماذا Suwayq Pro؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-blue-600 dark:text-blue-400" size={32} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* الإحصائيات */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-blue-100">إعلان نشط</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <p className="text-blue-100">مستخدم مسجل</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <p className="text-blue-100">بائع موثق</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <p className="text-blue-100">رضا المستخدمين</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA نهائي */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            جاهز للبدء؟
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف المستخدمين الذين يثقون بـ Suwayq Pro للتسوق والبيع
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              إنشاء حساب
            </Link>
            <Link
              href="/listings"
              className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              تصفح الإعلانات
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
