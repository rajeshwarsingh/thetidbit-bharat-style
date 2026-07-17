'use client';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from '@/lib/router';
import {
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Heart,
  ChevronRight,
  Leaf,
  Package,
  Clock,
  CreditCard,
  X,
  ZoomIn,
} from 'lucide-react';
import SEO from './SEO';
import Reveal from './Reveal';
import YouMayLike from './YouMayLike';
import MarketplaceTrustStrip from './MarketplaceTrustStrip';
import BrandTrustStrip from './BrandTrustStrip';
import { getCatalogItem } from '../data/catalog';
import { CATALOG_COLLECTION } from '../data/catalogs';
import { LOGO_URL } from '../constants';
import { cloudinaryTransform, cloudinarySrcSet } from '../utils/cloudinary';
import { contactUrl, bulkInquiryUrl, openWhatsApp } from '../utils/whatsapp';
import { useIsWished, toggleWishlist } from '../utils/wishlist';
import { SITE_URL } from '../lib/seo';
import { COLLECTION_SEO } from '../lib/seo-content';

const RECENT_KEY = 'ttb_recently_viewed';

function pushRecentlyViewed(productId: string) {
  if (typeof window === 'undefined') return;
  try {
    const prev: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    const next = [productId, ...prev.filter((id) => id !== productId)].slice(0, 8);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

const PDP_FAQS = [
  {
    q: 'What fits inside?',
    a: 'Phone, wallet, keys, compact pouch, lipstick — sized for everyday Indian carry without bulk.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders ship in 24–48 hours with free delivery across India, typically arriving in 3–6 days.',
  },
  {
    q: 'How do I care for jute?',
    a: 'Spot clean with a damp cloth. Avoid soaking. Air dry in shade. Keep away from prolonged moisture.',
  },
  {
    q: 'Is payment secure?',
    a: 'Yes — pay online via UPI, cards, or wallets. You can also complete your order on WhatsApp at checkout.',
  },
];

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const item = productId ? getCatalogItem(productId) : null;
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const wished = useIsWished(item?.key ?? '');

  useEffect(() => {
    if (item?.productId) pushRecentlyViewed(item.productId);
  }, [item?.productId]);

  if (!item) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-stone-500 dark:text-stone-400">
        Product not found.
      </div>
    );
  }

  const p = item.product;
  const displayTitle = p.displayName || p.name;
  const aboutCopy =
    p.description ||
    `Handcrafted by skilled artisans in India, the ${displayTitle} blends natural jute with thoughtful detailing — lightweight, roomy enough for your daily essentials, and made to last.`;
  const images = item.images.length ? item.images : [item.image];
  const checkoutHref = `/checkout?product=${p.id}`;
  const ask = () =>
    openWhatsApp(contactUrl(`I have a question about the ${displayTitle}.`), 'whatsapp_contact_click', {
      placement: 'pdp',
    });
  const bulk = () => openWhatsApp(bulkInquiryUrl(displayTitle), 'whatsapp_bulk_click', { placement: 'pdp' });
  const collectionId = CATALOG_COLLECTION[p.id];
  const collectionLabel = collectionId ? COLLECTION_SEO[collectionId]?.label : undefined;
  const savings = p.mrp > p.price ? p.mrp - p.price : 0;

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: p.name,
    image: images,
    description: aboutCopy,
    sku: p.id,
    brand: { '@type': 'Brand', name: 'TheTidbit', logo: LOGO_URL },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}${item.url}`,
      priceCurrency: 'INR',
      price: p.price,
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'TheTidbit' },
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/collections` },
      ...(collectionId
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: collectionLabel || collectionId,
              item: `${SITE_URL}/collections?filter=${collectionId}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: collectionId ? 4 : 3,
        name: displayTitle,
        item: `${SITE_URL}${item.url}`,
      },
    ],
  };

  const specs = [
    { k: 'Material', v: p.material },
    { k: 'Dimensions', v: p.dimensions },
    { k: 'Weight', v: p.weight },
    { k: 'Capacity', v: 'Daily essentials — phone, wallet, keys, small pouch' },
    { k: 'Country of Origin', v: p.origin },
  ].filter((s) => s.v);

  return (
    <>
      <SEO schema={[productSchema, breadcrumbSchema]} />

      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-sm text-stone-500 dark:text-stone-400 flex items-center gap-1.5"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-brand-green">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link to="/collections" className="hover:text-brand-green">
          Shop
        </Link>
        {collectionId && (
          <>
            <ChevronRight size={14} />
            <Link to={`/collections?filter=${collectionId}`} className="hover:text-brand-green">
              {collectionLabel || collectionId}
            </Link>
          </>
        )}
        <ChevronRight size={14} />
        <span className="text-stone-700 dark:text-stone-300 truncate">{displayTitle}</span>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-2 gap-10 pb-28 sm:pb-8">
        <div>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-800">
            <button
              type="button"
              onClick={() => setZoomed(true)}
              className="absolute inset-0 w-full h-full group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset"
              aria-label={`Zoom ${displayTitle} image`}
            >
              <img
                src={cloudinaryTransform(images[active], { w: 1000 })}
                srcSet={cloudinarySrcSet(images[active], [600, 900, 1200])}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt={displayTitle}
                width={1000}
                height={1000}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                decoding="async"
                fetchPriority={active === 0 ? 'high' : 'auto'}
              />
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-white/90 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 text-xs font-semibold px-2.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <ZoomIn size={14} /> Zoom
              </span>
            </button>
            {item.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none">
                {item.discountPercentage}% OFF
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(item.key)}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/90 dark:bg-stone-900/80 flex items-center justify-center shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              <Heart size={20} className={wished ? 'fill-red-500 text-red-500' : 'text-stone-600 dark:text-stone-300'} />
            </button>
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`h-20 w-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-colors ${
                    i === active ? 'border-brand-green' : 'border-transparent'
                  }`}
                  aria-label={`View image ${i + 1} of ${displayTitle}`}
                >
                  <img
                    src={cloudinaryTransform(img, { w: 160 })}
                    alt={`${displayTitle} — view ${i + 1}`}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <Reveal>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-green mb-2">
              <Leaf size={13} /> Handmade · In Stock
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
              {displayTitle}
            </h1>
            <p className="mt-2 text-stone-600 dark:text-stone-400">{p.tagline}</p>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">₹{p.price}</span>
              {p.mrp > p.price && <span className="text-lg text-stone-400 line-through">₹{p.mrp}</span>}
              {savings > 0 && (
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  You save ₹{savings}
                  {item.discountPercentage > 0 ? ` (${item.discountPercentage}% off)` : ''}
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Inclusive of all taxes · Free shipping</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to={checkoutHref}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold py-3.5 rounded-2xl hover:bg-brand-green dark:hover:bg-brand-green dark:hover:text-white transition-colors"
              >
                <ShoppingBag size={18} /> Buy Now
              </Link>
              <button
                type="button"
                onClick={ask}
                className="sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 font-bold px-5 py-3.5 rounded-2xl hover:border-brand-green transition-colors"
              >
                <MessageCircle size={18} /> Ask on WhatsApp
              </button>
            </div>
            <p className="mt-2.5 text-xs text-stone-500 dark:text-stone-400 inline-flex items-center gap-1.5">
              <CreditCard size={13} className="text-brand-green" /> Pay online securely
              <span className="mx-1">·</span>
              <MessageCircle size={13} className="text-brand-green" /> or order on WhatsApp — choose at checkout
            </p>

            <MarketplaceTrustStrip className="mt-4" />

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: Truck, k: 'Free Shipping', v: 'Across India' },
                { icon: ShieldCheck, k: 'Secure Payment', v: 'UPI · Cards · Wallets' },
                { icon: Heart, k: 'Handmade', v: 'Crafted in India' },
                { icon: Clock, k: 'Fast Dispatch', v: 'Ships in 24–48 hrs' },
              ].map((f) => (
                <div
                  key={f.k}
                  className="flex items-start gap-2.5 rounded-2xl border border-stone-100 dark:border-stone-700 p-3"
                >
                  <f.icon size={18} className="text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">{f.k}</div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">{f.v}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={bulk}
              className="mt-4 w-full flex items-center justify-between gap-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 px-4 py-3 text-left hover:border-brand-green transition-colors"
            >
              <span className="flex items-center gap-2.5 text-sm text-stone-600 dark:text-stone-300">
                <Package size={18} className="text-brand-green" /> Buying in bulk or for gifting? Get a wholesale
                quote
              </span>
              <ChevronRight size={16} className="text-stone-400" />
            </button>
          </Reveal>
        </div>
      </section>

      <BrandTrustStrip dense />

      <section className="bg-stone-50 dark:bg-stone-950 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">About this bag</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">{aboutCopy}</p>
            <ul className="list-disc pl-5 space-y-2 text-stone-600 dark:text-stone-400">
              {p.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">
              Looking for more? Browse our{' '}
              <Link to="/collections" className="text-brand-green font-semibold underline underline-offset-2">
                handmade bag collections
              </Link>
              {collectionId && (
                <>
                  {' '}
                  or the{' '}
                  <Link
                    to={`/collections?filter=${collectionId}`}
                    className="text-brand-green font-semibold underline underline-offset-2"
                  >
                    {collectionLabel}
                  </Link>
                </>
              )}
              .
            </p>
          </div>

          {specs.length > 0 && (
            <div className="rounded-2xl bg-white dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700 p-6">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4 font-serif text-lg">Specifications</h3>
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                {specs.map((s) => (
                  <div key={s.k}>
                    <dt className="text-sm text-stone-500 dark:text-stone-400">{s.k}</dt>
                    <dd className="mt-0.5 text-sm font-medium text-stone-900 dark:text-stone-100">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="rounded-2xl bg-white dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700 p-6">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2 font-serif text-lg">Care instructions</h3>
            <ul className="text-sm text-stone-600 dark:text-stone-400 space-y-1.5">
              <li>• Spot clean with a soft damp cloth — do not machine wash or soak.</li>
              <li>• Air dry in shade; avoid direct harsh sun for long periods.</li>
              <li>• Store in a dry place; natural jute prefers low humidity.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700 p-6">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2 font-serif text-lg">Shipping</h3>
            <ul className="text-sm text-stone-600 dark:text-stone-400 space-y-1.5">
              <li>• Free shipping on all orders across India.</li>
              <li>• Dispatched in 24–48 hours; delivered in 3–6 days across India.</li>
              <li>• Need help? Message us anytime on WhatsApp.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">Product FAQs</h3>
            <div className="space-y-2">
              {PDP_FAQS.map((faq) => (
                <details key={faq.q} className="group border-b border-stone-200 dark:border-stone-700 py-3">
                  <summary className="cursor-pointer font-semibold text-stone-900 dark:text-stone-100 list-none flex justify-between gap-3">
                    <span>{faq.q}</span>
                    <span className="text-brand-green group-open:rotate-45 transition-transform text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <YouMayLike excludeProductId={p.id} title="You may also like" />
      <RecentlyViewed excludeProductId={p.id} />

      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Product image zoom"
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close zoom"
            onClick={() => setZoomed(false)}
          >
            <X size={24} />
          </button>
          <img
            src={cloudinaryTransform(images[active], { w: 1600 })}
            alt={displayTitle}
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur border-t border-stone-200 dark:border-stone-700 p-3 flex items-center gap-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="shrink-0">
          <div className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 leading-none">₹{p.price}</div>
          {p.mrp > p.price && <div className="text-xs text-stone-400 line-through">₹{p.mrp}</div>}
        </div>
        <Link
          to={checkoutHref}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold py-3 rounded-xl"
        >
          <ShoppingBag size={18} /> Buy Now
        </Link>
      </div>
    </>
  );
};

const RecentlyViewed: React.FC<{ excludeProductId: string }> = ({ excludeProductId }) => {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const prev: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
      setIds(prev.filter((id) => id !== excludeProductId).slice(0, 4));
    } catch {
      setIds([]);
    }
  }, [excludeProductId]);

  const items = ids.map((id) => getCatalogItem(id)).filter(Boolean);
  if (items.length === 0) return null;

  return (
    <section className="py-12 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">Recently viewed</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map((it) =>
            it ? (
              <Link key={it.key} to={it.url} className="group block">
                <div className="aspect-square overflow-hidden bg-stone-100 dark:bg-stone-800 mb-2">
                  <img
                    src={cloudinaryTransform(it.image, { w: 400, h: 400, c: 'fill' })}
                    alt={it.product.displayName || it.shortName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 line-clamp-2">{it.shortName}</p>
                <p className="text-sm font-bold text-stone-700 dark:text-stone-300 mt-0.5">₹{it.price}</p>
              </Link>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
