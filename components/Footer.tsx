'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-amber-600 text-maroon-950">
                <Landmark className="h-4 w-4" />
              </div>
              <span className="font-serif text-lg font-bold tracking-wider text-white">TEERTHA</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-stone-400">
              Discover and explore India's sacred heritage with temple listings, historic insights, and practical pilgrimage guidance.
            </p>
            <div className="pt-2 text-xs text-stone-500">
              Developed by <a href="#" className="text-amber-500 hover:underline">Atreal Studios</a>.
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-serif text-sm font-bold uppercase tracking-wider text-stone-100">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="transition-colors hover:text-amber-500">Home Portal</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-amber-500">Our Mission</Link></li>
              <li><Link href="/temples" className="transition-colors hover:text-amber-500">Temple Directory</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-amber-500">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-serif text-sm font-bold uppercase tracking-wider text-stone-100">Reach Us</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>Atreal Studios Pvt. Ltd.</li>
              <li>Spiritual Tech Division</li>
              <li>Email: contact@atrealstudios.com</li>
              <li>Phone: +91 98765 43210</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-6 text-xs text-stone-500 sm:flex-row">
          <p>(c) {new Date().getFullYear()} Teertha. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
