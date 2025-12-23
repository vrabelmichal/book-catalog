import { notFound } from 'next/navigation';
import Link from 'next/link';
import ImageGallery from '@/components/ImageGallery';
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

const statusColors: { [key: string]: string } = {
  available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  sold: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  reserved: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
};

export async function generateStaticParams() {
  return books.map((book) => ({
    id: book.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const book = books.find((b) => b.id === params.id);
  
  if (!book) {
    return {
      title: 'Book Not Found',
    };
  }

  return {
    title: `${book.title} - Book Catalog`,
    description: book.description,
  };
}

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const book = books.find((b: Book) => b.id === params.id);

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to catalog
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Gallery */}
            <div>
              <ImageGallery images={book.imageUrls} title={book.title} />
            </div>

            {/* Book Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                by {book.author}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${book.price.toFixed(2)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[book.status]}`}>
                  {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {book.status === 'available' && (
                <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 
                                 text-white font-semibold rounded-lg transition-colors duration-200
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Contact Seller
                </button>
              )}
              {book.status === 'sold' && (
                <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 
                              dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    This book has been sold
                  </p>
                </div>
              )}
              {book.status === 'reserved' && (
                <div className="px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 
                              dark:border-yellow-800 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                    This book is currently reserved
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
