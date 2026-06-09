import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Card, CardContent, Badge, Button } from '@/components/ui';
import { MapPin, Calendar, Clock, BookOpen, ArrowLeft, Shield } from 'lucide-react';

export const revalidate = 0; // Dynamic rendering for freshness

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TempleDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Query database for the temple details
  const temple = await db.temple.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!temple) {
    notFound();
  }

  // Generates some mock gallery pictures based on the base thumbnail
  const mockGallery = [
    temple.thumbnail,
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600',
  ];

  return (
    <div className="bg-stone-50 dark:bg-neutral-950 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <div>
          <Link href="/temples" className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-amber-600 font-semibold uppercase tracking-wider transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to directory</span>
          </Link>
        </div>

        {/* 1. HERO VIEW */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[350px] sm:h-[450px] border border-gold-600/30">
          <Image
            src={temple.thumbnail}
            alt={temple.name}
            fill
            priority
            className="object-cover"
          />
          {/* Saffron-black overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 space-y-3 z-10 text-white">
            <div className="flex flex-wrap gap-2">
              <Badge variant="gold" className="bg-gold-500 text-maroon-950 font-bold">{temple.category.name}</Badge>
              <Badge variant="success" className="bg-green-600 text-white font-bold">{temple.status}</Badge>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {temple.name}
            </h1>
            
            <div className="flex items-center gap-2 text-stone-300 text-sm">
              <MapPin className="w-4.5 h-4.5 text-amber-500 flex-shrink-0" />
              <span>{temple.location}</span>
            </div>
          </div>
        </div>

        {/* 2. SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Description (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            <Card className="p-8 border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-maroon-800 dark:text-gold-400 pb-2 border-b border-stone-100 dark:border-neutral-800/40">
                  <BookOpen className="w-5 h-5" />
                  <h2 className="text-xl font-serif font-bold uppercase tracking-wider">Historical & Spiritual Significance</h2>
                </div>
                <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-sans whitespace-pre-line">
                  {temple.description}
                </p>
              </div>
            </Card>

            {/* Gallery */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white uppercase tracking-wider">Visual Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mockGallery.map((img, idx) => (
                  <div key={idx} className="relative h-40 rounded-xl overflow-hidden border border-stone-200/60 dark:border-neutral-800 bg-neutral-200">
                    <Image
                      src={img}
                      alt={`${temple.name} view ${idx + 1}`}
                      fill
                      sizes="(max-w-768px) 100vw, 20vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Facts Sidebar (Right column) */}
          <div className="space-y-6">
            
            <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              <div className="p-6 bg-gradient-to-r from-maroon-900 to-maroon-950 text-white font-serif font-bold text-lg border-b border-gold-600/30">
                Quick Facts & Guide
              </div>
              <CardContent className="p-6 space-y-4 text-sm font-sans">
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-100 dark:bg-neutral-800 rounded-lg text-stone-600 dark:text-stone-300">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 dark:text-stone-200">Timings</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">04:00 AM - 09:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-100 dark:bg-neutral-800 rounded-lg text-stone-600 dark:text-stone-300">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 dark:text-stone-200">Best Time to Visit</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">September to March</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-100 dark:bg-neutral-800 rounded-lg text-stone-600 dark:text-stone-300">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 dark:text-stone-200">Entry Rules</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Traditional attire requested. Photography restriction applies inside the inner sanctum.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-stone-100 dark:border-neutral-800/40">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
                    🕉️
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 dark:text-stone-200">Circuit</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{temple.category.name}</p>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* VR Darshan Placeholder */}
            <Card className="border border-stone-200/60 dark:border-neutral-800 bg-gradient-to-br from-neutral-900 to-amber-950 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-neutral-950/40 mix-blend-multiply" />
              <CardContent className="p-6 relative z-10 space-y-4">
                <h4 className="font-serif font-bold text-lg text-gold-400">Virtual Darshan (VR)</h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  We are developing Phase 2 immersive VR experience. Soon, you will be able to access 360° virtual walking tours of this inner sanctuary.
                </p>
                <Button variant="secondary" size="sm" className="w-full text-xs" disabled>
                  Coming Soon (Phase 2)
                </Button>
              </CardContent>
            </Card>

          </div>

        </div>

      </div>
    </div>
  );
}
