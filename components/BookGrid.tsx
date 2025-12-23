'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BookCard from './BookCard';
import books from '@/data/books.json';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  status: string;
  description: string;
  imageUrls: string[];
}

export default function BookGrid() {
  const searchParams = useSearchParams();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  useEffect(() => {
    const search = searchParams.get('search')?.toLowerCase() || '';
    const status = searchParams.get('status') || 'all';

    let filtered = books.filter((book: Book) => {
      const matchesSearch = 
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search);
      
      const matchesStatus = status === 'all' || book.status === status;

      return matchesSearch && matchesStatus;
    });

    setFilteredBooks(filtered);
  }, [searchParams]);

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No books found. Try adjusting your search or filters.
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
