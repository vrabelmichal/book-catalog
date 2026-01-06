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
    contactFormTitle: 'Contact the seller',
    contactFormIntro: 'Share a few details and we will forward your message.',
    yourName: 'Your name',
    yourEmail: 'Your email',
    yourMessage: 'Message',
    messagePlaceholder: 'I am interested in this book and would like to know more.',
    captchaLabel: 'Human check',
    captchaPlaceholder: 'Enter the answer',
    sendMessage: 'Send message',
    sending: 'Sending...',
    messageSent: 'Message sent! The seller will reply soon.',
    messageFailed: 'Unable to send the message. Please try again.',
    bookSold: 'This book has been sold',
    bookReserved: 'This book is currently reserved',
    unknownAuthor: 'Unknown author',
    noDescription: 'No description available',
    
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
    contactFormTitle: 'Kontakt ze sprzedawcą',
    contactFormIntro: 'Podaj kilka informacji, a przekażemy Twoją wiadomość.',
    yourName: 'Twoje imię',
    yourEmail: 'Twój e-mail',
    yourMessage: 'Wiadomość',
    messagePlaceholder: 'Interesuje mnie ta książka i chciałbym dowiedzieć się więcej.',
    captchaLabel: 'Sprawdzenie człowieka',
    captchaPlaceholder: 'Wpisz wynik działania',
    sendMessage: 'Wyślij wiadomość',
    sending: 'Wysyłanie...',
    messageSent: 'Wiadomość wysłana! Sprzedawca wkrótce odpowie.',
    messageFailed: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.',
    bookSold: 'Ta książka została sprzedana',
    bookReserved: 'Ta książka jest obecnie zarezerwowana',
    unknownAuthor: 'Autor nieznany',
    noDescription: 'Brak opisu',
    
    // Language toggle
    language: 'Język',
    english: 'Angielski',
    polish: 'Polski',
    saveLanguage: 'Zapisz',
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
