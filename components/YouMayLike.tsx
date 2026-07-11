'use client';
import React from 'react';
import { getRelatedItems } from '../data/catalog';
import CatalogProductCard from './CatalogProductCard';
import Reveal from './Reveal';

interface Props {
  /** Hide items belonging to this base product. */
  excludeProductId?: string;
  title?: string;
  limit?: number;
}

/**
 * "You may also like" — always surfaces Signature (in-stock) items to keep
 * customers inside the hero collection. Safe/additive; used on product pages.
 */
const YouMayLike: React.FC<Props> = ({ excludeProductId, title = 'You may also like', limit = 4 }) => {
  const items = getRelatedItems(excludeProductId, limit);

  if (items.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">{title}</h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">Handcrafted, made to order</p>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, i) => (
            <Reveal key={item.key} delayMs={(i % 4) * 60}>
              <CatalogProductCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouMayLike;