import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "purple" | "orange" | "red" | "yellow";
}

const colorStyles = {
  blue: "bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400",
  green: "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400",
  purple: "bg-purple-50 dark:bg-purple-900 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400",
  orange: "bg-orange-50 dark:bg-orange-900 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400",
  red: "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400",
  yellow: "bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400",
};

export default function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  color = "blue",
}: StatCardProps) {
  const colorClass = colorStyles[color];

  return (
    <div className={`${colorClass} rounded-2xl border p-6`}>
      {/* رأس البطاقة */}
      <div className="flex items-start justify-between mb-4">
        {icon && <div className="text-3xl">{icon}</div>}
        {trend && (
          <span
            className={`text-sm font-bold ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>

      {/* العنوان */}
      <p className="text-sm opacity-75 mb-1">{title}</p>

      {/* القيمة */}
      <p className="text-3xl font-bold mb-2">{value}</p>

      {/* الوصف */}
      {description && (
        <p className="text-xs opacity-60">{description}</p>
      )}
    </div>
  );
}
