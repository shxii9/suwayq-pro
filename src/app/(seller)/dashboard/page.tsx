import { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, ShoppingBag, Star, Eye, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "لوحة التحكم - البائع",
  description: "لوحة تحكم البائع على منصة Suwayq Pro",
};

const stats = [
  {
    title: "الإيرادات الشهرية",
    value: "2,500",
    unit: "د.ك",
    icon: TrendingUp,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "الطلبات الجديدة",
    value: "24",
    unit: "طلب",
    icon: ShoppingBag,
    color: "from-green-500 to-green-600",
  },
  {
    title: "متوسط التقييم",
    value: "4.8",
    unit: "من 5",
    icon: Star,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    title: "مشاهدات الإعلانات",
    value: "1,250",
    unit: "مشاهدة",
    icon: Eye,
    color: "from-purple-500 to-purple-600",
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "أحمد محمد",
    product: "آيفون 15 برو",
    amount: 450,
    status: "قيد التسليم",
    date: "2024-01-09",
  },
  {
    id: "ORD-002",
    customer: "فاطمة علي",
    product: "سماعات Sony",
    amount: 180,
    status: "تم التسليم",
    date: "2024-01-08",
  },
  {
    id: "ORD-003",
    customer: "محمود حسن",
    product: "كاميرا Canon",
    amount: 2500,
    status: "قيد المعالجة",
    date: "2024-01-07",
  },
];

const topListings = [
  {
    id: "1",
    title: "آيفون 15 برو ماكس",
    views: 450,
    sales: 12,
    rating: 4.9,
  },
  {
    id: "2",
    title: "سماعات Sony WH-1000XM5",
    views: 320,
    sales: 8,
    rating: 4.7,
  },
  {
    id: "3",
    title: "كاميرا Canon EOS R6",
    views: 280,
    sales: 5,
    rating: 4.8,
  },
];

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* رأس الصفحة */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              لوحة التحكم
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              مرحباً بك في لوحة تحكم البائع
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

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 border border-opacity-20 border-white`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white text-opacity-80 text-sm font-medium mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-white text-opacity-70 text-xs mt-1">
                      {stat.unit}
                    </p>
                  </div>
                  <Icon size={32} className="text-white text-opacity-50" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* الطلبات الأخيرة */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  الطلبات الأخيرة
                </h2>
                <Link
                  href="/seller/orders"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  عرض الكل
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        رقم الطلب
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        العميل
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        المنتج
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        المبلغ
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        الحالة
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                          {order.id}
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {order.customer}
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {order.product}
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">
                          {order.amount} د.ك
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === "تم التسليم"
                                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                : order.status === "قيد التسليم"
                                ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* أفضل الإعلانات */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  أفضل الإعلانات
                </h2>
                <Link
                  href="/seller/listings"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  عرض الكل
                </Link>
              </div>

              <div className="space-y-4">
                {topListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <p className="font-medium text-gray-900 dark:text-white mb-2">
                      {listing.title}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>👁️ {listing.views} مشاهدة</span>
                      <span>🛒 {listing.sales} مبيعة</span>
                      <span>⭐ {listing.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* روابط سريعة */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/seller/listings"
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              إدارة الإعلانات
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              أضف أو عدّل أو احذف إعلاناتك
            </p>
          </Link>
          <Link
            href="/seller/orders"
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              إدارة الطلبات
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              تتبع وإدارة جميع الطلبات
            </p>
          </Link>
          <Link
            href="/seller/analytics"
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              التحليلات
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              عرض إحصائيات مفصلة
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
