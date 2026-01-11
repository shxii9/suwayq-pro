import { Metadata } from "next";
import { BarChart3, TrendingUp, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "التقارير - الإدارة",
  description: "عرض تقارير المنصة والإحصائيات",
};

const reports = [
  {
    id: "1",
    title: "تقرير المبيعات الشهري",
    description: "إجمالي المبيعات والإيرادات للشهر الحالي",
    date: "2024-01-09",
    value: "45,250 د.ك",
    trend: "+12%",
    icon: TrendingUp,
  },
  {
    id: "2",
    title: "نشاط المستخدمين",
    description: "عدد المستخدمين النشطين والجدد",
    date: "2024-01-09",
    value: "1,245",
    trend: "+8%",
    icon: BarChart3,
  },
  {
    id: "3",
    title: "الإعلانات المعلقة",
    description: "عدد الإعلانات التي تحتاج إلى مراجعة",
    date: "2024-01-09",
    value: "23",
    trend: "-5%",
    icon: AlertCircle,
  },
];

const recentIssues = [
  {
    id: "issue-1",
    title: "إعلان يحتوي على محتوى غير مناسب",
    user: "أحمد محمد",
    date: "2024-01-09 14:30",
    status: "قيد المراجعة",
  },
  {
    id: "issue-2",
    title: "شكوى من مشتري",
    user: "فاطمة علي",
    date: "2024-01-09 10:15",
    status: "مغلق",
  },
  {
    id: "issue-3",
    title: "محاولة احتيال",
    user: "محمد سالم",
    date: "2024-01-08 16:45",
    status: "قيد المراجعة",
  },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            التقارير والإحصائيات
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            عرض تقارير شاملة عن أداء المنصة
          </p>
        </div>

        {/* بطاقات التقارير الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <div
                key={report.id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Icon size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                    {report.trend}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {report.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {report.description}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {report.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  آخر تحديث: {report.date}
                </p>
              </div>
            );
          })}
        </div>

        {/* الرسوم البيانية */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* مبيعات شهرية */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              المبيعات الشهرية
            </h3>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">
                رسم بياني للمبيعات الشهرية
              </p>
            </div>
          </div>

          {/* نمو المستخدمين */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              نمو المستخدمين
            </h3>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">
                رسم بياني لنمو المستخدمين
              </p>
            </div>
          </div>
        </div>

        {/* المشاكل والشكاوى */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">
            المشاكل والشكاوى الأخيرة
          </h3>
          <div className="space-y-4">
            {recentIssues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {issue.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    من: {issue.user} • {issue.date}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    issue.status === "قيد المراجعة"
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                      : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  }`}
                >
                  {issue.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* إحصائيات إضافية */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl border border-blue-200 dark:border-blue-700 p-6">
            <p className="text-sm text-blue-900 dark:text-blue-200 mb-2">
              إجمالي الإعلانات
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              8,945
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
              +245 هذا الشهر
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-2xl border border-green-200 dark:border-green-700 p-6">
            <p className="text-sm text-green-900 dark:text-green-200 mb-2">
              معدل التحويل
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              3.2%
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 mt-2">
              +0.5% من الشهر الماضي
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-2xl border border-purple-200 dark:border-purple-700 p-6">
            <p className="text-sm text-purple-900 dark:text-purple-200 mb-2">
              رضا العملاء
            </p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              4.7/5
            </p>
            <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">
              بناءً على 1,245 تقييم
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-2xl border border-orange-200 dark:border-orange-700 p-6">
            <p className="text-sm text-orange-900 dark:text-orange-200 mb-2">
              وقت الاستجابة
            </p>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              2.3 ساعة
            </p>
            <p className="text-xs text-orange-700 dark:text-orange-300 mt-2">
              متوسط الاستجابة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
