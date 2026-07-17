'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, Link } from '@/lib/router';
import { Search, X, Sparkles } from 'lucide-react';
import SEO from './SEO';
import Reveal from './Reveal';
import CatalogProductCard from './CatalogProductCard';
import { getAllCatalogItems, COLLECTIONS } from '../data/catalog';
import { CatalogItem, CollectionTag } from '../types';
import { SITE_URL } from '../lib/seo';
import { COLLECTION_SEO, COLLECTIONS_META, collectionPageJsonLd } from '../lib/seo-content';

type FilterId = 'all' | CollectionTag;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  ...COLLECTIONS.map((c) => ({ id: c.id as FilterId, label: c.label.replace(' Collection', '') })),
];

const PAGE_SIZE = 12;

const CollectionsPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const filter = (params.get('filter') as FilterId) || 'all';
  const urlQuery = params.get('q') || '';
  const [query, setQuery] = useState(urlQuery);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const allItems = useMemo(() => getAllCatalogItems(), []);

  const filtered = useMemo(() => {
    let items: CatalogItem[] = allItems;
    if (filter !== 'all') items = items.filter((i) => i.collection === filter);

    const q = query.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.shortName.toLowerCase().includes(q) ||
          (i.product.displayName || '').toLowerCase().includes(q) ||
          i.color.name.toLowerCase().includes(q) ||
          i.collection.toLowerCase().includes(q) ||
          i.category.join(' ').toLowerCase().includes(q) ||
          (i.product.tagline || '').toLowerCase().includes(q)
      );
    }
    return items;
  }, [allItems, filter, query]);

  useEffect(() => setVisible(PAGE_SIZE), [filter, query]);

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

  const commitSearch = (value: string) => {
    setQuery(value);
    const next = new URLSearchParams(params);
    if (value.trim()) next.set('q', value.trim());
    else next.delete('q');
    setParams(next, { replace: true });
  };

  const shown = filtered.slice(0, visible);
  const seoBlock = filter !== 'all' ? COLLECTION_SEO[filter] : null;
  const pageTitle = seoBlock ? seoBlock.h1Hint : 'Handmade bags for every day';
  const pageDescription = seoBlock ? seoBlock.description : COLLECTIONS_META.description;
  const collectionSchema = collectionPageJsonLd({
    name: seoBlock ? seoBlock.label : COLLECTIONS_META.title,
    description: pageDescription,
    url:
      filter !== 'all'
        ? `${SITE_URL}/collections?filter=${filter}`
        : `${SITE_URL}/collections`,
    products: filtered.map((i) => ({
      name: i.product.displayName || i.name,
      url: i.url,
      image: i.image,
    })),
  });

  return (
    <>
      <SEO schema={collectionSchema} />

      <section className="bg-jute-100 dark:bg-stone-950 border-b border-stone-200/80 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-green">
                <Sparkles size={12} /> The Collection
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                {pageTitle}
              </h1>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xl sm:text-right leading-snug">
              {pageDescription}
            </p>
          </div>
        </div>
      </section>

      <div className="sticky top-[92px] sm:top-[100px] z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur border-b border-stone-200 dark:border-stone-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
            <div className="relative w-full lg:w-56 lg:shrink-0">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => commitSearch(query)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') commitSearch(query);
                }}
                placeholder="Search bags…"
                aria-label="Search products"
                className="w-full pl-9 pr-8 py-2 rounded-full border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
              {query && (
                <button
                  onClick={() => commitSearch('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-0.5 -mx-1 px-1 lg:flex-1 scrollbar-none">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors border shrink-0 ${
                    filter === f.id
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
                      : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-brand-green'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3 shrink-0 text-xs text-stone-500 dark:text-stone-400">
              <span>{filtered.length} {filtered.length === 1 ? 'bag' : 'bags'}</span>
              <span aria-hidden="true">·</span>
              <Link to="/bulk" className="font-semibold text-brand-green hover:underline whitespace-nowrap">
                Bulk orders
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pt-5 sm:pb-10">
        <div className="flex items-center justify-between gap-3 mb-4 lg:hidden">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {filtered.length} {filtered.length === 1 ? 'bag' : 'bags'}
            {query.trim() ? ` for “${query.trim()}”` : ''}
          </p>
          <Link to="/bulk" className="text-xs font-semibold text-brand-green hover:underline whitespace-nowrap">
            Bulk orders
          </Link>
        </div>

        {shown.length === 0 ? (
          <p className="text-center text-stone-500 py-12">No bags match that search. Try another colour or style.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {shown.map((item, i) =>
              i < 4 ? (
                <CatalogProductCard key={item.key} item={item} />
              ) : (
                <Reveal key={item.key} delayMs={(i % 4) * 50}>
                  <CatalogProductCard item={item} />
                </Reveal>
              )
            )}
          </div>
        )}
        <div ref={sentinelRef} className="h-6" />
      </section>

      <section className="bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">Buying guides</h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              Learn how to choose handmade jute bags, style sling bags, and shop sustainable handbags in India.
            </p>
            <Link to="/stories" className="inline-flex mt-3 text-sm font-bold text-brand-green hover:underline">
              Read stories
            </Link>
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">Our craft</h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              TheTidbit is an Indian D2C brand making premium eco-friendly handbags with artisans.
            </p>
            <Link to="/about" className="inline-flex mt-3 text-sm font-bold text-brand-green hover:underline">
              About TheTidbit
            </Link>
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">Corporate gifting</h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              Need bulk handmade bags for teams, weddings or brand merch? Request a wholesale quote.
            </p>
            <Link to="/bulk" className="inline-flex mt-3 text-sm font-bold text-brand-green hover:underline">
              Bulk orders
            </Link>
          </div>
        </div>
      </section>

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
