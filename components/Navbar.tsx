'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Landmark, LayoutDashboard, LogOut, Menu, Moon, Sparkles, Sun, User, X } from 'lucide-react';
import { Button } from './ui';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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
    <nav className="sticky top-0 z-40 w-full border-b border-stone-200/60 bg-white/80 backdrop-blur-md transition-all dark:border-neutral-900/70 dark:bg-neutral-950/80">
      <div className="w-full bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-950 px-4 py-2 text-xs font-semibold tracking-wide text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3">
          <Sparkles className="h-3.5 w-3.5 flex-shrink-0 text-gold-300" />
          <span className="truncate">Explore the Divine Heritage with Teertha Platform</span>
          <span className="hidden rounded bg-gold-500 px-2 py-0.5 text-[10px] font-bold uppercase text-maroon-950 sm:inline-block">
            Live Darshan coming soon
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex flex-shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-amber-600 text-maroon-950 shadow-sm transition-transform group-hover:scale-105">
              <Landmark className="h-5 w-5" />
            </div>
            <span className="bg-gradient-to-r from-maroon-800 to-maroon-950 bg-clip-text font-serif text-xl font-bold tracking-wide text-transparent dark:from-gold-300 dark:to-gold-500">
              TEERTHA
            </span>
          </Link>

          <div className="hidden items-center space-x-6 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 text-sm font-medium transition-colors hover:text-maroon-700 dark:hover:text-gold-400 ${
                    isActive ? 'font-semibold text-maroon-800 dark:text-gold-400' : 'text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {link.label}
                  {isActive && <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-gold-500 to-amber-600" />}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-stone-500 transition-colors hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-neutral-900"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {status === 'loading' ? (
              <div className="h-8 w-8 rounded-full border-2 border-maroon-800 border-t-transparent animate-spin" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-stone-200 px-3 py-1.5 transition-all hover:bg-stone-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-maroon-800/10 text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="hidden text-left lg:block">
                    <div className="max-w-[100px] truncate text-xs font-semibold text-stone-800 dark:text-stone-200">{session.user?.name}</div>
                    <div className="text-[9px] font-bold uppercase leading-none tracking-wider text-amber-600">{(session.user as any).role}</div>
                  </div>
                </button>

                {isProfileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)} />
                    <div className="absolute right-0 z-20 mt-2 w-56 animate-fade-in rounded-lg border border-stone-200 bg-white py-1 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
                      <div className="border-b border-stone-100 px-4 py-2 dark:border-neutral-800">
                        <p className="text-xs text-stone-500">Signed in as</p>
                        <p className="truncate text-sm font-semibold text-stone-800 dark:text-stone-200">{session.user?.email}</p>
                      </div>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-neutral-800"
                        >
                          <LayoutDashboard className="h-4 w-4 text-amber-500" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <LogOut className="h-4 w-4" />
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

          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleTheme} className="rounded-full p-2 text-stone-500 dark:text-stone-400" aria-label="Toggle theme">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-neutral-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="space-y-3 border-t border-stone-200 bg-white px-4 py-3 dark:border-neutral-900 dark:bg-neutral-950 md:hidden">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-maroon-800/10 font-semibold text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400'
                      : 'text-stone-600 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-neutral-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 border-t border-stone-200 pt-3 dark:border-neutral-800">
            {session ? (
              <>
                <div className="px-3 py-1 text-xs">
                  <div className="text-stone-500">Signed in as</div>
                  <div className="font-semibold text-stone-800 dark:text-stone-200">{session.user?.name}</div>
                  <div className="text-[10px] font-bold uppercase text-amber-600">{(session.user as any).role}</div>
                </div>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-neutral-900"
                  >
                    <LayoutDashboard className="h-4 w-4 text-amber-500" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <LogOut className="h-4 w-4" />
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
