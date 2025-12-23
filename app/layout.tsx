import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Catalog",
  description: "A beautiful book catalog built with Next.js 14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
