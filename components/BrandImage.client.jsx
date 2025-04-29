'use client';

import Image from "next/image";

export default function BrandImage({ brand }) {
  return (
    <div className="flex items-center justify-center transition-transform duration-300 hover:scale-110 h-20">
      <Image 
        src={brand.src} 
        alt={brand.name} 
        width={80} 
        height={80}
        className="object-contain max-h-full"
        onError={(e) => {
          e.currentTarget.src = '/fallback-image.png';
          e.currentTarget.alt = 'Brand logo not available';
        }}
      />
    </div>
  );
}