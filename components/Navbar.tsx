'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Sun, Moon, Menu, X, User, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from './ui';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Sync theme with system / localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Temples', href: '/temples' },
    { label: 'Contact', href: '/contact' },
  ];

  const isAdmin = session?.user && ((session.user as any).role === 'Super Admin' || (session.user as any).role === 'Admin');

  return (
    <nav className="sticky top-0 z-40 w-full transition-all border-b border-stone-200/50 dark:border-neutral-900/60 bg-white/75 dark:bg-neutral-950/75 backdrop-blur-md">
      {/* Upper limited banner (styled like image) */}
      <div className="w-full bg-gradient-to-r from-maroon-900 via-red-800 to-maroon-950 text-white text-center py-2 px-4 text-xs font-semibold tracking-wider flex items-center justify-center gap-3">
        <span>✨ Explore the Divine Heritage with Teertha Platform</span>
        <span className="hidden sm:inline-block px-2 py-0.5 bg-gold-500 text-maroon-950 text-[10px] uppercase font-bold rounded">Live Darshan coming soon</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-maroon-950 shadow-md group-hover:scale-105 transition-transform">
                {/* Spiritual Lotus Icon SVG */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C11.5 5 9 8.5 6 10c2.5 1 5-1.5 6-4 1 2.5 3.5 5 6 4-3-1.5-5.5-5-6-8zm0 20c.5-3 3-6.5 6-8-2.5-1-5 1.5-6 4-1-2.5-3.5-5-6-4 3 1.5 5.5 5 6 8zm0-9a3 3 0 110-6 3 3 0 010 6z"/>
                </svg>
              </div>
              <span className="font-serif text-xl font-bold bg-gradient-to-r from-maroon-800 to-maroon-950 dark:from-gold-300 dark:to-gold-500 bg-clip-text text-transparent tracking-wide">
                TEERTHA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 hover:text-maroon-700 dark:hover:text-gold-400 ${
                    isActive 
                      ? 'text-maroon-800 dark:text-gold-400 font-semibold' 
                      : 'text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-500 to-amber-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Header Actions */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Authentication States */}
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-maroon-800 animate-spin" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-neutral-800 hover:bg-stone-50 dark:hover:bg-neutral-900 transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-maroon-800/10 dark:bg-gold-500/10 flex items-center justify-center text-maroon-800 dark:text-gold-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-xs font-semibold text-stone-800 dark:text-stone-200 truncate max-w-[100px]">
                      {session.user?.name}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-amber-600 font-bold leading-none">
                      {(session.user as any).role}
                    </div>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 rounded-lg border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl py-1 z-20 animate-fade-in">
                      <div className="px-4 py-2 border-b border-stone-100 dark:border-neutral-800">
                        <p className="text-xs text-stone-500">Signed in as</p>
                        <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 truncate">{session.user?.email}</p>
                      </div>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-amber-500" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondary" size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger & theme toggle */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-stone-500 dark:text-stone-400"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-neutral-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-neutral-900 bg-white dark:bg-neutral-950 py-3 px-4 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm py-2 px-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-maroon-800/10 text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400 font-semibold' 
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-neutral-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-200 dark:border-neutral-800 flex flex-col gap-2">
            {session ? (
              <>
                <div className="px-3 py-1 text-xs">
                  <div className="text-stone-500">Signed in as</div>
                  <div className="font-semibold text-stone-800 dark:text-stone-200">{session.user?.name}</div>
                  <div className="text-[10px] text-amber-600 font-bold uppercase">{(session.user as any).role}</div>
                </div>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-3 text-sm text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-50 dark:hover:bg-neutral-900"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-500" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="flex w-full items-center gap-2 py-2 px-3 text-sm text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 p-1">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Log In</Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
