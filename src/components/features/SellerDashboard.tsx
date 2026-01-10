'use client';

import { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Star, 
  DollarSign,
  Clock,
  Users
} from 'lucide-react';

interface SellerStats {
  totalSales: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  completedOrders: number;
  cancelledOrders: number;
  responseTime: number | null;
  activeProducts: number;
  pendingOrders: number;
  monthlyRevenue: number;
  recentReviews: Array<{
    id: string;
    rating: number;
    comment: string;
    buyer: {
      name: string;
      image: string;
    };
    createdAt: string;
  }>;
}

export default function SellerDashboard() {
  const [stats, setStats] = useState<SellerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/seller/stats');
      
      if (!response.ok) {
        throw new Error('فشل في جلب الإحصائيات');
      }

      const data = await response.json();
      setStats(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">
          {error || 'فشل في تحميل الإحصائيات'}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'إجمالي المبيعات',
      value: stats.totalSales,
      icon: ShoppingCart,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'الإيرادات الكلية',
      value: `${stats.totalRevenue.toLocaleString('ar-SA')} ر.س`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'التقييم المتوسط',
      value: stats.averageRating.toFixed(1),
      icon: Star,
      color: 'bg-yellow-500',
      change: stats.totalReviews > 0 ? `${stats.totalReviews} تقييم` : 'لا توجد تقييمات'
    },
    {
      title: 'المنتجات النشطة',
      value: stats.activeProducts,
      icon: Package,
      color: 'bg-purple-500',
      change: 'نشط'
    },
    {
      title: 'الطلبات المعلقة',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'bg-orange-500',
      change: 'بانتظار المعالجة'
    },
    {
      title: 'إيرادات هذا الشهر',
      value: `${stats.monthlyRevenue.toLocaleString('ar-SA')} ر.س`,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      change: '+15%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            لوحة تحكم البائع
          </h1>
          <p className="text-gray-600">
            مرحباً بك في لوحة التحكم الخاصة بك. تابع أداء متجرك وإحصائياتك.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-medium">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Orders Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              أداء الطلبات
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">الطلبات المكتملة</span>
                <span className="font-bold text-green-600">
                  {stats.completedOrders}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${
                      (stats.completedOrders /
                        (stats.completedOrders + stats.cancelledOrders)) *
                      100
                    }%`
                  }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">الطلبات الملغاة</span>
                <span className="font-bold text-red-600">
                  {stats.cancelledOrders}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{
                    width: `${
                      (stats.cancelledOrders /
                        (stats.completedOrders + stats.cancelledOrders)) *
                      100
                    }%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              آخر التقييمات
            </h2>
            <div className="space-y-4">
              {stats.recentReviews.length > 0 ? (
                stats.recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 pb-4 last:border-0"
                  >
                    <div className="flex items-center mb-2">
                      <img
                        src={review.buyer.image || '/default-avatar.png'}
                        alt={review.buyer.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {review.buyer.name}
                        </p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  لا توجد تقييمات بعد
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Response Time */}
        {stats.responseTime && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              وقت الاستجابة
            </h2>
            <p className="text-3xl font-bold text-blue-600">
              {stats.responseTime} دقيقة
            </p>
            <p className="text-gray-600 mt-2">
              متوسط وقت الرد على استفسارات العملاء
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
