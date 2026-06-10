import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Card, Badge, Button } from '@/components/ui';
import { Eye, Filter, Landmark, MapPin, Search } from 'lucide-react';

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function TemplesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const searchVal = resolvedParams?.search || '';
  const categorySlug = resolvedParams?.category || '';

  const [categories] = await db.execute<any[]>('SELECT * FROM temple_categories ORDER BY name ASC');

  let query = `
    SELECT t.*, c.name as category_name, c.slug as category_slug, c.description as category_description 
    FROM temples t 
    JOIN temple_categories c ON t.category_id = c.id 
    WHERE t.status = 'Active'
  `;
  const params: any[] = [];

  if (searchVal) {
    query += ` AND (t.name LIKE ? OR t.description LIKE ? OR t.location LIKE ?)`;
    const searchLike = `%${searchVal}%`;
    params.push(searchLike, searchLike, searchLike);
  }

  if (categorySlug) {
    query += ` AND c.slug = ?`;
    params.push(categorySlug);
  }

  query += ` ORDER BY t.name ASC`;

  const [templeRows] = await db.execute<any[]>(query, params);
  const temples = templeRows.map(t => ({
    ...t,
    category: {
      id: t.category_id,
      name: t.category_name,
      slug: t.category_slug,
      description: t.category_description
    }
  }));

  const activeCategoryName = categories.find((category) => category.slug === categorySlug)?.name;

  return (
    <div className="min-h-screen bg-stone-50 py-12 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <Badge variant="gold">Temple Directory</Badge>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white sm:text-4xl">Sacred Temple Directory</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">Explore and search holy places across multiple traditional circuits.</p>
        </div>

        <Card className="border border-stone-200/60 bg-white/70 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/50">
          <form method="GET" action="/temples" className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-grow">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                name="search"
                defaultValue={searchVal}
                placeholder="Search by temple name, history, or location..."
                className="h-11 w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:ring-gold-500"
              />
              {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
            </div>

            <div className="flex gap-2">
              <Button type="submit" variant="primary" className="h-11 px-6">Filter</Button>
              {(searchVal || categorySlug) && (
                <Link href="/temples">
                  <Button type="button" variant="outline" className="h-11">Clear Filters</Button>
                </Link>
              )}
            </div>
          </form>

          <div className="mt-4 border-t border-stone-100 pt-4 dark:border-neutral-800/40">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
              <Filter className="h-3.5 w-3.5" />
              <span>Select Circuit:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link href={`/temples${searchVal ? `?search=${encodeURIComponent(searchVal)}` : ''}`}>
                <span
                  className={`inline-flex cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    !categorySlug
                      ? 'border-maroon-900 bg-maroon-800 text-white'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-stone-300'
                  }`}
                >
                  All Circuits
                </span>
              </Link>

              {categories.map((cat) => {
                const isActive = categorySlug === cat.slug;
                const linkHref = `/temples?category=${cat.slug}${searchVal ? `&search=${encodeURIComponent(searchVal)}` : ''}`;

                return (
                  <Link key={cat.id} href={linkHref}>
                    <span
                      className={`inline-flex cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                        isActive
                          ? 'border-gold-600 bg-gradient-to-r from-gold-500 to-amber-600 font-bold text-maroon-950'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-stone-300'
                      }`}
                    >
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="flex flex-col justify-between gap-2 px-1 text-xs font-semibold uppercase tracking-wide text-stone-500 sm:flex-row sm:items-center">
          <span>Showing {temples.length} holy shrines found</span>
          {activeCategoryName && (
            <span>
              Circuit Filter: <span className="text-amber-600">{activeCategoryName}</span>
            </span>
          )}
        </div>

        {temples.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {temples.map((temple) => (
              <Card key={temple.id} className="premium-card-hover group flex h-full flex-col justify-between border border-stone-200/60 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-200">
                    <img
                      src={temple.thumbnail}
                      alt={temple.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge variant="gold">{temple.category.name}</Badge>
                    </div>
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="line-clamp-1">{temple.location}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold leading-tight text-stone-900 dark:text-white">{temple.name}</h3>
                    <p className="line-clamp-3 text-xs leading-relaxed text-stone-500 dark:text-stone-400">{temple.description}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Button href={`/temples/${temple.slug}`} variant="outline" className="w-full">
                    <Eye className="h-4 w-4" />
                    <span>Read Historical Record</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border border-dashed border-stone-300 p-12 text-center dark:border-neutral-800">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-maroon-800/10 text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400">
              <Landmark className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">No shrines found</h3>
            <p className="mx-auto mt-1 max-w-md text-xs text-stone-500 dark:text-stone-400">
              We couldn't find any active temples matching your filters. Try checking spelling or changing the circuit badge filter.
            </p>
            <div className="mt-6">
              <Button href="/temples" variant="primary">Reset Directory View</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
