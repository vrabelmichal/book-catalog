'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations, TranslationKey } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  hasLanguageCookie: boolean;
  saveLanguageToCookie: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}
export function LanguageProvider({
  children,
  initialLanguage = 'en',
  initialHasLanguageCookie = false,
}: {
  children: ReactNode;
  initialLanguage?: Language;
  initialHasLanguageCookie?: boolean;
}) {
  // Deterministic initial state (server and client) to avoid hydration mismatches.
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [hasLanguageCookie, setHasLanguageCookie] = useState<boolean>(initialHasLanguageCookie);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    // If cookie exists, automatically save the new preference
    if (hasLanguageCookie) {
      setCookie('language', lang);
    }
  };

  const saveLanguageToCookie = () => {
    setCookie('language', language);
    setHasLanguageCookie(true);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, hasLanguageCookie, saveLanguageToCookie }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
