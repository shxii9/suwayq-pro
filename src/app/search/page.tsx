'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ListingCard } from '@/components/ListingCard';
import { listings, categories } from '@/lib/data';
import { Search, Filter } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'price-low') {
      return parseInt(a.price) - parseInt(b.price);
    } else if (sortBy === 'price-high') {
      return parseInt(b.price) - parseInt(a.price);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Navbar />

      {/* Search Header */}
      <div className="bg-blue-600 text-white py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">البحث عن الإعلانات</h1>
          <div className="bg-white p-2 rounded-2xl shadow-lg flex gap-2">
            <input
              type="text"
              placeholder="ابحث عن إعلان..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-800 outline-none rounded-r-xl text-lg"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2">
              <Search size={20} /> بحث
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">الفئة</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">جميع الفئات</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">ترتيب حسب</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="newest">الأحدث</option>
              <option value="price-low">السعر: الأقل أولاً</option>
              <option value="price-high">السعر: الأعلى أولاً</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setSortBy('newest');
              }}
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition"
            >
              إعادة تعيين
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 font-semibold">
            تم العثور على <span className="text-blue-600">{sortedListings.length}</span> إعلان
          </p>
        </div>

        {sortedListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedListings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لم يتم العثور على إعلانات مطابقة</p>
          </div>
        )}
      </div>
    </div>
  );
}
