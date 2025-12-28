"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRate = (index: number) => {
    setRating(index);
    toast.success(`شكراً لتقييمك: ${index} من 5`, { icon: '⭐' });
  };

  return (
    <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700">
      <span className="font-bold text-gray-700 dark:text-gray-300">ما رأيك في هذا الإعلان؟</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform hover:scale-125"
          >
            <Star
              size={28}
              className={
                (hover || rating) >= star 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300 dark:text-gray-600"
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
}
