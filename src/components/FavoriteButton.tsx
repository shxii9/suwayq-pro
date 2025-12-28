"use client";

import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const FavoriteButton = ({ listingId }: { listingId: string }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFav(favorites.includes(listingId));
  }, [listingId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    if (isFav) {
      favorites = favorites.filter((id: string) => id !== listingId);
      toast.success("تمت الإزالة من المفضلة", { icon: '💔' });
    } else {
      favorites.push(listingId);
      toast.success("تمت الإضافة للمفضلة", { icon: '❤️' });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFav(!isFav);
  };

  return (
    <button 
      onClick={toggleFavorite}
      className={`p-2.5 rounded-2xl transition-all duration-300 ${
        isFav ? "bg-red-500 text-white shadow-lg shadow-red-200" : "bg-white/90 text-gray-400 hover:text-red-500"
      }`}
    >
      <Heart size={20} fill={isFav ? "currentColor" : "none"} />
    </button>
  );
};
