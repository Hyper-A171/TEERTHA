import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { ArrowRight, Eye, Landmark, Map, MapPin, Rocket, Sparkles } from 'lucide-react';

export const revalidate = 0;

export default async function HomePage() {
  const [templeRows] = await db.execute<any[]>(
    `SELECT t.*, c.name as category_name, c.slug as category_slug, c.description as category_description 
     FROM temples t 
     JOIN temple_categories c ON t.category_id = c.id 
     WHERE t.status = 'Active' 
     LIMIT 3`
  );
  const temples = templeRows.map(t => ({
    ...t,
    category: {
      id: t.category_id,
      name: t.category_name,
      slug: t.category_slug,
      description: t.category_description
    }
  }));

  const [categories] = await db.execute<any[]>('SELECT * FROM temple_categories LIMIT 4');

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative flex items-center justify-center overflow-hidden border-b border-gold-600/30 bg-spiritual-gradient py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

        <div className="relative z-10 mx-auto max-w-5xl space-y-6 px-4 text-center">
          <Badge variant="gold" className="gap-1.5 text-[10px] sm:text-xs">
            <Sparkles className="h-3 w-3" />
            Welcome to Atreal Studios' Teertha Portal
          </Badge>

          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-7xl">
            Discover the <span className="text-gold-gradient font-serif">Divine Heritage</span> of Ancient Shrines
          </h1>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-stone-300 sm:text-lg md:text-xl">
            Embark on a sacred journey with temple information, maps, local guidance, and historical descriptions for India's revered holy places.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button href="/temples" variant="secondary" size="lg" className="w-full sm:w-auto">
              <span>Start Pilgrimage Guide</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/about" variant="outline" size="lg" className="w-full border-white/40 text-white hover:bg-white/10 sm:w-auto">
              Explore Mission
            </Button>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-50 to-transparent dark:from-neutral-950" />
      </section>

      <section className="bg-stone-50 py-16 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl space-y-3 text-center">
            <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">Pilgrimage Circuits</h2>
            <p className="text-stone-500 dark:text-stone-400">Browse holy temples categorized under traditional Indian spiritual circuits and paths.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Card key={cat.id} className="premium-card-hover border border-stone-200 dark:border-neutral-800">
                <CardContent className="flex h-full flex-col justify-between space-y-3 p-6">
                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-maroon-800/10 text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400">
                      <Landmark className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-serif text-lg font-bold text-stone-900 dark:text-white">{cat.name}</h3>
                    <p className="line-clamp-3 text-xs leading-relaxed text-stone-500 dark:text-stone-400">{cat.description}</p>
                  </div>
                  <div className="pt-4">
                    <Link href={`/temples?category=${cat.slug}`} className="flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-500">
                      Explore Temples <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200/50 bg-stone-100 py-16 dark:border-neutral-900/50 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-3">
              <Badge variant="default" className="bg-maroon-800/10 text-maroon-800 dark:text-gold-400">Featured Shrines</Badge>
              <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">Explore Holy Destinations</h2>
              <p className="text-stone-500 dark:text-stone-400">Plan your visit to revered spiritual centers with historical and mythological records.</p>
            </div>
            <Button href="/temples" variant="outline">
              <span>View All Temples</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {temples.map((temple, index) => (
              <Card key={temple.id} className="premium-card-hover group border border-stone-200/80 dark:border-neutral-800">
                <div className="relative h-56 w-full overflow-hidden bg-neutral-200">
                  <Image
                    src={temple.thumbnail}
                    alt={temple.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index === 0}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge variant="gold">{temple.category.name}</Badge>
                  </div>
                </div>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{temple.location.split(',')[1] || temple.location}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold leading-tight text-stone-900 dark:text-white">{temple.name}</h3>
                  <p className="line-clamp-3 text-xs leading-relaxed text-stone-500 dark:text-stone-400">{temple.description}</p>
                  <Button href={`/temples/${temple.slug}`} variant="primary" size="sm" className="w-full">
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-20 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative flex h-[400px] w-full flex-col justify-end overflow-hidden rounded-lg border border-gold-600/30 bg-gradient-to-br from-maroon-800 to-rose-950 p-8 text-white shadow-xl">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:36px_36px] opacity-30" />
              <div className="absolute inset-0 bg-neutral-900/35 mix-blend-multiply" />
              <div className="relative z-10 max-w-md space-y-4">
                <Sparkles className="h-8 w-8 text-gold-400" />
                <h3 className="font-serif text-2xl font-bold text-white sm:text-3xl">Connecting pilgrims to ancient divinity.</h3>
                <p className="text-xs leading-relaxed text-stone-300">
                  Spiritual travel is more than a geographic journey. Teertha bridges physical distance with trusted sacred-space guidance.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Badge variant="gold">About Teertha</Badge>
              <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white sm:text-4xl">
                Platform for Divine Pilgrimage Guided by Atreal Studios
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                Teertha is a modern digital portal for structural, historical, and logistic temple directory details. Upcoming phases are designed for VR views, Live Darshan feeds, localized audio guides, digital donations, and AI spiritual assistance.
              </p>

              <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                    <Map className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200">Detailed Guides</h4>
                    <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">Location info, historical records, and visitor timings.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-maroon-800/10 text-maroon-800 dark:text-maroon-400">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200">Next-Gen Tech</h4>
                    <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">Scalable for VR darshan, donations, and AI guides.</p>
                  </div>
                </div>
              </div>

              <Button href="/about" variant="outline">
                <span>Learn More About Us</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-gold-600/20 bg-gradient-to-r from-neutral-900 via-maroon-950 to-neutral-900 py-16 text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.08),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-4">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">Join the Sacred Experience</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base">
            Create an account on Teertha to customize your directory, track spiritual logs, and receive updates on upcoming live stream sessions.
          </p>
          <Button href="/register" variant="secondary" size="lg" className="w-full font-bold sm:w-auto">Register Now</Button>
        </div>
      </section>
    </div>
  );
}
