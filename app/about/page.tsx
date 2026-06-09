import React from 'react';
import { Card, CardContent, Badge } from '@/components/ui';
import { Target, Eye, Sparkles, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-stone-50 dark:bg-neutral-950 py-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="gold" className="text-xs">
            Atreal Studios Present
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-white">
            About the Teertha Platform
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-500 to-amber-600 mx-auto rounded-full" />
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed pt-2">
            Teertha is a modern full-stack spiritual tourism platform designed to make pilgrimage discovery, logistics, and historical analysis accessible.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border border-stone-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-maroon-800/10 dark:bg-gold-500/10 flex items-center justify-center text-maroon-800 dark:text-gold-400">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">Our Mission</h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                To simplify the pilgrimage planning experience across India's sacred circuits by documenting authentic historical records, accurate directions, and travel instructions, ensuring a peaceful spiritual journey.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-stone-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-maroon-800/10 dark:bg-gold-500/10 flex items-center justify-center text-maroon-800 dark:text-gold-400">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">Our Vision</h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                To evolve the directory into an immersive spiritual meta-universe featuring high-fidelity Virtual Reality (VR) darshans, live streams of daily temple ceremonies, blockchain-verified donation channels, and personalized AI guidance.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Section (Atreal Studios) */}
        <section className="bg-gradient-to-br from-maroon-900 to-maroon-950 text-white rounded-2xl p-8 md:p-12 border border-gold-600/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-6 max-w-3xl">
            <Badge variant="gold" className="bg-gold-500/20 text-gold-300 border-gold-500/30">ATREAL STUDIOS</Badge>
            <h2 className="text-3xl font-serif font-bold text-white">Created by Atreal Studios</h2>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
              Atreal Studios is a premium technology and creative development studio specializing in building cutting-edge software solutions. By combining advanced web engineering (Next.js, Tailwind, Prisma) with future-proof specifications (immersive graphics, automation, AI integration), we construct apps that solve immediate user demands while building architectural runways for virtual reality and AI.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-center">
              <div className="bg-white/5 dark:bg-black/20 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-bold font-serif text-gold-400">Next.js 15</div>
                <div className="text-xs text-stone-400 mt-1">Modern Platform Foundation</div>
              </div>
              <div className="bg-white/5 dark:bg-black/20 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-bold font-serif text-gold-400">MySQL / Prisma</div>
                <div className="text-xs text-stone-400 mt-1">High-Scale Data Design</div>
              </div>
              <div className="bg-white/5 dark:bg-black/20 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-bold font-serif text-gold-400">VR Ready</div>
                <div className="text-xs text-stone-400 mt-1">Designed for Immersive Media</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">Our Core Pillars</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-neutral-900 border border-stone-200/50 dark:border-neutral-800/80 rounded-xl space-y-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h4 className="font-bold text-stone-800 dark:text-stone-200 text-sm">Authenticity</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                We cross-verify historical lore, scriptures, and geographical records to ensure our directory lists details accurately.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-neutral-900 border border-stone-200/50 dark:border-neutral-800/80 rounded-xl space-y-2">
              <Heart className="w-5 h-5 text-red-500" />
              <h4 className="font-bold text-stone-800 dark:text-stone-200 text-sm">Devotional Respect</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                We handle sacred materials, scriptures, and visuals with high respect, creating a serene ecosystem suitable for devotees.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-neutral-900 border border-stone-200/50 dark:border-neutral-800/80 rounded-xl space-y-2 sm:col-span-2 lg:col-span-1">
              <div className="text-amber-500 text-lg">💡</div>
              <h4 className="font-bold text-stone-800 dark:text-stone-200 text-sm">Accessibility</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                We strive to keep our navigation and listings lightweight, intuitive, and mobile-friendly so elderly users can navigate easily.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
