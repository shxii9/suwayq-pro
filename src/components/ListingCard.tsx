"use client";

import Link from "next/link";
import Image from "next/image";

type ListingCardProps = {
  id: string;
  title: string;
  price: number;
  image?: string;
};

export function ListingCard({ id, title, price, image }: ListingCardProps) {
  return (
    <Link href={`/listing/${id}`} className="block">
      <div className="border rounded-xl overflow-hidden hover:shadow-md transition">
        {image && (
          <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-green-600 font-bold mt-1">{price} د.ك</p>
        </div>
      </div>
    </Link>
  );
}
