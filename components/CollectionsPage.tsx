'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, Link } from '@/lib/router';
import { Search, X, Sparkles, Package } from 'lucide-react';
import SEO from './SEO';
import Reveal from './Reveal';
import CatalogProductCard from './CatalogProductCard';
import { getAllCatalogItems, COLLECTIONS } from '../data/catalog';
import { CatalogItem, CollectionTag } from '../types';
import { bulkInquiryUrl, openWhatsApp } from '../utils/whatsapp';

type FilterId = 'all' | CollectionTag;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  ...COLLECTIONS.map((c) => ({ id: c.id as FilterId, label: c.label.replace(' Collection', '') })),
];

const PAGE_SIZE = 12;

const CollectionsPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const filter = (params.get('filter') as FilterId) || 'all';
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const allItems = useMemo(() => getAllCatalogItems(), []);

  const filtered = useMemo(() => {
    let items: CatalogItem[] = allItems;
    if (filter !== 'all') items = items.filter((i) => i.collection === filter);

    const q = query.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (i) =>
          i.shortName.toLowerCase().includes(q) ||
          i.color.name.toLowerCase().includes(q) ||
          i.collection.toLowerCase().includes(q) ||
          i.category.join(' ').toLowerCase().includes(q)
      );
    }
    return items;
  }, [allItems, filter, query]);

  // Reset paging when the filter/search changes.
  useEffect(() => setVisible(PAGE_SIZE), [filter, query]);

  // Infinite loading.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setVisible((v) => Math.min(v + PAGE_SIZE, filtered.length));
      },
      { rootMargin: '400px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [filtered.length]);

  const setFilter = (id: FilterId) => {
    const next = new URLSearchParams(params);
    if (id === 'all') next.delete('filter');
    else next.set('filter', id);
    setParams(next, { replace: true });
  };

  const shown = filtered.slice(0, visible);

  return (
    <>
      <SEO
        title="Collections — Signature & Made-on-Demand Bags"
        description="Browse TheTidbit's full range of handmade jute bags. Shop the ready-to-ship Signature Collection or request a quote for made-on-demand, bulk and corporate orders."
        canonicalUrl="https://thetidbit.in/collections"
      />

      {/* Page header */}
      <section className="bg-jute-100 dark:bg-stone-950 py-12 sm:py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-green mb-3">
              <Sparkles size={14} /> The Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100">
              Find your everyday bag
            </h1>
            <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
              In-stock handmade jute bags — free shipping over ₹499, Cash on Delivery & easy returns.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sticky controls */}
      <div className="sticky top-[92px] sm:top-[100px] z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur border-b border-stone-200 dark:border-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bags, colours, styles…"
              aria-label="Search products"
              className="w-full pl-10 pr-9 py-2.5 rounded-full border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:justify-center scrollbar-none">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                  filter === f.id
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-brand-green'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bulk cross-sell (retail catalog; bulk lives on its own page) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Package className="text-brand-green shrink-0 mt-0.5" size={22} />
            <p className="text-sm text-stone-600 dark:text-stone-300">
              <strong className="text-stone-900 dark:text-stone-100">In stock & ready to ship.</strong> Buy online via PhonePe or order on
              WhatsApp (COD). Need bags in bulk for corporate gifting or reselling?
            </p>
          </div>
          <Link
            to="/bulk"
            className="shrink-0 bg-brand-green text-white font-bold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity text-center"
          >
            Bulk Orders
          </Link>
        </div>
      </div>

      {/* Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </p>
          {shown.length === 0 ? (
            <div className="text-center py-20 text-stone-500 dark:text-stone-400">
              No products match your search.
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {shown.map((item, i) => (
                <Reveal key={item.key} delayMs={(i % 4) * 60}>
                  <CatalogProductCard item={item} showCollection={filter === 'all'} />
                </Reveal>
              ))}
            </div>
          )}
          <div ref={sentinelRef} className="h-10" />
          {visible < filtered.length && (
            <div className="text-center mt-4">
              <button
                onClick={() => setVisible((v) => Math.min(v + PAGE_SIZE, filtered.length))}
                className="inline-flex items-center gap-2 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 font-semibold px-6 py-3 rounded-full hover:border-brand-green transition-colors"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bulk CTA footer */}
      <section className="bg-stone-900 dark:bg-stone-950 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">Need bags in bulk?</h2>
          <p className="mt-3 text-stone-300">Corporate gifting, weddings & resellers — custom branding available.</p>
          <Link
            to="/bulk"
            className="inline-block mt-6 bg-white text-stone-900 font-bold px-8 py-3 rounded-full hover:bg-jute-100 transition-colors"
          >
            Explore Bulk Orders
          </Link>
        </div>
      </section>
    </>
  );
};

export default CollectionsPage;