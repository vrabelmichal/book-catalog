'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getOptimizedImageUrl } from '@/lib/imageConfig';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        <Image
          src={getOptimizedImageUrl(images[selectedIndex], 'fullSize')}
          alt={`${title} - Image ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority={selectedIndex === 0}
          loading={selectedIndex === 0 ? 'eager' : 'lazy'}
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-[2/3] rounded-lg overflow-hidden transition-all duration-200
                        ${selectedIndex === index 
                          ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800' 
                          : 'hover:opacity-75'}`}
            >
              <Image
                src={getOptimizedImageUrl(image, 'galleryThumbnail')}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 33vw, 16vw"
                className="object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
