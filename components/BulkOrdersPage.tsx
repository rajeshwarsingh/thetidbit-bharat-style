'use client';
import React from 'react';
import { Link } from '@/lib/router';
import { Building2, Gift, Store, Palette, Clock, Package, MessageCircle, ArrowRight } from 'lucide-react';
import SEO from './SEO';
import Reveal from './Reveal';
import CatalogProductCard from './CatalogProductCard';
import { getBulkGroups, getBulkVariantItems, DEFAULT_MOQ } from '../data/catalog';
import { bulkInquiryUrl, openWhatsApp } from '../utils/whatsapp';
import { CONTACT_INFO } from '../constants';

const USE_CASES = [
  { icon: Building2, title: 'Corporate Gifting', text: 'Branded jute bags for employees, clients & events.' },
  { icon: Gift, title: 'Wedding & Return Gifts', text: 'Elegant, eco-friendly favours your guests will keep.' },
  { icon: Store, title: 'Resellers & Retail', text: 'Wholesale pricing for boutiques and online sellers.' },
];

const PROCESS = [
  { icon: MessageCircle, title: 'Share your requirement', text: 'Design, quantity, colours & timeline over WhatsApp.' },
  { icon: Palette, title: 'Customise & brand', text: 'Add your logo, tags or bespoke colours.' },
  { icon: Package, title: 'We manufacture', text: `Handcrafted to order from ${DEFAULT_MOQ}+ pieces.` },
  { icon: Clock, title: 'Delivered on schedule', text: 'Typical lead time 2–4 weeks depending on volume.' },
];

const BulkOrdersPage: React.FC = () => {
  const groups = getBulkGroups();
  const totalVariants = getBulkVariantItems().length;
  const cta = () => openWhatsApp(bulkInquiryUrl('Bulk Orders page'), 'whatsapp_bulk_click', { placement: 'bulk-page' });

  return (
    <>
      <SEO
        title="Bulk & Corporate Orders — Custom Jute Bags"
        description="Order handmade jute bags in bulk for corporate gifting, weddings and resellers. Custom branding, competitive wholesale pricing and reliable lead times. Request a quote."
        canonicalUrl="https://thetidbit.in/bulk"
      />

      {/* Hero */}
      <section className="bg-stone-900 dark:bg-stone-950 text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-jute-300 mb-4">Bulk & Corporate</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">Beautiful bags, made in bulk</h1>
            <p className="mt-4 text-stone-300 text-base sm:text-lg max-w-2xl mx-auto">
              Sustainable, handcrafted jute bags for corporate gifting, weddings and resellers — customised with your branding.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={cta} className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 font-bold px-8 py-3.5 rounded-full hover:bg-jute-100 transition-colors">
                <MessageCircle size={18} /> Request Quote
              </button>
              <a
                href={`tel:${CONTACT_INFO.mobile}`}
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors"
              >
                Call {CONTACT_INFO.mobile}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-16 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.title} delayMs={i * 80}>
                <div className="h-full rounded-2xl border border-stone-100 dark:border-stone-700 p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 mx-auto rounded-full bg-jute-100 dark:bg-stone-800 flex items-center justify-center text-brand-green mb-4">
                    <u.icon size={26} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">{u.title}</h3>
                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">{u.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process + specs */}
      <section className="py-16 bg-jute-100 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">How bulk orders work</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <Reveal key={p.title} delayMs={i * 80}>
                <div className="relative bg-white dark:bg-stone-800 rounded-2xl p-6 h-full">
                  <span className="absolute top-4 right-5 font-serif text-4xl font-bold text-jute-200 dark:text-stone-700">{i + 1}</span>
                  <div className="text-brand-green mb-3"><p.icon size={24} /></div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Manufacturing details */}
          <Reveal className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
            {[
              { k: 'Minimum Order', v: `${DEFAULT_MOQ} pcs` },
              { k: 'Lead Time', v: '2–4 weeks' },
              { k: 'Branding', v: 'Logo & custom tags' },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-white dark:bg-stone-800 py-6 px-4">
                <div className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">{s.v}</div>
                <div className="text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400 mt-1">{s.k}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Full catalogue — every base bag and all colour variations */}
      <section id="catalogue" className="py-16 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-green mb-3">
              The full range · {totalVariants} designs
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              Browse every bag & colour
            </h2>
            <p className="mt-3 text-stone-600 dark:text-stone-400">
              Our complete collection — all styles and every colourway — available made to order. Tap Request Quote on any design.
            </p>
          </Reveal>

          {groups.map((group) => (
            <div key={group.product.id} className="mb-14 last:mb-0">
              <div className="flex items-baseline justify-between mb-6 border-b border-stone-100 dark:border-stone-800 pb-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {group.product.name}
                </h3>
                <span className="text-sm text-stone-500 dark:text-stone-400">
                  {group.items.length} colours
                </span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {group.items.map((item, i) => (
                  <Reveal key={item.key} delayMs={(i % 4) * 40}>
                    <CatalogProductCard item={item} hideLink />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-brand-green text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold">Let's build your order</h2>
          <p className="mt-3 text-white/90">Tell us your quantity and timeline — we'll share pricing and samples.</p>
          <button onClick={cta} className="inline-flex items-center gap-2 mt-6 bg-white text-brand-green font-bold px-8 py-3.5 rounded-full hover:bg-jute-100 transition-colors">
            <MessageCircle size={18} /> Request a Quote on WhatsApp
          </button>
        </div>
      </section>
    </>
  );
};

export default BulkOrdersPage;