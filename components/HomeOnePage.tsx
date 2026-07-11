'use client';
import React from 'react';
import { Link } from '@/lib/router';
import SEO from './SEO';
import { MARKETPLACE_LINKS } from '../constants';
import { CATALOGS as ALL_PRODUCTS } from '../data/catalogs';
import ProductCard from './ProductCard';
import { cloudinaryTransform } from '../utils/cloudinary';

// Placeholder image URLs – replace with your section images later
const HOME_ONE_IMAGES = {
  hero: '', // Hero: woman with tote bag (right side)
  usageOffice: '', // Smart for Office
  usageShopping: '', // Perfect for Shopping
  usageGifting: '', // Ideal for Gifting
  artisanBanner: '', // Handmade with Heart – woman artisan
  bestsellersLifestyle: '', // Woman with bag on left of bestsellers
};

// Fallbacks from existing assets until you provide section images
const FALLBACK_HERO = 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771358511/thetidbit-homepage-hero/ChatGPT_Image_Feb_18_2026_01_31_30_AM_gx7bux.png';
const FALLBACK_ARTISAN = 'https://res.cloudinary.com/thetidbit23024/image/upload/v1765957946/ChatGPT_Image_Dec_17_2025_01_22_13_PM_ymwkfv.png';

const BESTSELLERS = ALL_PRODUCTS.slice(0, 3);

const USAGE_CARDS = [
  {
    title: 'Smart for Office',
    image:
      HOME_ONE_IMAGES.usageOffice ||
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1771424522/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/Usage%20pic/ChatGPT_Image_Feb_18_2026_07_51_50_PM_hhzozc.png',
  },
  {
    title: 'Perfect for Shopping',
    image:
      HOME_ONE_IMAGES.usageShopping ||
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1771424510/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/Usage%20pic/ChatGPT_Image_Feb_18_2026_07_49_31_PM_wzylky.png',
  },
  {
    title: 'Ideal for Gifting',
    image:
      HOME_ONE_IMAGES.usageGifting ||
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1771424509/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/Usage%20pic/ChatGPT_Image_Feb_18_2026_07_49_25_PM_laxnfj.png',
  },
].map((c) => ({ ...c, image: c.image || FALLBACK_HERO }));

const SEEN_IN_LOGOS = [
  { name: 'Amazon', url: MARKETPLACE_LINKS.amazon, logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Flipkart', url: MARKETPLACE_LINKS.flipkart, logoSrc: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1768550284/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/logo/2_kr0mbs.svg' },
  { name: 'Meesho', url: MARKETPLACE_LINKS.meesho, logoSrc: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1768550283/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/logo/1_m7ljon.svg' },
  { name: 'Myntra', url: 'https://www.myntra.com/', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Myntra_logo.png' },
];

const HomeOnePage: React.FC = () => {
  const artisanImage = HOME_ONE_IMAGES.artisanBanner || FALLBACK_ARTISAN;
  const lifestyleImage = HOME_ONE_IMAGES.bestsellersLifestyle || FALLBACK_HERO;

  return (
    <>
      <SEO
        title="The Tidbit – For the Smart, Everyday Indian Woman"
        description="Carry Simplicity. Carry Culture. Handmade jute bags trusted by 1000+ women. Crafted by local artisans. COD & Free Shipping."
      />
      <div className="min-h-screen bg-[#f5f0e8] dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors duration-300">
        {/* ——— Hero: full-width banner ——— */}
        <section className="relative w-full">
          <img
           src={cloudinaryTransform("https://res.cloudinary.com/thetidbit23024/image/upload/v1771410537/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/desktop-banner/banner-desktop_lsdxsn.png", { w: 2400, h: 1600, c: 'fill', q: 'auto:best' })}
            // src="https://res.cloudinary.com/thetidbit23024/image/upload/v1771410537/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/desktop-banner/banner-desktop_lsdxsn.png"
            alt="For the Smart, Everyday Indian Woman. Carry Simplicity. Carry Culture. Trusted by 1000+ Women, Crafted by Local Artisans, COD & Free Shipping."
            className="w-full h-auto object-cover object-center"
            loading="eager"
          />
        </section>

        {/* Hairline between banner and next section */}
        <div className="h-px w-full bg-stone-300/70 dark:bg-stone-600/60" aria-hidden="true" />

        {/* ——— Product usage / lifestyle (3 cards) ——— */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#f5f0e8] dark:bg-stone-900">
          {/* Inner container: off-white with subtle border, sharp corners */}
          <div className="max-w-6xl mx-auto border border-white dark:border-stone-700/80 bg-[#fdfcf9] dark:bg-stone-800/50 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
              {USAGE_CARDS.map(({ title, image }) => (
                <div key={title} className="group flex flex-col">
                  {/* Image with thin white border, slightly wider than tall */}
                  <div className="relative aspect-[4/3] overflow-hidden border-2 border-white dark:border-stone-600 bg-stone-200 dark:bg-stone-700">
                    <img
                      src={cloudinaryTransform(image, { w: 800 })}
                      alt={title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Solid dark brown bar at bottom (no gradient) */}
                    <div className="absolute bottom-0 left-0 right-0 h-14 sm:h-16 flex items-center justify-center z-10 bg-[#4a3728] dark:bg-[#5c4033]" />
                    <p className="absolute bottom-0 left-0 right-0 h-14 sm:h-16 flex items-center justify-center text-white font-medium text-base sm:text-lg font-sans z-20">
                      {title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Mid banner: Handmade with Heart ——— */}
        <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#8b7355] dark:bg-stone-800 text-white overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Handmade with Heart.
              </h2>
              <p className="text-lg sm:text-xl text-amber-100 dark:text-stone-300">
                Empowering Women • Supporting Livelihoods.
              </p>
            </div>
            <div className="flex-1 w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden bg-stone-700/50">
              <img
                src={cloudinaryTransform(artisanImage, { w: 600 })}
                alt="Artisan at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* ——— Seen In ——— */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-stone-950 border-y border-stone-200 dark:border-stone-800">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-8">
              Seen In:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {SEEN_IN_LOGOS.map(({ name, url, logoSrc }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                  aria-label={`The Tidbit on ${name}`}
                >
                  <img
                    src={logoSrc}
                    alt={name}
                    className="h-8 sm:h-10 w-auto object-contain max-w-[120px] grayscale hover:grayscale-0 transition-all"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Our Bestsellers ——— */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#ebe4d9] dark:bg-stone-900">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
              {/* Lifestyle image (left, overlaps on desktop) */}
              <div className="hidden lg:block flex-shrink-0 w-72 xl:w-80">
                <div className="sticky top-28 rounded-2xl overflow-hidden aspect-[3/4] bg-stone-200 dark:bg-stone-800 shadow-xl">
                  <img
                    src={cloudinaryTransform(lifestyleImage, { w: 400 })}
                    alt="Woman with Tidbit bag"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-10 text-center lg:text-left">
                  Our Bestsellers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10">
                  {BESTSELLERS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="flex justify-center lg:justify-start">
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center px-8 py-4 bg-stone-800 dark:bg-stone-700 text-white font-semibold rounded-lg hover:bg-stone-700 dark:hover:bg-stone-600 transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeOnePage;