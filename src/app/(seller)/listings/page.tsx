import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, Eye, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "إدارة الإعلانات - البائع",
  description: "إدارة إعلاناتك على منصة Suwayq Pro",
};

const sellerListings = [
  {
    id: "1",
    title: "آيفون 15 برو ماكس",
    price: 450,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=200&h=200&fit=crop",
    status: "نشط",
    views: 450,
    messages: 12,
    sales: 5,
    createdAt: "2024-01-05",
  },
  {
    id: "2",
    title: "سماعات Sony WH-1000XM5",
    price: 180,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    status: "نشط",
    views: 320,
    messages: 8,
    sales: 3,
    createdAt: "2024-01-03",
  },
  {
    id: "3",
    title: "كاميرا Canon EOS R6",
    price: 2500,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=200&h=200&fit=crop",
    status: "نشط",
    views: 280,
    messages: 5,
    sales: 2,
    createdAt: "2024-01-01",
  },
  {
    id: "4",
    title: "ساعة ذكية Apple Watch",
    price: 280,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    status: "مباع",
    views: 150,
    messages: 3,
    sales: 1,
    createdAt: "2023-12-28",
  },
];

export default function SellerListingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* رأس الصفحة */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              إدارة الإعلانات
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              أضف أو عدّل أو احذف إعلاناتك
            </p>
          </div>
          <Link
            href="/seller/listings/create"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            إضافة إعلان جديد
          </Link>
        </div>

        {/* شريط الفلترة */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="ابحث عن إعلان..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>جميع الحالات</option>
              <option>نشط</option>
              <option>مباع</option>
              <option>معلق</option>
            </select>
          </div>
        </div>

        {/* جدول الإعلانات */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    الإعلان
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    السعر
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    الحالة
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    الإحصائيات
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {sellerListings.map((listing) => (
                  <tr
                    key={listing.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {/* الإعلان */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={listing.image}
                            alt={listing.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white line-clamp-2">
                            {listing.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {listing.createdAt}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* السعر */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-blue-600">
                        {listing.price} د.ك
                      </p>
                    </td>

                    {/* الحالة */}
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          listing.status === "نشط"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : listing.status === "مباع"
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        {listing.status}
                      </span>
                    </td>

                    {/* الإحصائيات */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Eye size={16} className="text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {listing.views}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare size={16} className="text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {listing.messages}
                          </span>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300">
                          🛒 {listing.sales}
                        </div>
                      </div>
                    </td>

                    {/* الإجراءات */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/seller/listings/${listing.id}/edit`}
                          className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg text-blue-600 transition-colors"
                          title="تعديل"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg text-red-600 transition-colors"
                          title="حذف"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900 rounded-2xl border border-blue-200 dark:border-blue-800 p-6">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">
              نصيحة: تحسين الإعلانات
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              أضف صور عالية الجودة ووصف مفصل لزيادة المشاهدات والمبيعات
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 rounded-2xl border border-green-200 dark:border-green-800 p-6">
            <h3 className="font-bold text-green-900 dark:text-green-200 mb-2">
              إجمالي الإعلانات
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {sellerListings.length}
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900 rounded-2xl border border-purple-200 dark:border-purple-800 p-6">
            <h3 className="font-bold text-purple-900 dark:text-purple-200 mb-2">
              الإعلانات النشطة
            </h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {sellerListings.filter((l) => l.status === "نشط").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
