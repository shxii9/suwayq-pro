"use client";

import Link from "next/link";
import Image from "next/image";

type ListingCardProps = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export default function ListingCard({
  id,
  title,
  price,
  image,
}: ListingCardProps) {
  return (
    <Link
      href={`/listing/${id}`}
      className="block bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition"
    >
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-green-600 font-black">{price} د.ك</p>
      </div>
    </Link>
  );
}
