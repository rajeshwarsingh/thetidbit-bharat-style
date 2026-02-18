import React from 'react';
import { ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MARKETPLACE_LINKS } from '../constants';

const marketplaceConfig = [
  {
    name: 'Amazon',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    url: MARKETPLACE_LINKS.amazon,
    tagline: 'Prime delivery available',
    logoBg: 'bg-amber-50 dark:bg-amber-950/30',
    logoBorder: 'border-amber-100 dark:border-amber-900/50',
    linkClass: 'text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300',
  },
  {
    name: 'Flipkart',
    logoSrc: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1768550284/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/logo/2_kr0mbs.svg',
    url: MARKETPLACE_LINKS.flipkart,
    tagline: 'Fast delivery & easy returns',
    logoBg: 'bg-sky-50 dark:bg-sky-950/30',
    logoBorder: 'border-sky-100 dark:border-sky-900/50',
    linkClass: 'text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300',
  },
  {
    name: 'Meesho',
    logoSrc: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1768550283/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/logo/1_m7ljon.svg',
    url: MARKETPLACE_LINKS.meesho,
    tagline: 'Best prices & quick delivery',
    logoBg: 'bg-rose-50 dark:bg-rose-950/30',
    logoBorder: 'border-rose-100 dark:border-rose-900/50',
    linkClass: 'text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300',
  },
];

const MarketplaceLinks: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-stone-50 dark:bg-stone-950 border-y border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">
            Also on
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            The Same TheTidbit on Amazon, Flipkart & Meesho
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            We’re a verified seller on India’s trusted marketplaces. Same authentic handmade bags, same quality — shop wherever you’re comfortable.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 w-fit mx-auto px-4 py-2 rounded-full">
            <CheckCircle2 size={16} />
            <span>100% Authentic • Same brand everywhere</span>
          </div>
        </div>

        {/* Marketplace Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {marketplaceConfig.map((m) => (
            <a
              key={m.name}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                  window.gtag('event', 'marketplace_click', {
                    marketplace: m.name.toLowerCase(),
                    placement: 'marketplace_links',
                  });
                }
              }}
              className="group flex flex-col rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 overflow-hidden hover:border-stone-300 dark:hover:border-stone-600 hover:shadow-xl hover:shadow-stone-200/50 dark:hover:shadow-stone-950 transition-all duration-300"
            >
              {/* Logo area — tinted by brand */}
              <div className={`flex items-center justify-center min-h-[100px] sm:min-h-[110px] px-6 border-b ${m.logoBg} ${m.logoBorder}`}>
                <img
                  src={m.logoSrc}
                  alt={`${m.name} — shop TheTidbit`}
                  className="h-10 sm:h-11 w-auto object-contain max-w-[140px]"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Copy + CTA */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
                  Shop on {m.name}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 flex-1">
                  {m.tagline}
                </p>
                <span className={`inline-flex items-center gap-1.5 font-semibold text-sm ${m.linkClass} transition-colors w-fit`}>
                  Visit store
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Trust footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-stone-500 dark:text-stone-400 inline-flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-emerald-500 flex-shrink-0" />
            One brand, one quality — whether you buy here or on your favorite app
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceLinks;
