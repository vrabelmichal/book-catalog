'use client';

import { Suspense } from 'react';
import BookGrid from '@/components/BookGrid';
import SearchBar from '@/components/SearchBar';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/lib/LanguageContext';

function SearchBarFallback() {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
        <div className="sm:w-48">
          <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function BookGridFallback() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t('siteTitle')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('siteSubtitle')}
              </p>
            </div>
            <LanguageToggle />
          </div>
        </header>
        
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
        <Suspense fallback={<BookGridFallback />}>
          <BookGrid />
        </Suspense>
      </div>
    </main>
  );
}
