import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Card, CardContent, Badge, Button } from '@/components/ui';
import { ArrowLeft, BookOpen, Calendar, Clock, Landmark, MapPin, Shield } from 'lucide-react';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TempleDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const temple = await db.temple.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!temple) {
    notFound();
  }

  const mockGallery = [
    temple.thumbnail,
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600',
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Link href="/temples" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 transition-colors hover:text-amber-600">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to directory</span>
        </Link>

        <div className="relative h-[350px] overflow-hidden rounded-lg border border-gold-600/30 shadow-xl sm:h-[450px]">
          <Image src={temple.thumbnail} alt={temple.name} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 z-10 space-y-3 p-6 text-white sm:p-10">
            <div className="flex flex-wrap gap-2">
              <Badge variant="gold" className="bg-gold-500 font-bold text-maroon-950">{temple.category.name}</Badge>
              <Badge variant="success" className="bg-green-600 font-bold text-white">{temple.status}</Badge>
            </div>
            <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">{temple.name}</h1>
            <div className="flex items-center gap-2 text-sm text-stone-300">
              <MapPin className="h-4 w-4 flex-shrink-0 text-amber-500" />
              <span>{temple.location}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="border border-stone-200/60 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-2 text-maroon-800 dark:border-neutral-800/40 dark:text-gold-400">
                  <BookOpen className="h-5 w-5" />
                  <h2 className="font-serif text-xl font-bold uppercase tracking-wider">Historical & Spiritual Significance</h2>
                </div>
                <p className="whitespace-pre-line text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">{temple.description}</p>
              </div>
            </Card>

            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-stone-900 dark:text-white">Visual Gallery</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {mockGallery.map((img, idx) => (
                  <div key={idx} className="relative h-40 overflow-hidden rounded-lg border border-stone-200/60 bg-neutral-200 dark:border-neutral-800">
                    <Image
                      src={img}
                      alt={`${temple.name} view ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 20vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border border-stone-200/60 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="border-b border-gold-600/30 bg-gradient-to-r from-maroon-900 to-maroon-950 p-6 font-serif text-lg font-bold text-white">
                Quick Facts & Guide
              </div>
              <CardContent className="space-y-4 p-6 text-sm">
                <GuideItem icon={<Clock className="h-4 w-4" />} label="Timings" value="04:00 AM - 09:00 PM" />
                <GuideItem icon={<Calendar className="h-4 w-4" />} label="Best Time to Visit" value="September to March" />
                <GuideItem icon={<Shield className="h-4 w-4" />} label="Entry Rules" value="Traditional attire requested. Photography restriction applies inside the inner sanctum." />

                <div className="flex items-start gap-3 border-t border-stone-100 pt-3 dark:border-neutral-800/40">
                  <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                    <Landmark className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 dark:text-stone-200">Circuit</h4>
                    <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">{temple.category.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border border-stone-200/60 bg-gradient-to-br from-neutral-900 to-amber-950 text-white dark:border-neutral-800">
              <div className="absolute inset-0 bg-neutral-950/40 mix-blend-multiply" />
              <CardContent className="relative z-10 space-y-4 p-6">
                <h4 className="font-serif text-lg font-bold text-gold-400">Virtual Darshan (VR)</h4>
                <p className="text-xs leading-relaxed text-stone-300">
                  We are developing Phase 2 immersive VR experience. Soon, you will be able to access 360-degree virtual walking tours of this inner sanctuary.
                </p>
                <Button variant="secondary" size="sm" className="w-full text-xs" disabled>Coming Soon (Phase 2)</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuideItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-stone-100 p-2 text-stone-600 dark:bg-neutral-800 dark:text-stone-300">{icon}</div>
      <div>
        <h4 className="font-semibold text-stone-800 dark:text-stone-200">{label}</h4>
        <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">{value}</p>
      </div>
    </div>
  );
}
