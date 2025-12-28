export const dynamic = 'force-dynamic';
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);
      try {
        // نرسل الفئة المحددة إلى الـ API الجديد الذي أنشأناه
        const url = category ? `/api/listings?category=${category}` : '/api/listings';
        const res = await fetch(url);
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error("Error fetching filtered listings");
      } finally {
        setLoading(false);
      }
    }
    fetchFiltered();
  }, [category]);

  const categoryNames: Record<string, string> = {
    CARS: "سيارات",
    REAL_ESTATE: "عقارات",
    ELECTRONICS: "إلكترونيات",
    HOME: "أثاث وأدوات منزلية"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {category ? `نتائج البحث في قسم: ${categoryNames[category] || category}` : "كل الإعلانات"}
      </h1>

      {loading ? (
        <div className="text-center py-20">جاري جلب النتائج...</div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((item: any) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed text-gray-400">
          لا توجد إعلانات حالياً في هذا القسم.
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />
      <Suspense fallback={<div className="text-center p-20">جاري التحميل...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}

