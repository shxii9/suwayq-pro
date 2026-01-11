import { Metadata } from "next";
import Link from "next/link";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "الطلبات - Suwayq Pro",
  description: "عرض وتتبع طلباتك",
};

const orders = [
  {
    id: "ORD-001",
    date: "2024-01-09",
    total: 455,
    status: "قيد التسليم",
    items: [
      {
        id: "1",
        title: "آيفون 15 برو ماكس",
        price: 450,
        quantity: 1,
      },
    ],
    tracking: "KW123456789",
    estimatedDelivery: "2024-01-12",
  },
  {
    id: "ORD-002",
    date: "2024-01-08",
    total: 365,
    status: "تم التسليم",
    items: [
      {
        id: "2",
        title: "سماعات Sony WH-1000XM5",
        price: 180,
        quantity: 2,
      },
    ],
    tracking: "KW987654321",
    estimatedDelivery: "2024-01-08",
  },
  {
    id: "ORD-003",
    date: "2024-01-07",
    total: 2505,
    status: "تم التسليم",
    items: [
      {
        id: "3",
        title: "كاميرا Canon EOS R6",
        price: 2500,
        quantity: 1,
      },
    ],
    tracking: "KW555555555",
    estimatedDelivery: "2024-01-07",
  },
];

const statusConfig = {
  "قيد المعالجة": {
    icon: Clock,
    color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  },
  "قيد التسليم": {
    icon: Truck,
    color: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
  },
  "تم التسليم": {
    icon: CheckCircle,
    color: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  },
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            الطلبات
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            عرض وتتبع جميع طلباتك
          </p>
        </div>

        {/* الطلبات */}
        <div className="space-y-6">
          {orders.map((order) => {
            const config = statusConfig[order.status as keyof typeof statusConfig];
            const Icon = config?.icon || Package;

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* رأس الطلب */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="font-bold text-lg text-gray-900 dark:text-white">
                      {order.id}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(order.date).toLocaleDateString("ar-SA")}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-blue-600 text-lg">
                      {order.total} د.ك
                    </p>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config?.color}`}>
                      <Icon size={16} />
                      {order.status}
                    </div>
                  </div>
                </div>

                {/* المنتجات */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                    المنتجات
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            الكمية: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {item.price * item.quantity} د.ك
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* معلومات التسليم */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                    معلومات التسليم
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        رقم التتبع
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.tracking}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        التسليم المتوقع
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(order.estimatedDelivery).toLocaleDateString("ar-SA")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* أزرار الإجراء */}
                <div className="p-6 flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                    تتبع الطلب
                  </button>
                  <Link
                    href={`/listing/${order.items[0].id}`}
                    className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-2 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center"
                  >
                    عرض المنتج
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* رسالة إذا لم تكن هناك طلبات */}
        {orders.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              لا توجد طلبات
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              لم تقم بأي طلبات حتى الآن
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              ابدأ التسوق الآن
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
