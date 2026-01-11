"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateListingPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    condition: "",
    location: "",
    images: [] as string[],
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const newFiles = Array.from(files);
      if (uploadedImages.length + newFiles.length > 10) {
        toast.error("يمكنك تحميل 10 صور كحد أقصى");
        return;
      }
      setUploadedImages([...uploadedImages, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    if (uploadedImages.length === 0) {
      toast.error("يرجى تحميل صورة واحدة على الأقل");
      return;
    }
    toast.success("تم إنشاء الإعلان بنجاح!");
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <Link
            href="/seller/listings"
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block"
          >
            ← العودة إلى الإعلانات
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            إنشاء إعلان جديد
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            أضف إعلانك الجديد على منصة Suwayq Pro
          </p>
        </div>

        {/* النموذج */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* العنوان */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              عنوان الإعلان *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="مثال: آيفون 15 برو ماكس - جديد"
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {formData.title.length}/100
            </p>
          </div>

          {/* الوصف */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              الوصف *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="اكتب وصفاً مفصلاً للمنتج..."
              rows={6}
              maxLength={2000}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {formData.description.length}/2000
            </p>
          </div>

          {/* الفئة والسعر */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                الفئة *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر فئة</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                السعر (د.ك) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* الحالة والموقع */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                الحالة *
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر الحالة</option>
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                الموقع *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر الموقع</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* الصور */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
              الصور (حد أقصى 10 صور) *
            </label>

            {/* منطقة التحميل */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center mb-6 hover:border-blue-500 transition-colors cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload size={32} className="text-gray-400" />
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  انقر لتحميل الصور أو اسحبها هنا
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF حتى 10MB
                </p>
              </label>
            </div>

            {/* الصور المحملة */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((file, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* أزرار الإجراء */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              نشر الإعلان
            </button>
            <Link
              href="/seller/listings"
              className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center"
            >
              إلغاء
            </Link>
          </div>

          {/* نصائح */}
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 <span className="font-medium">نصيحة:</span> استخدم عنوان واضح ووصف مفصل وصور عالية الجودة لزيادة فرص البيع
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
