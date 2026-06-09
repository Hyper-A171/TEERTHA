'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if we are inside any admin route
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return (
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
