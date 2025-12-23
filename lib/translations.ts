export const translations = {
  en: {
    // Home page
    siteTitle: 'Book Catalog',
    siteSubtitle: 'Discover your next great read',
    
    // Search bar
    searchPlaceholder: 'Search by title or author...',
    allStatus: 'All Status',
    available: 'Available',
    sold: 'Sold',
    reserved: 'Reserved',
    
    // Book grid
    noBooksFound: 'No books found. Try adjusting your search or filters.',
    
    // Book detail page
    backToCatalog: 'Back to catalog',
    by: 'by',
    description: 'Description',
    contactSeller: 'Contact Seller',
    bookSold: 'This book has been sold',
    bookReserved: 'This book is currently reserved',
    
    // Language toggle
    language: 'Language',
    english: 'English',
    polish: 'Polish',
    saveLanguage: 'Save',
  },
  pl: {
    // Home page
    siteTitle: 'Katalog Książek',
    siteSubtitle: 'Odkryj swoją następną świetną lekturę',
    
    // Search bar
    searchPlaceholder: 'Szukaj według tytułu lub autora...',
    allStatus: 'Wszystkie statusy',
    available: 'Dostępna',
    sold: 'Sprzedana',
    reserved: 'Zarezerwowana',
    
    // Book grid
    noBooksFound: 'Nie znaleziono książek. Spróbuj dostosować wyszukiwanie lub filtry.',
    
    // Book detail page
    backToCatalog: 'Powrót do katalogu',
    by: 'autor',
    description: 'Opis',
    contactSeller: 'Skontaktuj się ze sprzedawcą',
    bookSold: 'Ta książka została sprzedana',
    bookReserved: 'Ta książka jest obecnie zarezerwowana',
    
    // Language toggle
    language: 'Język',
    english: 'Angielski',
    polish: 'Polski',
    saveLanguage: 'Zapisz',
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
