'use client';
import React, { useMemo } from 'react';
import { Link } from '@/lib/router';
import { Heart, ArrowRight } from 'lucide-react';
import SEO from './SEO';
import Reveal from './Reveal';
import CatalogProductCard from './CatalogProductCard';
import { useWishlist } from '../utils/wishlist';
import { getCatalogItem } from '../data/catalog';
import { CatalogItem } from '../types';

const WishlistPage: React.FC = () => {
  const keys = useWishlist();

  const items = useMemo(() => {
    return keys
      .map((k) => {
        const [productId, colorId] = k.split(':');
        return getCatalogItem(productId, colorId);
      })
      .filter((x): x is CatalogItem => x !== null);
  }, [keys]);

  return (
    <>
      <SEO
        title="Your Wishlist"
        description="Bags you've saved on TheTidbit."
        canonicalUrl="https://thetidbit.in/wishlist"
        noindex
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-red-500 fill-red-500" size={26} />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">Your Wishlist</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 mb-5">
              <Heart size={28} />
            </div>
            <p className="text-stone-600 dark:text-stone-400 mb-6">Nothing saved yet. Tap the heart on any bag to save it here.</p>
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold px-8 py-3.5 rounded-full hover:bg-brand-green dark:hover:bg-brand-green dark:hover:text-white transition-colors"
            >
              Browse the collection <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((item, i) => (
              <Reveal key={item.key} delayMs={(i % 4) * 60}>
                <CatalogProductCard item={item} showCollection />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default WishlistPage;