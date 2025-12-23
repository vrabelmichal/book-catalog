'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { Language } from '@/lib/translations';

export default function LanguageToggle() {
  const { language, setLanguage, t, hasLanguageCookie, saveLanguageToCookie } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                   text-sm"
        aria-label={t('language')}
      >
        <option value="en">{t('english')}</option>
        <option value="pl">{t('polish')}</option>
      </select>
      
      {!hasLanguageCookie && (
        <button
          onClick={saveLanguageToCookie}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium 
                     rounded-lg transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={t('saveLanguage')}
        >
          {t('saveLanguage')}
        </button>
      )}
    </div>
  );
}
