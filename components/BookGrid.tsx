'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BookCard from './BookCard';
import books from '@/data/books_data.json';
import { useLanguage } from '@/lib/LanguageContext';
import { combinedScore } from '@/lib/search';

interface Book {
  id: string;
  title: string;
  author: string | null;
  price: number;
  status: string;
  description: string | null;
  imageUrls: string[];
}

export default function BookGrid() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    // Filter by search (accent-insensitive) and status, then rank by score
    const filtered = books
      .map((book: Book) => {
        const score = combinedScore([book.title, book.author ?? ''], search);
        return { book, score };
      })
      .filter(({ book, score }) => {
        const matchesSearch = search.trim() === '' ? true : score > 0;
        const matchesStatus = status === 'all' || book.status === status;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => b.score - a.score || a.book.title.localeCompare(b.book.title))
      .map(({ book }) => book);

    setFilteredBooks(filtered);
  }, [searchParams]);

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          {t('noBooksFound')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredBooks.map((book: Book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
