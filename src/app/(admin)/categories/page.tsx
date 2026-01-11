import { Metadata } from "next";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "إدارة الفئات - الإدارة",
  description: "إدارة فئات المنتجات",
};

const categories = [
  {
    id: "1",
    name: "إلكترونيات",
    description: "أجهزة إلكترونية وملحقاتها",
    listings: 1245,
    icon: "📱",
  },
  {
    id: "2",
    name: "ملابس وأحذية",
    description: "ملابس وأحذية للرجال والنساء",
    listings: 3456,
    icon: "👕",
  },
  {
    id: "3",
    name: "أثاث",
    description: "أثاث منزلي وديكور",
    listings: 892,
    icon: "🪑",
  },
  {
    id: "4",
    name: "سيارات",
    description: "سيارات وملحقاتها",
    listings: 567,
    icon: "🚗",
  },
  {
    id: "5",
    name: "عقارات",
    description: "عقارات وأراضي",
    listings: 234,
    icon: "🏠",
  },
  {
    id: "6",
    name: "خدمات",
    description: "خدمات متنوعة",
    listings: 678,
    icon: "🔧",
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* رأس الصفحة */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              إدارة الفئات
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              أضف أو عدّل أو احذف فئات المنتجات
            </p>
          </div>
          <Link
            href="/admin/categories/create"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            إضافة فئة جديدة
          </Link>
        </div>

        {/* شبكة الفئات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              {/* الأيقونة والعنوان */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/categories/${category.id}/edit`}
                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg text-blue-600 transition-colors"
                  >
                    <Edit2 size={18} />
                  </Link>
                  <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* الوصف */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {category.description}
              </p>

              {/* الإحصائيات */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  عدد الإعلانات:{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {category.listings}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* إحصائيات عامة */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900 rounded-2xl border border-blue-200 dark:border-blue-800 p-6">
            <p className="text-sm text-blue-900 dark:text-blue-200 mb-1">
              إجمالي الفئات
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {categories.length}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 rounded-2xl border border-green-200 dark:border-green-800 p-6">
            <p className="text-sm text-green-900 dark:text-green-200 mb-1">
              إجمالي الإعلانات
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {categories.reduce((sum, cat) => sum + cat.listings, 0)}
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900 rounded-2xl border border-purple-200 dark:border-purple-800 p-6">
            <p className="text-sm text-purple-900 dark:text-purple-200 mb-1">
              متوسط الإعلانات لكل فئة
            </p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {Math.round(
                categories.reduce((sum, cat) => sum + cat.listings, 0) /
                  categories.length
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
