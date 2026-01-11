"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit2, LogOut, Heart, ShoppingBag, MessageSquare, Star } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+965 99999999",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    bio: "عاشق التكنولوجيا والتسوق الذكي",
    location: "الكويت",
    joinDate: "2023-06-15",
  });

  const [formData, setFormData] = useState(userData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
    toast.success("تم حفظ التغييرات بنجاح");
  };

  const stats = [
    { label: "الطلبات", value: "12", icon: ShoppingBag },
    { label: "الأمنيات", value: "8", icon: Heart },
    { label: "الرسائل", value: "5", icon: MessageSquare },
    { label: "التقييمات", value: "4.8", icon: Star },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      product: "آيفون 15 برو",
      amount: 450,
      status: "تم التسليم",
      date: "2024-01-08",
    },
    {
      id: "ORD-002",
      product: "سماعات Sony",
      amount: 180,
      status: "قيد التسليم",
      date: "2024-01-09",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            الملف الشخصي
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة بيانات حسابك الشخصية
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* معلومات المستخدم */}
          <div className="lg:col-span-2">
            {/* بطاقة المعلومات */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  معلومات الحساب
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <Edit2 size={18} />
                  {isEditing ? "إلغاء" : "تعديل"}
                </button>
              </div>

              {/* الصورة الشخصية */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={userData.avatar}
                    alt={userData.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">
                    {userData.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    عضو منذ {new Date(userData.joinDate).toLocaleDateString("ar-SA")}
                  </p>
                </div>
              </div>

              {/* النموذج */}
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الموقع
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      النبذة الشخصية
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    حفظ التغييرات
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        الاسم الكامل
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {userData.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        البريد الإلكتروني
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {userData.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        رقم الهاتف
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {userData.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        الموقع
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {userData.location}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      النبذة الشخصية
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {userData.bio}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* الطلبات الأخيرة */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  الطلبات الأخيرة
                </h2>
                <Link
                  href="/orders"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  عرض الكل
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.product}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{order.amount} د.ك</p>
                      <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* الشريط الجانبي */}
          <div className="lg:col-span-1 space-y-6">
            {/* الإحصائيات */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                الإحصائيات
              </h2>
              <div className="space-y-3">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon size={18} className="text-blue-600" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {stat.label}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* الإجراءات السريعة */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                الإجراءات السريعة
              </h2>
              <div className="space-y-2">
                <Link
                  href="/orders"
                  className="block w-full p-3 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors text-center font-medium"
                >
                  عرض الطلبات
                </Link>
                <Link
                  href="/wishlist"
                  className="block w-full p-3 bg-pink-50 dark:bg-pink-900 text-pink-600 dark:text-pink-400 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-800 transition-colors text-center font-medium"
                >
                  الأمنيات
                </Link>
                <Link
                  href="/messages"
                  className="block w-full p-3 bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors text-center font-medium"
                >
                  الرسائل
                </Link>
              </div>
            </div>

            {/* تسجيل الخروج */}
            <button className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition-colors font-medium">
              <LogOut size={18} />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
