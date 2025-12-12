'use client';

import { Navbar } from '@/components/Navbar';
import { listings } from '@/lib/data';
import { MapPin, Calendar, User, Phone, Share2, Heart, Flag } from 'lucide-react';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = listings.find((l) => l.id === params.id);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800">الإعلان غير موجود</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-6">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Title and Price */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {listing.title}
                  </h1>
                  <p className="text-3xl font-black text-blue-600">
                    {listing.price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full transition ${
                      isFavorite
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition">
                    <Share2 size={24} />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-blue-600" />
                  <span>{listing.location || 'غير محدد'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-blue-600" />
                  <span>{listing.date}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">التفاصيل</h2>
              <p className="text-gray-600 leading-relaxed">
                {listing.description ||
                  'لا توجد تفاصيل إضافية متاحة لهذا الإعلان. يرجى التواصل مع البائع للمزيد من المعلومات.'}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Seller Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">معلومات البائع</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  ب
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">بائع موثوق</h3>
                  <p className="text-sm text-gray-500">عضو منذ 2 سنة</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                  <Phone size={20} /> اتصل الآن
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition">
                  أرسل رسالة
                </button>
              </div>
            </div>

            {/* Report */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <button className="w-full text-red-600 hover:text-red-700 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 border border-red-200 hover:border-red-300">
                <Flag size={20} /> الإبلاغ عن الإعلان
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
