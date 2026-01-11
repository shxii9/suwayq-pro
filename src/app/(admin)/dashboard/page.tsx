import { Metadata } from "next";
import Link from "next/link";
import { Users, Store, Package, TrendingUp, AlertCircle, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "لوحة التحكم - الإدارة",
  description: "لوحة تحكم الإدارة على منصة Suwayq Pro",
};

const adminStats = [
  {
    title: "إجمالي المستخدمين",
    value: "100,000",
    unit: "مستخدم",
    icon: Users,
    color: "from-blue-500 to-blue-600",
    change: "+12%",
  },
  {
    title: "البائعون النشطون",
    value: "10,000",
    unit: "بائع",
    icon: Store,
    color: "from-green-500 to-green-600",
    change: "+8%",
  },
  {
    title: "الإعلانات النشطة",
    value: "50,000",
    unit: "إعلان",
    icon: Package,
    color: "from-purple-500 to-purple-600",
    change: "+15%",
  },
  {
    title: "الإيرادات الشهرية",
    value: "250,000",
    unit: "د.ك",
    icon: TrendingUp,
    color: "from-yellow-500 to-yellow-600",
    change: "+20%",
  },
];

const recentUsers = [
  { id: 1, name: "أحمد محمد", email: "ahmed@example.com", type: "مشتري", date: "2024-01-09" },
  { id: 2, name: "فاطمة علي", email: "fatima@example.com", type: "بائع", date: "2024-01-08" },
  { id: 3, name: "محمود حسن", email: "mahmoud@example.com", type: "مشتري", date: "2024-01-07" },
];

const reports = [
  { id: 1, type: "إعلان غير لائق", count: 5, status: "قيد المراجعة" },
  { id: 2, type: "احتيال", count: 2, status: "تم التحقيق" },
  { id: 3, type: "سلوك غير لائق", count: 8, status: "قيد المراجعة" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            لوحة تحكم الإدارة
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            مراقبة وإدارة منصة Suwayq Pro
          </p>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => {
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
                  <div className="text-right">
                    <Icon size={32} className="text-white text-opacity-50" />
                    <p className="text-xs text-green-200 mt-2">{stat.change}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* المستخدمون الجدد */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  المستخدمون الجدد
                </h2>
                <Link
                  href="/admin/users"
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
                        الاسم
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        البريد
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        النوع
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        التاريخ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                          {user.name}
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {user.email}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              user.type === "بائع"
                                ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            }`}
                          >
                            {user.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {user.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* التقارير */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <AlertCircle size={24} className="text-red-600" />
                  التقارير المعلقة
                </h2>
                <Link
                  href="/admin/reports"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  عرض الكل
                </Link>
              </div>

              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {report.type}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {report.count} تقرير
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        report.status === "تم التحقيق"
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* الإجراءات السريعة */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                الإجراءات السريعة
              </h2>

              <div className="space-y-3">
                <Link
                  href="/admin/users"
                  className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                >
                  <Users size={20} className="text-blue-600" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    إدارة المستخدمين
                  </span>
                </Link>

                <Link
                  href="/admin/sellers"
                  className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
                >
                  <Store size={20} className="text-green-600" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    إدارة البائعين
                  </span>
                </Link>

                <Link
                  href="/admin/listings"
                  className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors"
                >
                  <Package size={20} className="text-purple-600" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    إدارة الإعلانات
                  </span>
                </Link>

                <Link
                  href="/admin/categories"
                  className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors"
                >
                  <TrendingUp size={20} className="text-yellow-600" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    إدارة الفئات
                  </span>
                </Link>

                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Settings size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    الإعدادات
                  </span>
                </Link>
              </div>
            </div>

            {/* معلومات النظام */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                معلومات النظام
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">الإصدار</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    1.1.0
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">الحالة</span>
                  <span className="text-green-600 font-medium">✓ نشط</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">الخادم</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    متوازن
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">الأمان</span>
                  <span className="text-green-600 font-medium">✓ آمن</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
