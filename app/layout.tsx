import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teertha | Spiritual Tourism Platform",
  description: "Explore the divinity of India's ancient shrines and heritage. Explore temple listings, details, and book your spiritual journeys.",
  keywords: ["spiritual tourism", "temples in India", "Kedarnath", "Kashi Vishwanath", "Char Dham", "Jyotirlinga"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sansFont.variable} ${serifFont.variable} font-sans min-h-screen flex flex-col`}>
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
