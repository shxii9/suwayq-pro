"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  seller: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      title: "آيفون 15 برو ماكس",
      price: 450,
      image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=200&h=200&fit=crop",
      quantity: 1,
      seller: "متجر الإلكترونيات",
    },
    {
      id: "2",
      title: "سماعات Sony WH-1000XM5",
      price: 180,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      quantity: 2,
      seller: "متجر الصوتيات",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("تم حذف المنتج من السلة");
  };

  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(0.1);
      toast.success("تم تطبيق الكود بنجاح - خصم 10%");
    } else if (promoCode === "SAVE20") {
      setDiscount(0.2);
      toast.success("تم تطبيق الكود بنجاح - خصم 20%");
    } else {
      toast.error("الكود غير صحيح");
    }
    setPromoCode("");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* رأس الصفحة */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          سلة التسوق
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              السلة فارغة
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              لم تضف أي منتجات إلى السلة حتى الآن
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              تصفح الإعلانات
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* عناصر السلة */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex gap-6"
                >
                  {/* الصورة */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* المعلومات */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      من: {item.seller}
                    </p>
                    <p className="font-bold text-blue-600 text-lg">
                      {item.price} د.ك
                    </p>
                  </div>

                  {/* الكمية والحذف */}
                  <div className="flex flex-col items-end gap-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg text-red-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>

                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 border-l border-r border-gray-300 dark:border-gray-700 min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ملخص الطلب */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  ملخص الطلب
                </h2>

                {/* رمز الخصم */}
                <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    رمز الخصم
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="أدخل الرمز"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      تطبيق
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    جرب: SAVE10 أو SAVE20
                  </p>
                </div>

                {/* الحسابات */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>المجموع الفرعي</span>
                    <span>{subtotal.toFixed(2)} د.ك</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>الخصم</span>
                      <span>-{discountAmount.toFixed(2)} د.ك</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>الشحن</span>
                    <span>{shipping.toFixed(2)} د.ك</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>الإجمالي</span>
                    <span>{total.toFixed(2)} د.ك</span>
                  </div>
                </div>

                {/* أزرار الإجراء */}
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    className="block w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors text-center"
                  >
                    المتابعة للدفع
                  </Link>
                  <Link
                    href="/listings"
                    className="block w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-center"
                  >
                    متابعة التسوق
                  </Link>
                </div>

                {/* معلومات إضافية */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 space-y-2">
                  <p>✓ شحن آمن وسريع</p>
                  <p>✓ ضمان استرجاع المال</p>
                  <p>✓ دعم عملاء 24/7</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
