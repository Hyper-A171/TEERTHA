import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Card, CardContent, Badge, Button } from '@/components/ui';
import { MapPin, Search, Eye, Filter } from 'lucide-react';

export const revalidate = 0; // Dynamic rendering for freshness

interface PageProps {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function TemplesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const searchVal = resolvedParams?.search || '';
  const categorySlug = resolvedParams?.category || '';

  // Query categories
  const categories = await db.templeCategory.findMany();

  // Query matching temples
  const temples = await db.temple.findMany({
    where: {
      status: 'Active',
      AND: [
        searchVal
          ? {
              OR: [
                { name: { contains: searchVal } },
                { description: { contains: searchVal } },
                { location: { contains: searchVal } },
              ],
            }
          : {},
        categorySlug
          ? {
              category: {
                slug: categorySlug,
              },
            }
          : {},
      ],
    },
    include: {
      category: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className="bg-stone-50 dark:bg-neutral-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white">
            Sacred Temple Directory
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Explore and search through holy places across multiple traditional circuits.
          </p>
        </div>

        {/* Filter Controls (RSC Form to prevent complex state mismatches) */}
        <Card className="p-6 border border-stone-200/60 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md">
          <form method="GET" action="/temples" className="flex flex-col lg:flex-row gap-4">
            
            {/* Text Search Input */}
            <div className="relative flex-grow">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400 pointer-events-none">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                name="search"
                defaultValue={searchVal}
                placeholder="Search by temple name, history, or location..."
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700 dark:focus:ring-gold-500"
              />
              {categorySlug && (
                <input type="hidden" name="category" value={categorySlug} />
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button type="submit" variant="primary" className="flex items-center gap-2 h-11 px-6">
                <span>Filter</span>
              </Button>
              {(searchVal || categorySlug) && (
                <Link href="/temples">
                  <Button type="button" variant="outline" className="h-11">
                    Clear Filters
                  </Button>
                </Link>
              )}
            </div>

          </form>

          {/* Category Filter Badges */}
          <div className="mt-4 pt-4 border-t border-stone-100 dark:border-neutral-800/40">
            <div className="flex items-center gap-2 text-xs text-stone-500 uppercase font-semibold tracking-wider mb-3">
              <Filter className="w-3.5 h-3.5" />
              <span>Select Circuit Circuit:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {/* "All" button */}
              <Link href={`/temples${searchVal ? `?search=${encodeURIComponent(searchVal)}` : ''}`}>
                <span className={`inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer border transition-colors ${
                  !categorySlug
                    ? 'bg-maroon-800 text-white border-maroon-900'
                    : 'bg-white dark:bg-neutral-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-neutral-800 hover:bg-stone-50'
                }`}>
                  All Circuits
                </span>
              </Link>

              {categories.map((cat) => {
                const isActive = categorySlug === cat.slug;
                const linkHref = `/temples?category=${cat.slug}${searchVal ? `&search=${encodeURIComponent(searchVal)}` : ''}`;
                
                return (
                  <Link key={cat.id} href={linkHref}>
                    <span className={`inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer border transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-maroon-950 border-gold-600 font-bold'
                        : 'bg-white dark:bg-neutral-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-neutral-800 hover:bg-stone-50'
                    }`}>
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Results Info */}
        <div className="text-xs text-stone-500 font-semibold uppercase tracking-wide flex justify-between items-center px-1">
          <span>Showing {temples.length} holy shrines found</span>
          {categorySlug && (
            <span>Circuit Filter: <span className="text-amber-600">{categories.find(c => c.slug === categorySlug)?.name}</span></span>
          )}
        </div>

        {/* Directory Grid */}
        {temples.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temples.map((temple) => (
              <Card key={temple.id} className="premium-card-hover group border border-stone-200/60 dark:border-neutral-800 flex flex-col justify-between h-full bg-white dark:bg-neutral-900">
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-200">
                    <Image
                      src={temple.thumbnail}
                      alt={temple.name}
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="gold">{temple.category.name}</Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{temple.location}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-white leading-tight">
                      {temple.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed">
                      {temple.description}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link href={`/temples/${temple.slug}`} className="block w-full">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>Read Historical Record</span>
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border border-dashed border-stone-300 dark:border-neutral-800">
            <div className="text-4xl mb-4">🏮</div>
            <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-200">No shrines found</h3>
            <p className="text-stone-500 dark:text-stone-400 text-xs mt-1 max-w-md mx-auto">
              We couldn't find any active temples matching your filters. Try checking spelling or changing the circuit badge filter.
            </p>
            <div className="mt-6">
              <Link href="/temples">
                <Button variant="primary">Reset Directory View</Button>
              </Link>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}
