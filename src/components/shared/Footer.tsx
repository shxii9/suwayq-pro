"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        {/* القسم الرئيسي */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* عن الشركة */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">عن Suwayq Pro</h3>
            <p className="text-sm leading-relaxed mb-4">
              منصة تجارة إلكترونية موثوقة تربط البائعين والمشترين في السوق الكويتي بأمان وسهولة.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* الروابط السريعة */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/listings" className="hover:text-blue-400 transition-colors">
                  الإعلانات
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-blue-400 transition-colors">
                  الفئات
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                  المدونة
                </Link>
              </li>
            </ul>
          </div>

          {/* خدمة العملاء */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">خدمة العملاء</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-blue-400 transition-colors">
                  مركز المساعدة
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-400 transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-blue-400 transition-colors">
                  سياسة الشحن
                </Link>
              </li>
            </ul>
          </div>

          {/* معلومات التواصل */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">تواصل معنا</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+965 1234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:support@suwayq.com" className="hover:text-blue-400 transition-colors">
                  support@suwayq.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>الكويت - منطقة الشرق</span>
              </div>
            </div>
          </div>
        </div>

        {/* الفاصل */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* القسم السفلي */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {currentYear} Suwayq Pro. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-blue-400 transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">
              شروط الاستخدام
            </Link>
            <Link href="/security" className="hover:text-blue-400 transition-colors">
              الأمان
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
