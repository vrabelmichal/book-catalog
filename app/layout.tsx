import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

export const metadata: Metadata = {
  title: "Book Catalog",
  description: "A beautiful book catalog built with Next.js 14",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get('language')?.value;
  const initialLanguage = savedLanguage === 'pl' ? 'pl' : 'en';
  const initialHasLanguageCookie = savedLanguage === 'en' || savedLanguage === 'pl';

  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider
          initialLanguage={initialLanguage}
          initialHasLanguageCookie={initialHasLanguageCookie}
        >
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
