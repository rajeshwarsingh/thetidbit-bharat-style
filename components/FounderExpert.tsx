'use client';
import React from 'react';
import { Quote, Heart } from 'lucide-react';
import { FOUNDER } from '../constants';
import { cloudinaryTransform } from '../utils/cloudinary';

const FounderExpert: React.FC = () => {
  const imageUrl = cloudinaryTransform(FOUNDER.image, { w: 560, h: 560, c: 'fill' });

  return (
    <section
      id="founder"
      className="py-16 sm:py-20 bg-white dark:bg-stone-900 border-y border-stone-200 dark:border-stone-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-stone-200 dark:border-stone-700/50 shadow-lg dark:shadow-stone-900/50 bg-stone-50 dark:bg-stone-800/50 dark:backdrop-blur-sm transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Founder image - explicit aspect ratio so the image area always has height */}
            <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] aspect-[4/5] lg:aspect-auto">
              <img
                src={FOUNDER.image}
                srcSet={`${cloudinaryTransform(FOUNDER.image, { w: 400, c: 'fill' })} 400w, ${cloudinaryTransform(FOUNDER.image, { w: 560, c: 'fill' })} 560w`}
                sizes="(max-width: 1023px) 100vw, 42vw"
                alt={FOUNDER.name}
                className="absolute inset-0 w-full h-full object-cover object-center rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none bg-stone-200 dark:bg-stone-700"
              />
              <div className="absolute bottom-4 left-4 right-4 lg:left-4 lg:right-auto lg:bottom-6 flex items-center gap-2 bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm border border-stone-200 dark:border-stone-700 rounded-xl px-4 py-3 w-fit shadow-md">
                <Heart className="w-5 h-5 text-brand-green dark:text-brand-green/80 flex-shrink-0" aria-hidden />
                <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">Thank you for being here</span>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              <div className="flex items-center gap-2 text-brand-green dark:text-brand-green/80 mb-4">
                <Quote className="w-6 h-6" aria-hidden />
                <span className="text-xs font-bold tracking-widest uppercase text-stone-600 dark:text-stone-400">
                  A note from our founder
                </span>
              </div>

              <blockquote className="text-xl sm:text-2xl font-serif text-stone-800 dark:text-stone-100 leading-relaxed">
                "{FOUNDER.quote}"
              </blockquote>

              <footer className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={imageUrl}
                    alt=""
                    className="w-14 h-14 rounded-full object-cover object-center border-2 border-stone-200 dark:border-stone-600 ring-2 ring-white dark:ring-stone-800 shadow-md"
                  />
                  <div>
                    <p className="font-bold text-stone-900 dark:text-stone-100">{FOUNDER.name}</p>
                    <p className="text-sm text-brand-green dark:text-brand-green/80 font-semibold">{FOUNDER.title}</p>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderExpert;