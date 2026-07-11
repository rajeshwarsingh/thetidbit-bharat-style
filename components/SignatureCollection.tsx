'use client';
import React from 'react';
import { Link } from '@/lib/router';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getAllCatalogItems } from '../data/catalog';
import CatalogProductCard from './CatalogProductCard';
import Reveal from './Reveal';

interface Props {
  /** How many catalog items to show (defaults to all). */
  limit?: number;
  /** Show the "Explore all collections" footer CTA. */
  showCta?: boolean;
}

/**
 * Homepage catalog showcase. In the bulk / made-to-order model this displays
 * the full standalone catalog (data/catalogs.ts) with a Request Quote flow.
 */
const SignatureCollection: React.FC<Props> = ({ limit, showCta = true }) => {
  const items = limit ? getAllCatalogItems().slice(0, limit) : getAllCatalogItems();
  if (items.length === 0) return null;

  return (
    <section id="collection" className="bg-jute-100 dark:bg-stone-950 py-16 sm:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-green mb-4">
            <Sparkles size={14} /> Our Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
            Handcrafted jute bags for every day
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400 text-base sm:text-lg">
            Shop our bestselling handmade bags — in stock and ready to ship. Free shipping over ₹499, Cash on Delivery & easy returns.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, i) => (
            <Reveal key={item.key} delayMs={(i % 4) * 80}>
              <CatalogProductCard item={item} />
            </Reveal>
          ))}
        </div>

        {showCta && (
          <Reveal className="text-center mt-12">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold px-8 py-3.5 rounded-full hover:bg-brand-green dark:hover:bg-brand-green dark:hover:text-white transition-colors"
            >
              View full collection <ArrowRight size={18} />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default SignatureCollection;
