'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { getOptimizedImageUrl } from '@/lib/imageConfig';

interface Book {
  id: string;
  title: string;
  author: string | null;
  price: number;
  status: string;
  description: string | null;
  imageUrls: string[];
}

interface BookCardProps {
  book: Book;
}

const statusColors: { [key: string]: string } = {
  available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  sold: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  reserved: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
};

export default function BookCard({ book }: BookCardProps) {
  const { t } = useLanguage();
  
  const getStatusText = (status: string): string => {
    switch (status) {
      case 'available':
        return t('available');
      case 'sold':
        return t('sold');
      case 'reserved':
        return t('reserved');
      default:
        return status;
    }
  };

  return (
    <Link href={`/books/${book.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                    transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-700">
          <Image
            src={getOptimizedImageUrl(book.imageUrls[0], 'thumbnail')}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {book.author ?? t('unknownAuthor')}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${book.price.toFixed(2)}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[book.status]}`}>
              {getStatusText(book.status)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
