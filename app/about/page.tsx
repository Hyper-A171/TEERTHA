import React from 'react';
import { Card, CardContent, Badge } from '@/components/ui';
import { Eye, Heart, Lightbulb, Sparkles, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-16 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl space-y-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <Badge variant="gold" className="text-xs">Atreal Studios Present</Badge>
          <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-white sm:text-5xl">About the Teertha Platform</h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-gold-500 to-amber-600" />
          <p className="pt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:text-base">
            Teertha is a modern full-stack spiritual tourism platform designed to make pilgrimage discovery, logistics, and historical analysis accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="border border-stone-200 bg-white/60 dark:border-neutral-800 dark:bg-neutral-900/50">
            <CardContent className="space-y-4 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-maroon-800/10 text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">Our Mission</h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                To simplify pilgrimage planning across India's sacred circuits by documenting historical records, accurate directions, and travel instructions for a peaceful spiritual journey.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-stone-200 bg-white/60 dark:border-neutral-800 dark:bg-neutral-900/50">
            <CardContent className="space-y-4 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-maroon-800/10 text-maroon-800 dark:bg-gold-500/10 dark:text-gold-400">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">Our Vision</h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                To evolve the directory into an immersive spiritual platform featuring VR darshans, live ceremony streams, verified donation channels, and personalized AI guidance.
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="relative overflow-hidden rounded-lg border border-gold-600/30 bg-gradient-to-br from-maroon-900 to-maroon-950 p-8 text-white shadow-xl md:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />
          <div className="relative z-10 max-w-3xl space-y-6">
            <Badge variant="gold" className="border-gold-500/30 bg-gold-500/20 text-gold-300">Atreal Studios</Badge>
            <h2 className="font-serif text-3xl font-bold text-white">Created by Atreal Studios</h2>
            <p className="text-sm leading-relaxed text-stone-200 sm:text-base">
              Atreal Studios is a technology and creative development studio building web platforms with strong product design, scalable databases, and future-ready integrations.
            </p>

            <div className="grid grid-cols-1 gap-6 pt-4 text-center sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 dark:bg-black/20">
                <div className="font-serif text-2xl font-bold text-gold-400">Next.js 15</div>
                <div className="mt-1 text-xs text-stone-400">Modern Platform Foundation</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 dark:bg-black/20">
                <div className="font-serif text-2xl font-bold text-gold-400">MySQL / Prisma</div>
                <div className="mt-1 text-xs text-stone-400">High-Scale Data Design</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 dark:bg-black/20">
                <div className="font-serif text-2xl font-bold text-gold-400">VR Ready</div>
                <div className="mt-1 text-xs text-stone-400">Designed for Immersive Media</div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">Our Core Pillars</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2 rounded-lg border border-stone-200/50 bg-white p-6 dark:border-neutral-800/80 dark:bg-neutral-900">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200">Authenticity</h4>
              <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">We cross-verify lore, scriptures, and geographical records so the directory stays accurate.</p>
            </div>

            <div className="space-y-2 rounded-lg border border-stone-200/50 bg-white p-6 dark:border-neutral-800/80 dark:bg-neutral-900">
              <Heart className="h-5 w-5 text-red-500" />
              <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200">Devotional Respect</h4>
              <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">We handle sacred materials and visuals with care, creating a serene ecosystem for devotees.</p>
            </div>

            <div className="space-y-2 rounded-lg border border-stone-200/50 bg-white p-6 dark:border-neutral-800/80 dark:bg-neutral-900 sm:col-span-2 lg:col-span-1">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200">Accessibility</h4>
              <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">We keep navigation and listings lightweight, intuitive, and mobile-friendly for every pilgrim.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
