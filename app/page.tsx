import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { MapPin, ArrowRight, Eye, Calendar, Sparkles, BookOpen } from 'lucide-react';

export const revalidate = 0; // Dynamic rendering for freshness

export default async function HomePage() {
  // Fetch featured temples and categories
  const temples = await db.temple.findMany({
    take: 3,
    where: { status: 'Active' },
    include: { category: true },
  });

  const categories = await db.templeCategory.findMany({
    take: 4,
  });

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-spiritual-gradient py-24 md:py-32 flex items-center justify-center text-white overflow-hidden border-b border-gold-600/30">
        {/* Subtle glowing backgrounds */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-700/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <Badge variant="gold" className="text-[10px] sm:text-xs">
            🌟 Welcome to Atreal Studios' Teertha Portal
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-tight text-white leading-tight">
            Discover the <span className="text-gold-gradient font-serif">Divine Heritage</span> of Ancient Shrines
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-3xl mx-auto font-sans leading-relaxed">
            Embark on a sacred journey. Access comprehensive temple information, location maps, local guidance, and rich historical descriptions for India's most revered holy places.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/temples" variant="secondary" size="lg" className="w-full sm:w-auto flex items-center gap-2">
              <span>Start Pilgrimage Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button href="/about" variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/40 hover:bg-white/10">
              Explore Mission
            </Button>
          </div>
        </div>

        {/* Dynamic decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-50 dark:from-neutral-950 to-transparent pointer-events-none" />
      </section>

      {/* 2. CATEGORIES PREVIEW */}
      <section className="py-16 bg-stone-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">Pilgrimage Circuits</h2>
            <p className="text-stone-500 dark:text-stone-400">
              Browse holy temples categorized under traditional Indian spiritual circuits and paths.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Card key={cat.id} className="premium-card-hover border border-stone-200 dark:border-neutral-800">
                <CardContent className="p-6 space-y-3 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-maroon-800/10 dark:bg-gold-500/10 flex items-center justify-center text-maroon-800 dark:text-gold-400 text-xl font-bold mb-4">
                      🕉️
                    </div>
                    <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white mb-2">{cat.name}</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="pt-4">
                    <Link href={`/temples?category=${cat.slug}`}>
                      <span className="text-xs font-semibold text-amber-600 hover:text-amber-500 flex items-center gap-1">
                        Explore Temples <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED TEMPLES */}
      <section className="py-16 bg-stone-100 dark:bg-neutral-900/40 border-y border-stone-200/50 dark:border-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3 max-w-2xl">
              <Badge variant="default" className="bg-maroon-800/10 text-maroon-800 dark:text-gold-400">Featured Shrines</Badge>
              <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">Explore Holy Destinations</h2>
              <p className="text-stone-500 dark:text-stone-400">
                Plan your visit to these highly revered spiritual centers loaded with historical and mythological records.
              </p>
            </div>
            <Button href="/temples" variant="outline" className="flex items-center gap-2">
              <span>View All Temples</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {temples.map((temple) => (
              <Card key={temple.id} className="premium-card-hover group border border-stone-200/80 dark:border-neutral-800">
                <div className="relative h-56 w-full overflow-hidden bg-neutral-200">
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
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{temple.location.split(',')[1] || temple.location}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-white leading-tight">
                    {temple.name}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed">
                    {temple.description}
                  </p>
                  <div className="pt-2">
                    <Button href={`/temples/${temple.slug}`} variant="primary" size="sm" className="w-full flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT TEERTHA SECTION */}
      <section className="py-20 bg-stone-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Image grid / decoration */}
            <div className="relative h-[400px] w-full bg-gradient-to-br from-maroon-800 to-rose-950 rounded-2xl overflow-hidden shadow-2xl p-8 flex flex-col justify-end text-white border border-gold-600/30">
              <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply" />
              <div className="relative z-10 space-y-4 max-w-md">
                <Sparkles className="w-8 h-8 text-gold-400" />
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">Connecting pilgrims to ancient divinity.</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  We believe that spiritual travel is more than a geographic journey; it is an inner transformation. Teertha bridges physical distances to bring sacred spaces closer.
                </p>
              </div>
            </div>

            {/* Right details */}
            <div className="space-y-6">
              <Badge variant="gold">ABOUT TEERTHA</Badge>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white">
                Platform for Divine Pilgrimage Guided by Atreal Studios
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Teertha is engineered as a modern digital portal designed to bring structural, historical, and logistic directory details of prominent temples under one banner. In upcoming phases, this directory will scale to provide immersive Virtual Reality (VR) views, Live Darshan feeds, localized audio guides, digital donation channels, and an AI Spiritual assistant.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold">
                    🗺️
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 dark:text-stone-200 text-sm">Detailed Guides</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Location info, historical records, and visitor timings.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-maroon-800/10 flex items-center justify-center text-maroon-800 dark:text-maroon-400 font-bold">
                    🚀
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 dark:text-stone-200 text-sm">Next-Gen Tech</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Scalable for VR darshan, donations, and AI guides.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button href="/about" variant="outline" className="flex items-center gap-2">
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="bg-gradient-to-r from-neutral-900 via-maroon-950 to-neutral-900 py-16 text-white border-t border-gold-600/20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Join the Sacred Experience</h2>
          <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Create an account on Teertha to customize your directory, track your spiritual logs, and receive updates on upcoming live stream sessions.
          </p>
          <div className="pt-2">
            <Button href="/register" variant="secondary" size="lg" className="w-full sm:w-auto font-bold">
              Register Now
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
