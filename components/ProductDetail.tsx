'use client';
import React, { useState } from 'react';
import { useParams, Link } from '@/lib/router';
import {
  ShoppingBag, MessageCircle, Truck, ShieldCheck, RefreshCcw, Heart, ChevronRight, Star, Leaf, Package, Clock, CreditCard,
} from 'lucide-react';
import SEO from './SEO';
import Reveal from './Reveal';
import YouMayLike from './YouMayLike';
import { getCatalogItem } from '../data/catalog';
import { LOGO_URL } from '../constants';
import { cloudinaryTransform, cloudinarySrcSet } from '../utils/cloudinary';
import { contactUrl, bulkInquiryUrl, openWhatsApp } from '../utils/whatsapp';
import { useIsWished, toggleWishlist } from '../utils/wishlist';
import { SITE_URL } from '../lib/seo';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const item = productId ? getCatalogItem(productId) : null;
  const [active, setActive] = useState(0);
  const wished = useIsWished(item?.key ?? '');

  if (!item) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-stone-500 dark:text-stone-400">
        Product not found.
      </div>
    );
  }

  const p = item.product;
  const images = item.images.length ? item.images : [item.image];
  const checkoutHref = `/checkout?product=${p.id}`;
  const ask = () => openWhatsApp(contactUrl(`I have a question about the ${p.name}.`), 'whatsapp_contact_click', { placement: 'pdp' });
  const bulk = () => openWhatsApp(bulkInquiryUrl(p.name), 'whatsapp_bulk_click', { placement: 'pdp' });

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: p.name,
    image: images,
    description: p.features.join('. '),
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
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '48' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/collections` },
      { '@type': 'ListItem', position: 3, name: p.name, item: `${SITE_URL}${item.url}` },
    ],
  };

  const specs = [
    { k: 'Material', v: p.material },
    { k: 'Dimensions', v: p.dimensions },
    { k: 'Weight', v: p.weight },
    { k: 'Country of Origin', v: p.origin },
  ].filter((s) => s.v);

  return (
    <>
      <SEO schema={[productSchema, breadcrumbSchema]} />

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-sm text-stone-500 dark:text-stone-400 flex items-center gap-1.5" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-green">Home</Link>
        <ChevronRight size={14} />
        <Link to="/collections" className="hover:text-brand-green">Shop</Link>
        <ChevronRight size={14} />
        <span className="text-stone-700 dark:text-stone-300 truncate">{p.name}</span>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-800">
            <img
              src={cloudinaryTransform(images[active], { w: 1000 })}
              srcSet={cloudinarySrcSet(images[active], [600, 900, 1200])}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={p.name}
              className="w-full h-full object-cover"
              decoding="async"
            />
            {item.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">{item.discountPercentage}% OFF</span>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(item.key)}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 dark:bg-stone-900/80 flex items-center justify-center shadow"
            >
              <Heart size={20} className={wished ? 'fill-red-500 text-red-500' : 'text-stone-600 dark:text-stone-300'} />
            </button>
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-20 w-20 rounded-2xl overflow-hidden border-2 transition-colors ${i === active ? 'border-brand-green' : 'border-transparent'}`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={cloudinaryTransform(img, { w: 160 })} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-green mb-2">
              <Leaf size={13} /> Handmade · In Stock
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 leading-tight">{p.name}</h1>
            <p className="mt-2 text-stone-600 dark:text-stone-400">{p.tagline}</p>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-amber-500">{[0, 1, 2, 3, 4].map((i) => (<Star key={i} size={15} className="fill-current" />))}</div>
              <span className="text-sm text-stone-500 dark:text-stone-400">4.8 · 48 reviews</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">₹{p.price}</span>
              {p.mrp > p.price && <span className="text-lg text-stone-400 line-through">₹{p.mrp}</span>}
              {item.discountPercentage > 0 && <span className="text-sm font-bold text-red-600">Save {item.discountPercentage}%</span>}
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Inclusive of all taxes · Free shipping</p>

            {/* Primary CTA -> checkout (pay online or WhatsApp) */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to={checkoutHref} className="flex-1 inline-flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold py-3.5 rounded-2xl hover:bg-brand-green dark:hover:bg-brand-green dark:hover:text-white transition-colors">
                <ShoppingBag size={18} /> Buy Now
              </Link>
              <button onClick={ask} className="sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 font-bold px-5 py-3.5 rounded-2xl hover:border-brand-green transition-colors">
                <MessageCircle size={18} /> Ask
              </button>
            </div>
            <p className="mt-2.5 text-xs text-stone-500 dark:text-stone-400 inline-flex items-center gap-1.5">
              <CreditCard size={13} className="text-[#5f259f]" /> Pay online via PhonePe
              <span className="mx-1">·</span>
              <MessageCircle size={13} className="text-brand-green" /> or order on WhatsApp (COD) — choose at checkout
            </p>

            {/* Trust grid */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: Truck, k: 'Free Shipping', v: 'On orders over ₹499' },
                { icon: ShieldCheck, k: 'Cash on Delivery', v: 'Pay at your door' },
                { icon: RefreshCcw, k: 'Easy Returns', v: '10-day policy' },
                { icon: Clock, k: 'Fast Dispatch', v: 'Ships in 24–48 hrs' },
              ].map((f) => (
                <div key={f.k} className="flex items-start gap-2.5 rounded-2xl border border-stone-100 dark:border-stone-700 p-3">
                  <f.icon size={18} className="text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">{f.k}</div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">{f.v}</div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={bulk} className="mt-4 w-full flex items-center justify-between gap-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 px-4 py-3 text-left hover:border-brand-green transition-colors">
              <span className="flex items-center gap-2.5 text-sm text-stone-600 dark:text-stone-300">
                <Package size={18} className="text-brand-green" /> Buying in bulk or for gifting? Get a wholesale quote
              </span>
              <ChevronRight size={16} className="text-stone-400" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Details */}
      <section className="bg-stone-50 dark:bg-stone-950 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">About this bag</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              Handcrafted by skilled artisans in India, the <strong>{p.name}</strong> blends natural jute with thoughtful
              detailing — lightweight, roomy enough for your daily essentials, and made to last. A sustainable everyday
              companion for office, college, travel and gifting.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-stone-600 dark:text-stone-400">
              {p.features.map((f, i) => (<li key={i}>{f}</li>))}
            </ul>
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
            <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2 font-serif text-lg">Delivery & Returns</h3>
            <ul className="text-sm text-stone-600 dark:text-stone-400 space-y-1.5">
              <li>• Free shipping on all orders across India. Cash on Delivery available.</li>
              <li>• Dispatched in 24–48 hours; delivered in 3–6 days across India.</li>
              <li>• Easy 10-day return & exchange — message us on WhatsApp with your order ID.</li>
            </ul>
          </div>
        </div>
      </section>

      <YouMayLike excludeProductId={p.id} title="You may also like" />

      {/* Sticky mobile CTA */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur border-t border-stone-200 dark:border-stone-700 p-3 flex items-center gap-3">
        <div className="shrink-0">
          <div className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 leading-none">₹{p.price}</div>
          {p.mrp > p.price && <div className="text-xs text-stone-400 line-through">₹{p.mrp}</div>}
        </div>
        <Link to={checkoutHref} className="flex-1 inline-flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold py-3 rounded-xl">
          <ShoppingBag size={18} /> Buy Now
        </Link>
      </div>
    </>
  );
};

export default ProductDetail;
