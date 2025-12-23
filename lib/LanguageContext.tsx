'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, TranslationKey } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  hasLanguageCookie: boolean;
  saveLanguageToCookie: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Cookie helper functions
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en';
  
  const browserLang = navigator.language.toLowerCase();
  
  // Check if browser language starts with 'pl' (e.g., 'pl', 'pl-PL')
  if (browserLang.startsWith('pl')) {
    return 'pl';
  }
  
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [hasLanguageCookie, setHasLanguageCookie] = useState(false);

  useEffect(() => {
    // Check for saved language preference in cookie
    const savedLanguage = getCookie('language');
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pl')) {
      setLanguageState(savedLanguage);
      setHasLanguageCookie(true);
    } else {
      // Auto-detect browser language
      const detectedLanguage = detectBrowserLanguage();
      setLanguageState(detectedLanguage);
      setHasLanguageCookie(false);
    }
  }, []);

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
