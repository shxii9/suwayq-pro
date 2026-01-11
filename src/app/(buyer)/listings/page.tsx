import { Metadata } from "next";
import { ListingCard } from "@/components/listing/ListingCard";
import { ListingFilter } from "@/components/listing/ListingFilter";
import { Pagination } from "@/components/shared/Pagination";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "الإعلانات - Suwayq Pro",
  description: "تصفح جميع الإعلانات المتاحة على منصة Suwayq Pro",
};

// بيانات تجريبية
const mockListings = [
  {
    id: "1",
    title: "آيفون 15 برو ماكس - جديد",
    price: 450,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop",
    location: "الكويت",
    rating: 4.8,
    reviews: 125,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    seller: { name: "متجر الإلكترونيات", verified: true },
  },
  {
    id: "2",
    title: "لابتوب Dell XPS 13 - مستخدم",
    price: 350,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop",
    location: "حولي",
    rating: 4.5,
    reviews: 89,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    seller: { name: "أحمد محمد", verified: false },
  },
  {
    id: "3",
    title: "كاميرا Canon EOS R6 - احترافية",
    price: 2500,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop",
    location: "الفروانية",
    rating: 4.9,
    reviews: 234,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    seller: { name: "محترف التصوير", verified: true },
  },
  {
    id: "4",
    title: "ساعة ذكية Apple Watch Series 9",
    price: 280,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    location: "الجهراء",
    rating: 4.6,
    reviews: 156,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    seller: { name: "متجر الساعات", verified: true },
  },
  {
    id: "5",
    title: "سماعات Sony WH-1000XM5",
    price: 180,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    location: "مبارك الكبير",
    rating: 4.7,
    reviews: 198,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    seller: { name: "متجر الصوتيات", verified: true },
  },
  {
    id: "6",
    title: "جهاز iPad Pro 12.9 - جديد",
    price: 650,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop",
    location: "الكويت",
    rating: 4.8,
    reviews: 167,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    seller: { name: "أبل ستور", verified: true },
  },
  {
    id: "7",
    title: "ماوس لاسلكي Logitech MX Master 3S",
    price: 85,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    location: "حولي",
    rating: 4.4,
    reviews: 112,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    seller: { name: "متجر الملحقات", verified: true },
  },
  {
    id: "8",
    title: "لوحة مفاتيح ميكانيكية Corsair K95",
    price: 220,
    image: "https://images.unsplash.com/photo-1587829191301-2c3d4d0e0b7e?w=400&h=400&fit=crop",
    location: "الفروانية",
    rating: 4.9,
    reviews: 245,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    seller: { name: "متجر الألعاب", verified: true },
  },
];

export default function ListingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            الإعلانات
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            تصفح جميع الإعلانات المتاحة على منصة Suwayq Pro
          </p>
        </div>

        {/* شريط البحث والترتيب */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث عن إعلان..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>الأحدث أولاً</option>
              <option>السعر: من الأقل إلى الأعلى</option>
              <option>السعر: من الأعلى إلى الأقل</option>
              <option>الأكثر تقييماً</option>
            </select>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* التصفية */}
          <div className="lg:col-span-1">
            <ListingFilter onFilterChange={(filters) => console.log(filters)} />
          </div>

          {/* الإعلانات */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {mockListings.map((listing) => (
                <ListingCard key={listing.id} {...listing} />
              ))}
            </div>

            {/* الترقيم */}
            <div className="flex justify-center">
              <Pagination
                currentPage={1}
                totalPages={5}
                onPageChange={(page) => console.log("Page:", page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
