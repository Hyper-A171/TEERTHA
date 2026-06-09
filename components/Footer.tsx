'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-stone-300 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Company Description */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-maroon-950 font-bold">
                🪷
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-wider">TEERTHA</span>
            </div>
            <p className="text-sm text-stone-400 max-w-sm">
              Discover and explore India's sacred heritage. Teertha brings the divinity of ancient shrines directly to pilgrims worldwide with rich listings, historic insights, and interactive maps.
            </p>
            <div className="text-xs text-stone-500 pt-2">
              Developed by <a href="#" className="text-amber-500 hover:underline">Atreal Studios</a>.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-stone-100 font-serif font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-500 transition-colors">Home Portal</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors">Our Mission</Link>
              </li>
              <li>
                <Link href="/temples" className="hover:text-amber-500 transition-colors">Temple Directory</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-500 transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-stone-100 font-serif font-bold text-sm uppercase tracking-wider mb-4">Reach Us</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>Atreal Studios Pvt. Ltd.</li>
              <li>Spiritual Tech Division</li>
              <li>Email: contact@atrealstudios.com</li>
              <li>Phone: +91 98765 43210</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-neutral-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Teertha. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
