'use client';

import { FormEvent, useMemo, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ImageGallery from '@/components/ImageGallery';
import LanguageToggle from '@/components/LanguageToggle';
import books from '@/data/books_data.json';
import { useLanguage } from '@/lib/LanguageContext';

interface Book {
  id: string;
  title: string;
  author: string | null;
  price: number;
  status: string;
  description: string | null;
  imageUrls: string[];
}

const statusColors: { [key: string]: string } = {
  available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  sold: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  reserved: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const generateCaptcha = () => ({
  a: Math.floor(Math.random() * 9) + 1,
  b: Math.floor(Math.random() * 9) + 1,
});

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage();
  const book = books.find((b: Book) => b.id === params.id);

  if (!book) {
    notFound();
  }

  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const captchaQuestion = useMemo(
    () => `${captcha.a} + ${captcha.b} = ?`,
    [captcha.a, captcha.b]
  );

  const handleOpenForm = () => {
    setShowForm(true);
    setFormStatus('idle');
    setErrorMessage('');
    setCaptcha(generateCaptcha());
    setCaptchaAnswer('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formValues,
          captchaAnswer,
          captchaA: captcha.a,
          captchaB: captcha.b,
          bookId: book.id,
          bookTitle: book.title,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFormStatus('error');
        setErrorMessage(result.error ?? t('messageFailed'));
        setCaptcha(generateCaptcha());
        setCaptchaAnswer('');
        return;
      }

      setFormStatus('success');
      setFormValues({ name: '', email: '', message: '' });
      setCaptcha(generateCaptcha());
      setCaptchaAnswer('');
    } catch (error) {
      console.error('Failed to submit contact form', error);
      setFormStatus('error');
      setErrorMessage(t('messageFailed'));
      setCaptcha(generateCaptcha());
      setCaptchaAnswer('');
    }
  };

  const isSubmitting = formStatus === 'loading';

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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
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
            {t('backToCatalog')}
          </Link>
          <LanguageToggle />
        </div>

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
                {book.author ? (
                  <>
                    {t('by')} {book.author}
                  </>
                ) : (
                  t('unknownAuthor')
                )}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${book.price.toFixed(2)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[book.status]}`}>
                  {getStatusText(book.status)}
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('description')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {book.description ?? t('noDescription')}
                </p>
              </div>

              {book.status === 'available' && (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={handleOpenForm}
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {t('contactSeller')}
                  </button>

                  {showForm && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {t('contactFormTitle')}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {t('contactFormIntro')}
                      </p>

                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {t('yourName')}
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formValues.name}
                              onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                              required
                              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {t('yourEmail')}
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formValues.email}
                              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                              required
                              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {t('yourMessage')}
                          </label>
                          <textarea
                            name="message"
                            value={formValues.message}
                            onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                            required
                            rows={4}
                            placeholder={t('messagePlaceholder')}
                            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {t('captchaLabel')}: {captchaQuestion}
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              inputMode="numeric"
                              name="captcha"
                              value={captchaAnswer}
                              onChange={(e) => setCaptchaAnswer(e.target.value)}
                              required
                              placeholder={t('captchaPlaceholder')}
                              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => setCaptcha(generateCaptcha())}
                              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Refresh
                            </button>
                          </div>
                        </div>

                        {formStatus === 'error' && errorMessage && (
                          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
                        )}
                        {formStatus === 'success' && (
                          <p className="text-sm text-green-700 dark:text-green-300">{t('messageSent')}</p>
                        )}

                        <div className="flex items-center gap-3">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {isSubmitting ? t('sending') : t('sendMessage')}
                          </button>
                          {formStatus === 'success' && (
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {t('messageSent')}
                            </span>
                          )}
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
              {book.status === 'sold' && (
                <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 
                              dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    {t('bookSold')}
                  </p>
                </div>
              )}
              {book.status === 'reserved' && (
                <div className="px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 
                              dark:border-yellow-800 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                    {t('bookReserved')}
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
