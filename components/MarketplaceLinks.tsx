import React from 'react';
import { ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MARKETPLACE_LINKS } from '../constants';

const MarketplaceLogo = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    className="h-10 sm:h-12 w-auto object-contain"
    loading="lazy"
    decoding="async"
    referrerPolicy="no-referrer"
  />
);

const MarketplaceLinks: React.FC = () => {
  const marketplaces = [
    {
      name: 'Amazon',
      logo: (
        <MarketplaceLogo
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon logo"
        />
      ),
      url: MARKETPLACE_LINKS.amazon,
      color: '#232F3E',
      hoverBg: 'hover:bg-[#131921]',
    },
    {
      name: 'Flipkart',
      logo: (
        <MarketplaceLogo
          src="https://res.cloudinary.com/thetidbit23024/image/upload/v1768550284/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/logo/2_kr0mbs.svg"
          alt="Flipkart logo"
        />
      ),
      url: MARKETPLACE_LINKS.flipkart,
      color: '#2874F0',
      hoverBg: 'hover:bg-[#1E5FD9]',
    },
    {
      name: 'Meesho',
      logo: (
        <MarketplaceLogo
          src="https://res.cloudinary.com/thetidbit23024/image/upload/v1768550283/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/logo/1_m7ljon.svg"
          alt="Meesho logo"
        />
      ),
      url: MARKETPLACE_LINKS.meesho,
      color: '#FF6B6B',
      hoverBg: 'hover:bg-[#FF5252]',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-stone-50 to-white dark:from-stone-950 dark:to-stone-900 border-y border-stone-200 dark:border-stone-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <ShieldCheck size={24} className="text-brand-green dark:text-brand-green/80" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              Shop on Your Favorite Platform
            </h2>
          </div>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            We are a verified genuine brand available on all major marketplaces. 
            Choose your preferred platform and enjoy the same great quality.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 w-fit mx-auto px-4 py-2 rounded-full">
            <CheckCircle2 size={16} />
            <span>100% Authentic Products</span>
          </div>
        </div>

        {/* Marketplace Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketplaces.map((marketplace) => (
            <a
              key={marketplace.name}
              href={marketplace.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                  window.gtag('event', 'marketplace_click', {
                    marketplace: marketplace.name.toLowerCase(),
                    placement: 'marketplace_links',
                  });
                }
              }}
              className="group relative bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm rounded-2xl p-6 border-2 border-stone-200 dark:border-stone-700/50 hover:border-brand-green dark:hover:border-brand-green/50 transition-all duration-300 shadow-sm dark:shadow-stone-900/50 hover:shadow-xl dark:hover:shadow-stone-900/70"
            >
              {/* Logo Container */}
              <div className="bg-white dark:bg-stone-900 p-4 rounded-xl mb-4 flex items-center justify-center min-h-[70px] border border-stone-200/80 dark:border-stone-700/60 shadow-inner">
                {marketplace.logo}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  Shop on {marketplace.name}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
                  {marketplace.name === 'Amazon' && 'Prime delivery available'}
                  {marketplace.name === 'Flipkart' && 'Fast delivery & easy returns'}
                  {marketplace.name === 'Meesho' && 'Best prices & quick delivery'}
                </p>
                
                {/* CTA Button */}
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all ${marketplace.hoverBg}`} style={{ backgroundColor: marketplace.color }}>
                  <span>Shop Now</span>
                  <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Hover Effect Indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 size={20} className="text-brand-green" />
              </div>
            </a>
          ))}
        </div>

        {/* Trust Badge Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            <ShieldCheck size={16} className="inline mr-1 text-brand-green" />
            Same authentic products, same quality guarantee across all platforms
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceLinks;
