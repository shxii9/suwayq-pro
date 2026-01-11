import { Metadata } from "next";
import Image from "next/image";
import { MoreVertical, Shield, Ban } from "lucide-react";

export const metadata: Metadata = {
  title: "إدارة المستخدمين - الإدارة",
  description: "إدارة مستخدمي المنصة",
};

const users = [
  {
    id: "user-1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    role: "buyer",
    status: "نشط",
    joinDate: "2023-06-15",
    orders: 12,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
  },
  {
    id: "user-2",
    name: "فاطمة علي",
    email: "fatima@example.com",
    role: "seller",
    status: "نشط",
    joinDate: "2023-08-20",
    listings: 45,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
  {
    id: "user-3",
    name: "محمد سالم",
    email: "salem@example.com",
    role: "buyer",
    status: "معلق",
    joinDate: "2024-01-05",
    orders: 0,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
  },
  {
    id: "user-4",
    name: "ليلى خالد",
    email: "layla@example.com",
    role: "seller",
    status: "نشط",
    joinDate: "2023-09-10",
    listings: 28,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },
];

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            إدارة المستخدمين
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة مستخدمي المنصة والتحكم في صلاحياتهم
          </p>
        </div>

        {/* شريط الفلترة */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="ابحث عن مستخدم..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>جميع الأدوار</option>
              <option>مشتري</option>
              <option>بائع</option>
              <option>إدارة</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>جميع الحالات</option>
              <option>نشط</option>
              <option>معلق</option>
              <option>محظور</option>
            </select>
          </div>
        </div>

        {/* جدول المستخدمين */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    المستخدم
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    الدور
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    الحالة
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    تاريخ الانضمام
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    النشاط
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {/* المستخدم */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* الدور */}
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "seller"
                            ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                            : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                        }`}
                      >
                        {user.role === "seller" ? "بائع" : "مشتري"}
                      </span>
                    </td>

                    {/* الحالة */}
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "نشط"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* تاريخ الانضمام */}
                    <td className="py-4 px-6">
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {new Date(user.joinDate).toLocaleDateString("ar-SA")}
                      </p>
                    </td>

                    {/* النشاط */}
                    <td className="py-4 px-6">
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {user.role === "seller"
                          ? `${(user as any).listings} إعلان`
                          : `${(user as any).orders} طلب`}
                      </p>
                    </td>

                    {/* الإجراءات */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg text-blue-600 transition-colors">
                          <Shield size={18} />
                        </button>
                        <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg text-red-600 transition-colors">
                          <Ban size={18} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* إحصائيات */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900 rounded-2xl border border-blue-200 dark:border-blue-800 p-6">
            <p className="text-sm text-blue-900 dark:text-blue-200 mb-1">
              إجمالي المستخدمين
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {users.length}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 rounded-2xl border border-green-200 dark:border-green-800 p-6">
            <p className="text-sm text-green-900 dark:text-green-200 mb-1">
              المشترون
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {users.filter((u) => u.role === "buyer").length}
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900 rounded-2xl border border-purple-200 dark:border-purple-800 p-6">
            <p className="text-sm text-purple-900 dark:text-purple-200 mb-1">
              البائعون
            </p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {users.filter((u) => u.role === "seller").length}
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900 rounded-2xl border border-yellow-200 dark:border-yellow-800 p-6">
            <p className="text-sm text-yellow-900 dark:text-yellow-200 mb-1">
              نشطون
            </p>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {users.filter((u) => u.status === "نشط").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
