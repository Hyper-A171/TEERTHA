'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FolderTree,
  Church,
  Users,
  Settings,
  Menu,
  X,
  User,
  LogOut,
  ChevronRight,
  Home,
  Film,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarLinks = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Temples', href: '/admin/temples', icon: Church },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Media Library', href: '/admin/media', icon: Film },
    { label: 'Media Categories', href: '/admin/media/categories', icon: FolderTree },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-neutral-950 flex flex-col md:flex-row">
      
      {/* 1. SIDEBAR CONTAINER */}
      <aside className={`bg-neutral-900 text-stone-300 w-64 border-r border-neutral-800 transition-all duration-300 z-30 flex flex-col flex-shrink-0 ${
        isSidebarOpen ? 'translate-x-0 block' : '-translate-x-full md:translate-x-0 md:w-20'
      } fixed md:static inset-y-0 left-0`}>
        
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-800">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-xl">🪷</span>
            {isSidebarOpen && (
              <span className="font-serif text-sm font-bold text-white tracking-wider truncate">
                TEERTHA ADMIN
              </span>
            )}
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-grow py-4 px-2 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-neutral-950 font-bold'
                    : 'hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="truncate">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer User Detail */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-gold-400">
              <User className="w-4 h-4" />
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden flex-grow">
                <p className="text-xs font-semibold text-white truncate leading-none">{session?.user?.name}</p>
                <span className="text-[9px] uppercase tracking-wider text-amber-500 font-bold">
                  {(session?.user as any)?.role}
                </span>
              </div>
            )}
          </div>
        </div>

      </aside>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. MAIN ADMIN CONTENT CONTAINER */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Admin Header */}
        <header className="h-16 border-b border-stone-200 dark:border-neutral-900 bg-white dark:bg-neutral-900 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-neutral-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Breadcrumbs (dynamic helper) */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500 uppercase tracking-wider font-semibold">
              <span>Admin Panel</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-600 font-bold">
                {pathname.split('/').slice(-1)[0] || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Home Portal Button */}
            <Link href="/" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-maroon-800 dark:hover:text-gold-400 transition-colors">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Portal Home</span>
            </Link>

            {/* Logout */}
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-600 hover:text-red-500 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Admin Content Area */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
