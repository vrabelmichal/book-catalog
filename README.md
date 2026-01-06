# Book Catalog - Next.js 14 App

A modern, responsive book catalog application built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Features

✨ **Home Page**
- Responsive grid layout (1-4 columns based on screen size)
- Real-time search by title or author
- Filter books by status (Available, Sold, Reserved)
- Beautiful book cards with hover effects
- Optimized images with Next.js Image component

📖 **Book Detail Pages**
- Dynamic routes at `/books/[id]` for shareable links
- Interactive image gallery (supports 1-3 photos)
- Thumbnail navigation with visual feedback
- Book status badges (Available, Sold, Reserved)
- Detailed descriptions
- Responsive layout

🎨 **UI/UX**
- Minimalist, clean design
- Mobile-first responsive layout
- Dark mode support
- Smooth transitions and hover effects
- Loading states with skeleton screens

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Image Optimization**: Next/Image
- **Data**: Local JSON file

## Project Structure

```
book-catalog/
├── app/
│   ├── books/
│   │   └── [id]/
│   │       └── page.tsx        # Dynamic book detail page
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── BookCard.tsx             # Book card component
│   ├── BookGrid.tsx             # Grid with filtering logic
│   ├── ImageGallery.tsx         # Image gallery with thumbnails
│   └── SearchBar.tsx            # Search and filter controls
├── data/
│   └── books_data.json               # Book catalog data
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## Data Structure

Each book in `data/books_data.json` has:

```typescript
{
  id: string;
  title: string;
  author: string;
  price: number;
  status: "available" | "sold" | "reserved";
  description: string;
  imageUrls: string[];  // 1-3 image URLs
}
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vrabelmichal/book-catalog.git
cd book-catalog
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Features in Detail

### Search & Filter
- **Search**: Real-time filtering by book title or author name
- **Status Filter**: Filter books by availability status
- **URL Params**: Search and filter state persisted in URL for shareable links

### Image Gallery
- **Main Image Display**: Large primary image with smooth transitions
- **Thumbnail Navigation**: Click thumbnails to switch images
- **Visual Feedback**: Blue ring highlights the selected thumbnail
- **Responsive**: Adapts to different screen sizes

### Responsive Design
- **Mobile (< 640px)**: Single column grid
- **Tablet (640-1024px)**: 2 column grid  
- **Desktop (1024-1280px)**: 3 column grid
- **Large Desktop (> 1280px)**: 4 column grid

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC