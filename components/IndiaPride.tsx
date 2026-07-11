'use client';
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '@/lib/router';

const IndiaPride: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 border-y border-stone-200 dark:border-stone-800/50 bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-stone-200 dark:border-stone-700/50 shadow-sm dark:shadow-stone-900/50 bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Flag panel (prominent, premium) */}
            <div className="lg:col-span-5 relative overflow-hidden">
              <div aria-hidden="true" className="absolute inset-0">
                <div className="h-full w-full grid grid-rows-3">
                  <div className="bg-[#FF9933]" />
                  <div className="bg-white" />
                  <div className="bg-[#138808]" />
                </div>
                {/* Soft vignette for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/10" />
              </div>

              {/* Ashoka Chakra */}
              <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                <svg width="220" height="220" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#000080" strokeWidth="6" />
                  <circle cx="100" cy="100" r="6" fill="#000080" />
                  {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i * 360) / 24;
                    return (
                      <line
                        key={i}
                        x1="100"
                        y1="100"
                        x2="100"
                        y2="30"
                        stroke="#000080"
                        strokeWidth="3"
                        transform={`rotate(${angle} 100 100)`}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Badge */}
              <div className="relative p-10 sm:p-12 h-full flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm border border-stone-200 dark:border-stone-700 rounded-2xl px-4 py-3 w-fit shadow-sm">
                  <span className="text-xs font-bold tracking-widest uppercase text-stone-800 dark:text-stone-200">
                    Made in India
                  </span>
                  <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    • Artisan-made
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 relative p-10 sm:p-14">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-full px-3 py-1">
                  <Sparkles size={14} className="text-brand-green dark:text-brand-green/80" />
                  Authentic Indian craft
                </span>
                <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                  Handmade • Sustainable • Artisan-first
                </span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Proudly Indian. Truly handcrafted.
              </h2>
              <p className="mt-4 text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
                We work with Indian artisans to create jute bags that feel premium, last long, and support real livelihoods.
                Every stitch carries a story — not mass production.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/story"
                  onClick={() => {
                    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                      window.gtag('event', 'made_in_india_click', { placement: 'india_pride', target: 'story' });
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-stone-800 dark:hover:bg-stone-200 transition shadow-md"
                >
                  Meet the Makers <ArrowRight size={18} />
                </Link>
                <Link
                  to="/about"
                  onClick={() => {
                    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                      window.gtag('event', 'made_in_india_click', { placement: 'india_pride', target: 'about' });
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-6 py-3 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-700 transition"
                >
                  About TheTidbit
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 rounded-xl p-4">
                  <p className="font-bold text-stone-900 dark:text-stone-100">Authentic craft</p>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">Hand embroidery + careful finishing.</p>
                </div>
                <div className="bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 rounded-xl p-4">
                  <p className="font-bold text-stone-900 dark:text-stone-100">Natural jute</p>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">Earthy texture, eco-friendly feel.</p>
                </div>
                <div className="bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 rounded-xl p-4">
                  <p className="font-bold text-stone-900 dark:text-stone-100">Everyday-ready</p>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">Lightweight, strong, and stylish.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndiaPride;