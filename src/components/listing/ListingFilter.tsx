"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  category: string;
  rating: number;
  condition: string;
  location: string;
}

interface ListingFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export function ListingFilter({ onFilterChange }: ListingFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 100000,
    category: "",
    rating: 0,
    condition: "",
    location: "",
  });

  const [expandedSections, setExpandedSections] = useState<string[]>([
    "price",
    "category",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      minPrice: 0,
      maxPrice: 100000,
      category: "",
      rating: 0,
      condition: "",
      location: "",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const categories = [
    "إلكترونيات",
    "ملابس وأحذية",
    "أثاث",
    "سيارات",
    "عقارات",
    "خدمات",
  ];

  const conditions = ["جديد", "مستخدم", "كسر أسعار"];

  const locations = ["الكويت", "حولي", "الفروانية", "الجهراء", "مبارك الكبير"];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 h-fit sticky top-20" dir="rtl">
      {/* رأس التصفية */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg text-gray-900 dark:text-white">
          التصفية
        </h2>
        {Object.values(filters).some((v) => v !== 0 && v !== "") && (
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <X size={16} />
            إعادة تعيين
          </button>
        )}
      </div>

      {/* السعر */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900 dark:text-white"
        >
          السعر
          <ChevronDown
            size={20}
            className={`transition-transform ${
              expandedSections.includes("price") ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.includes("price") && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
                من: {filters.minPrice.toLocaleString()} د.ك
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={filters.minPrice}
                onChange={(e) =>
                  handleFilterChange("minPrice", parseInt(e.target.value))
                }
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
                إلى: {filters.maxPrice.toLocaleString()} د.ك
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={filters.maxPrice}
                onChange={(e) =>
                  handleFilterChange("maxPrice", parseInt(e.target.value))
                }
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* الفئة */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900 dark:text-white"
        >
          الفئة
          <ChevronDown
            size={20}
            className={`transition-transform ${
              expandedSections.includes("category") ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.includes("category") && (
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={filters.category === cat}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* الحالة */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection("condition")}
          className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900 dark:text-white"
        >
          الحالة
          <ChevronDown
            size={20}
            className={`transition-transform ${
              expandedSections.includes("condition") ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.includes("condition") && (
          <div className="space-y-2">
            {conditions.map((cond) => (
              <label key={cond} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value={cond}
                  checked={filters.condition === cond}
                  onChange={(e) =>
                    handleFilterChange("condition", e.target.value)
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {cond}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* التقييم */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection("rating")}
          className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900 dark:text-white"
        >
          التقييم
          <ChevronDown
            size={20}
            className={`transition-transform ${
              expandedSections.includes("rating") ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.includes("rating") && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rate) => (
              <label key={rate} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rate}
                  checked={filters.rating === rate}
                  onChange={(e) =>
                    handleFilterChange("rating", parseInt(e.target.value))
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {rate} نجوم وأعلى
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* الموقع */}
      <div>
        <button
          onClick={() => toggleSection("location")}
          className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900 dark:text-white"
        >
          الموقع
          <ChevronDown
            size={20}
            className={`transition-transform ${
              expandedSections.includes("location") ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.includes("location") && (
          <div className="space-y-2">
            {locations.map((loc) => (
              <label key={loc} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value={loc}
                  checked={filters.location === loc}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {loc}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
