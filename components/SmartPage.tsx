'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from '@/lib/router';
import {
  ArrowRight,
  Star,
  Send,
  CheckCircle2,
} from 'lucide-react';
import {
  WHATSAPP_NUMBER,
  CATEGORY_CARD_IMAGES,
  getProductDetailUrl,
} from '../constants';
import { CATALOGS as ALL_PRODUCTS } from '../data/catalogs';
import { getAllCatalogItems } from '../data/catalog';
import { cloudinaryTransform } from '../utils/cloudinary';
import InstagramCTA from './InstagramCTA';
import IndiaPride from './IndiaPride';
import MobileShopCTA from './MobileShopCTA';
import MarketplaceLinks from './MarketplaceLinks';
import SignatureCollection from './SignatureCollection';
import BrandTrustStrip from './BrandTrustStrip';
import GoogleReviewsBadge from './GoogleReviewsBadge';
import Reveal from './Reveal';
import { stories } from '../data/stories';
import { SEO_FAQS, faqPageJsonLd } from '../lib/seo-content';
import SEO from './SEO';

const HERO_BANNERS_DESKTOP = [
  {
    src: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1784308220/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/banner_jute_rfsmyk.png',
    alt: 'TheTidbit — Carry Style. Carry You. Handcrafted bags that add a little joy to every day. Shop the collection.',
  },
  {
    src: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1784308743/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/banner_2_o8qx2k.png',
    alt: 'TheTidbit — Carry Style. Carry You. Timeless designs, thoughtful details. Handcrafted bags that elevate every moment.',
  },
  {
    src: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1784309627/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/banner3_ggcdpy.png',
    alt: 'TheTidbit — Little Bag. Big Charm. Handcrafted with love for your everyday moments. Shop the collection.',
  },
];
const HERO_BANNERS_MOBILE = [
  {
    src: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1784316142/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/1_mob_banner_uvohz9.png',
    alt: 'TheTidbit — Little Bag. Big Charm. Handcrafted with love for your everyday moments. Shop the collection.',
    kind: 'designed' as const,
  },
  {
    src: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1784316474/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/mobile3_abrkil.png',
    alt: 'TheTidbit — Style Meets Jute. Nature-inspired designs for the conscious you. Shop now.',
    kind: 'designed' as const,
  },
  // {
  //   src: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1784310685/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/mobile3_kieez3.png',
  //   alt: 'TheTidbit — The Mini Edit. Small in size, huge in style. Shop the mini collection.',
  //   kind: 'designed' as const,
  // },
  // Legacy home mobile heroes
  {
    src: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433167/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-1_bvml1j.png',
    alt: 'Handmade jute bags by TheTidbit — sustainable fashion for everyday Indian women',
    kind: 'legacy' as const,
  },
  {
    src: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433168/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-2_buovfd.png',
    alt: 'TheTidbit handmade jute bags — everyday carry for Indian women',
    kind: 'legacy' as const,
  },
  {
    src: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433169/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-3_e3aypr.png',
    alt: 'TheTidbit eco-friendly handbags styled for real life',
    kind: 'legacy' as const,
  },
  {
    src: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433171/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-4_uwnrvc.png',
    alt: 'TheTidbit limited edition handmade bags',
    kind: 'legacy' as const,
  },
  {
    src: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433169/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-5_ycnxry.png',
    alt: 'Shop TheTidbit handmade jute bag collection',
    kind: 'legacy' as const,
  },
];

const QUICK_LINKS = ALL_PRODUCTS.slice(0, 4);
const CATALOG_ITEMS = getAllCatalogItems();
const CATEGORY_PICKS = [
  { slug: 'round-sling-red', label: 'Everyday', filter: 'daily' },
  { slug: 'butterfly-sling-blue', label: 'Gifting', filter: 'gift' },
  { slug: 'chain-sling-yellow', label: 'College', filter: 'college' },
  { slug: 'jute-tote-purple', label: 'Office', filter: 'office' },
  { slug: 'evil-eye-sling-blue', label: 'Travel', filter: 'travel' },
];
const CATEGORY_CARDS = CATEGORY_PICKS.map((p) => {
  const item = CATALOG_ITEMS.find((i) => i.productId === p.slug);
  return { id: p.filter, label: p.label, image: item?.image || '', to: `/collections?filter=${p.filter}` };
}).filter((c) => c.image);

const WHY_POINTS = [
  {
    title: 'Natural jute, made to last',
    description: 'Breathable, biodegradable material — sturdy for daily carry without feeling heavy.',
  },
  {
    title: 'Designed for Indian days',
    description: 'Office, college, travel, and gifting silhouettes sized for phone, wallet, and essentials.',
  },
  {
    title: 'Handmade, fairly priced',
    description: 'Artisan craft with clear pricing from ₹474 — GST included, free shipping across India.',
  },
];

const LIFESTYLE_TESTIMONIALS = [
  {
    image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771394105/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/customers/customer1_n3htyo.png',
    quote: 'I carry it everywhere — office, market, even temples.',
    name: 'Sneha R., Mumbai',
  },
  {
    image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771394104/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/customers/customer2_hn1rp3.png',
    quote: 'The quality surprised me at this price. Friends keep asking where I got it.',
    name: 'Divya P., Bangalore',
  },
  {
    image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771394375/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/customers/customer3_szdndx.png',
    quote: 'Perfect size for everyday essentials. Love the handmade look.',
    name: 'Kavitha M., Chennai',
  },
  {
    image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771394374/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/customers/customer4_tinjfu.png',
    quote: 'Gifted this to my sister. She loved it instantly.',
    name: 'Prachi S., Pune',
  },
];

const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: 'Ananya S.',
    location: 'Mumbai',
    rating: 5,
    text: 'Absolutely in love with this bag. The embroidery is detailed and it fits my phone, wallet, and keys perfectly.',
    photo: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771396787/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/happy%20customer/1_Happy_Customers_m8zhdo.png',
  },
  {
    id: 2,
    name: 'Priya M.',
    location: 'Jaipur',
    rating: 5,
    text: 'Ordered pink for college. Lightweight, cute, and I already got compliments. Will buy more colours.',
    photo: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771396784/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/happy%20customer/2_happy_customer_rtiftm.png',
  },
  {
    id: 3,
    name: 'Riya K.',
    location: 'Delhi',
    rating: 5,
    text: 'Good quality jute. Strap length is perfect for crossbody. Delivery was fast — highly recommend.',
    photo: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771396786/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/happy%20customer/3-_happy_customer_qnlt00.png',
  },
  {
    id: 4,
    name: 'Meera V.',
    location: 'Hyderabad',
    rating: 5,
    text: 'Bought three for Diwali gifting. Everyone noticed the handmade feel. Thoughtful and useful.',
    photo: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771396784/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/happy%20customer/4_happy_customer_cwlwg2.png',
  },
];

const HERO_SLIDE_INTERVAL = 6000;
const STORY_IMAGE =
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1784316912/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/owner_thetidbit_ouoahb.png';
const LIFESTYLE_BANNER_IMAGE =
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433169/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-3_e3aypr.png';

const SmartPage: React.FC = () => {
  const [offerPhone, setOfferPhone] = useState('');
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [desktopBanner, setDesktopBanner] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const heroAutoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const desktopAutoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetHeroAutoplay = useCallback(() => {
    if (heroAutoplayRef.current) clearInterval(heroAutoplayRef.current);
    heroAutoplayRef.current = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_BANNERS_MOBILE.length);
    }, HERO_SLIDE_INTERVAL);
  }, []);

  const resetDesktopAutoplay = useCallback(() => {
    if (desktopAutoplayRef.current) clearInterval(desktopAutoplayRef.current);
    desktopAutoplayRef.current = setInterval(() => {
      setDesktopBanner((prev) => (prev + 1) % HERO_BANNERS_DESKTOP.length);
    }, HERO_SLIDE_INTERVAL);
  }, []);

  useEffect(() => {
    resetHeroAutoplay();
    resetDesktopAutoplay();
    return () => {
      if (heroAutoplayRef.current) clearInterval(heroAutoplayRef.current);
      if (desktopAutoplayRef.current) clearInterval(desktopAutoplayRef.current);
    };
  }, [resetHeroAutoplay, resetDesktopAutoplay]);

  const goDesktopBanner = useCallback(
    (index: number) => {
      setDesktopBanner(index);
      resetDesktopAutoplay();
    },
    [resetDesktopAutoplay]
  );

  const handleHeroTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }, []);

  const handleHeroTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const handleHeroTouchEnd = useCallback(() => {
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      setHeroSlide((prev) => (prev + 1) % HERO_BANNERS_MOBILE.length);
      resetHeroAutoplay();
    } else if (touchDeltaX.current > threshold) {
      setHeroSlide((prev) => (prev - 1 + HERO_BANNERS_MOBILE.length) % HERO_BANNERS_MOBILE.length);
      resetHeroAutoplay();
    }
  }, [resetHeroAutoplay]);

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerPhone.trim()) return;
    const message = `Hi TheTidbit! I'd like to claim my ₹100 off first order offer. My number: ${offerPhone}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setOfferSubmitted(true);
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'first_order_offer_submit', { placement: 'smart_page_offer_section' });
    }
  };

  return (
    <>
      {/* 1. HERO — desktop designed banner; mobile slider unchanged */}
      <section className="relative overflow-hidden">
        {/* Desktop — designed banner slider (copy + CTA baked into artwork) */}
        <div className="hidden sm:block relative w-full bg-[#f3ebe0]">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${desktopBanner * 100}%)` }}
            >
              {HERO_BANNERS_DESKTOP.map((banner, idx) => (
                <Link
                  key={banner.src}
                  to="/collections"
                  className="relative w-full flex-shrink-0 block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset"
                  tabIndex={idx === desktopBanner ? 0 : -1}
                  aria-hidden={idx !== desktopBanner}
                >
                  <img
                    src={cloudinaryTransform(banner.src, { w: 2400, q: 'auto:best' })}
                    srcSet={`
                      ${cloudinaryTransform(banner.src, { w: 1200, q: 'auto:best' })} 1200w,
                      ${cloudinaryTransform(banner.src, { w: 1800, q: 'auto:best' })} 1800w,
                      ${cloudinaryTransform(banner.src, { w: 2400, q: 'auto:best' })} 2400w
                    `}
                    sizes="100vw"
                    alt={banner.alt}
                    width={2400}
                    height={1200}
                    className="w-full h-auto object-cover object-center"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                  />
                  <span className="sr-only">Shop the collection</span>
                </Link>
              ))}
            </div>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {HERO_BANNERS_DESKTOP.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goDesktopBanner(idx)}
                  className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
                    idx === desktopBanner ? 'bg-stone-800 w-7' : 'bg-stone-800/35 hover:bg-stone-800/60 w-2'
                  }`}
                  aria-label={`Show banner ${idx + 1}`}
                  aria-current={idx === desktopBanner}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                goDesktopBanner((desktopBanner - 1 + HERO_BANNERS_DESKTOP.length) % HERO_BANNERS_DESKTOP.length)
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-colors"
              aria-label="Previous banner"
            >
              <ArrowRight size={18} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => goDesktopBanner((desktopBanner + 1) % HERO_BANNERS_DESKTOP.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-colors"
              aria-label="Next banner"
            >
              <ArrowRight size={18} />
            </button>
          </div>
          <h1 className="sr-only">Carry Style. Carry You. — TheTidbit handcrafted bags</h1>
        </div>

        {/* Mobile — designed + legacy banners; height follows active slide (no beige gap) */}
        <div className="sm:hidden">
          <div
            className="relative overflow-hidden bg-stone-100 dark:bg-stone-900"
            onTouchStart={handleHeroTouchStart}
            onTouchMove={handleHeroTouchMove}
            onTouchEnd={handleHeroTouchEnd}
          >
            {HERO_BANNERS_MOBILE.map((banner, idx) => {
              const active = idx === heroSlide;
              const isDesigned = banner.kind === 'designed';
              return (
                <Link
                  key={banner.src}
                  to="/collections"
                  className={`block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset transition-opacity duration-500 ${
                    active
                      ? 'relative opacity-100 z-[1]'
                      : 'absolute inset-x-0 top-0 opacity-0 pointer-events-none z-0'
                  }`}
                  tabIndex={active ? 0 : -1}
                  aria-hidden={!active}
                >
                  <img
                    src={cloudinaryTransform(banner.src, {
                      w: 800,
                      h: 1200,
                      c: 'fill',
                      q: 'auto:best',
                    })}
                    srcSet={`
                      ${cloudinaryTransform(banner.src, { w: 480, h: 720, c: 'fill', q: 'auto:good' })} 480w,
                      ${cloudinaryTransform(banner.src, { w: 640, h: 960, c: 'fill', q: 'auto:good' })} 640w,
                      ${cloudinaryTransform(banner.src, { w: 800, h: 1200, c: 'fill', q: 'auto:best' })} 800w
                    `}
                    sizes="100vw"
                    alt={banner.alt}
                    width={800}
                    height={1200}
                    className={
                      isDesigned
                        ? // Match home-style mobile hero frame; object-top keeps headline/CTA visible
                          'w-full h-[72vh] min-h-[520px] max-h-[680px] object-cover object-top'
                        : 'w-full h-[72vh] min-h-[480px] max-h-[640px] object-cover object-center'
                    }
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                  />
                  <span className="sr-only">Shop the collection</span>
                </Link>
              );
            })}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {HERO_BANNERS_MOBILE.map((banner, idx) => (
                <button
                  key={banner.src}
                  type="button"
                  onClick={() => {
                    setHeroSlide(idx);
                    resetHeroAutoplay();
                  }}
                  className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
                    idx === heroSlide
                      ? 'bg-white w-6 ring-1 ring-black/20'
                      : 'bg-white/70 w-2 ring-1 ring-black/10'
                  }`}
                  aria-label={`Go to banner ${idx + 1}`}
                  aria-current={idx === heroSlide}
                />
              ))}
            </div>
          </div>

          {/* Mobile quick-links */}
          <div className="bg-white dark:bg-stone-900 px-3 py-3 border-b border-stone-100 dark:border-stone-800">
            <div className="grid grid-cols-5 gap-1">
              {QUICK_LINKS.map((p) => {
                const thumb = CATEGORY_CARD_IMAGES[p.id] || p.colors[0]?.images[1] || p.colors[0]?.images[0] || '';
                const displayName = p.name.replace('Handmade Jute ', '').split(' - ')[0];
                return (
                  <Link key={p.id} to={getProductDetailUrl(p.id)} className="flex flex-col items-center gap-1 group">
                    <div className="w-[56px] h-[56px] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 group-active:border-brand-green transition-colors shadow-sm">
                      <img src={cloudinaryTransform(thumb, { w: 128, h: 128, c: 'fill' })} alt={p.displayName || displayName} className="w-full h-full object-cover" loading="eager" decoding="async" width={56} height={56} />
                    </div>
                    <span className="text-[9px] font-semibold text-stone-600 dark:text-stone-300 text-center leading-tight line-clamp-1">{displayName}</span>
                  </Link>
                );
              })}
              <Link to="/collections" className="flex flex-col items-center gap-1">
                <div className="w-[56px] h-[56px] rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 flex items-center justify-center shadow-sm">
                  <ArrowRight size={18} className="text-stone-500 dark:text-stone-400" />
                </div>
                <span className="text-[9px] font-semibold text-stone-600 dark:text-stone-300 text-center leading-tight">View All</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust — secure pay, shipping, materials, WhatsApp (no returns claims) */}
      <BrandTrustStrip dense />

      {/* 3. Shop by occasion */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-stone-50/80 to-white dark:from-stone-900 dark:via-stone-950 dark:to-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 sm:mb-14 max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100">
              Shop by occasion
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-400">
              Pick the day — office, campus, travel, or a gift — then find the handmade bag that fits.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORY_CARDS.map((cat, i) => (
              <Reveal key={cat.id} delayMs={i * 60} className={i >= 4 ? 'hidden sm:block' : ''}>
                <Link to={cat.to} className="group relative block aspect-[3/4] overflow-hidden">
                  <img
                    src={cloudinaryTransform(cat.image, { w: 500, h: 660, c: 'fill' })}
                    alt={`${cat.label} handmade jute bags`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <p className="font-serif text-lg sm:text-xl font-bold text-white">{cat.label}</p>
                    <p className="text-white/70 text-xs mt-1 inline-flex items-center gap-1">
                      Shop <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Collection */}
      <SignatureCollection />

      {/* 5. Why TheTidbit — list, not icon cards */}
      <section className="py-16 sm:py-24 bg-stone-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #86efac 0%, transparent 40%), radial-gradient(circle at 80% 80%, #fbbf24 0%, transparent 35%)',
          }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Why TheTidbit</h2>
            <p className="text-base sm:text-lg text-stone-300">
              Sustainable fashion that still works for real Indian routines — without plastic-heavy fast fashion.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {WHY_POINTS.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 100}>
                <p className="text-brand-green/80 text-xs font-bold tracking-[0.2em] mb-3">0{index + 1}</p>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-stone-400 leading-relaxed">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Story — founder image */}
      <section id="our-story" className="py-16 sm:py-24 bg-gradient-to-br from-stone-100 via-white to-emerald-50/50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="overflow-hidden bg-[#f3ebe0] dark:bg-stone-800">
                <img
                  src={cloudinaryTransform(STORY_IMAGE, { w: 900, q: 'auto:good' })}
                  srcSet={`
                    ${cloudinaryTransform(STORY_IMAGE, { w: 600, q: 'auto:good' })} 600w,
                    ${cloudinaryTransform(STORY_IMAGE, { w: 900, q: 'auto:good' })} 900w,
                    ${cloudinaryTransform(STORY_IMAGE, { w: 1200, q: 'auto:best' })} 1200w
                  `}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt="TheTidbit founder — Our Story: How TheTidbit started. A small dream with a lot of love."
                  width={900}
                  height={1200}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2" delayMs={80}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-5">
                How TheTidbit started
              </h2>
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                A simple idea: everyday women should carry bags that feel stylish, stay affordable, and respect the planet — moving away from plastic and fast fashion toward handmade jute.
              </p>
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
                We work with skilled artisans across India to make bags for office, college, travel, and gifting — durable, breathable, and ready for real life.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-bold text-brand-green hover:underline underline-offset-4"
              >
                Read our story <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Lifestyle banner — mid-funnel aspiration */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[280px] sm:min-h-[360px]">
          <img
            src={cloudinaryTransform(LIFESTYLE_BANNER_IMAGE, { w: 1600, h: 700, c: 'fill', q: 'auto:good' })}
            alt="TheTidbit handmade jute bags styled for everyday Indian women"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-stone-950/55" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center text-white">
            <Reveal>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Made for your real days
              </h2>
              <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-8">
                Office, college, travel, and gifting — lightweight handmade bags that look premium without the premium price tag.
              </p>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-7 py-3.5 font-bold hover:bg-stone-100 transition-colors"
              >
                Explore styles <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. Real women */}
      <section className="py-16 sm:py-24 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 sm:mb-14 max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Styled by real women
            </h2>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400">
              How TheTidbit bags show up in everyday Indian life.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {LIFESTYLE_TESTIMONIALS.map((item, index) => (
              <Reveal key={item.name} delayMs={(index % 4) * 70}>
                <figure className="group relative aspect-[3/4] overflow-hidden">
                  <img
                    src={cloudinaryTransform(item.image, { w: 600, h: 800, c: 'fill' })}
                    alt={`TheTidbit bag styled by ${item.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-stone-950/90 to-transparent">
                    <p className="text-white text-xs sm:text-sm font-medium leading-snug mb-1 line-clamp-3">
                      “{item.quote}”
                    </p>
                    <p className="text-white/60 text-[10px] sm:text-xs">— {item.name}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Stories */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
            <Reveal>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">
                Stories &amp; guides
              </h2>
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-xl">
                Buying guides, craft notes, and styling ideas for handmade handbags.
              </p>
            </Reveal>
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:underline underline-offset-4"
            >
              View all stories <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.slice(0, 3).map((story, i) => (
              <Reveal key={story.id} delayMs={i * 80}>
                <Link to={`/stories/${story.slug}`} className="group block">
                  <div className="aspect-[16/10] overflow-hidden bg-stone-200 dark:bg-stone-800 mb-4">
                    <img
                      src={cloudinaryTransform(story.heroImage, { w: 800, h: 500, c: 'fill' })}
                      alt={story.heroImageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="text-xs text-stone-400 mb-2">{story.readTime} min read</p>
                  <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-brand-green transition-colors">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 line-clamp-2">{story.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Reviews — lighter layout */}
      <section id="reviews" className="py-16 sm:py-24 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              What customers say
            </h2>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 mb-5">
              Real carry from women across India — also available on Amazon &amp; Flipkart.
            </p>
            <GoogleReviewsBadge variant="card" className="max-w-lg mx-auto text-left" placement="smart_reviews_proof" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {CUSTOMER_REVIEWS.map((review, i) => (
              <Reveal key={review.id} delayMs={(i % 2) * 80}>
                <article className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  {review.photo && (
                    <div className="sm:w-36 shrink-0 aspect-[4/3] sm:aspect-square overflow-hidden bg-stone-100 dark:bg-stone-800">
                      <img
                        src={cloudinaryTransform(review.photo, { w: 400, h: 400, c: 'fill' })}
                        alt={`Photo from ${review.name}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={14}
                          className={j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}
                        />
                      ))}
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed mb-3">
                      “{review.text}”
                    </p>
                    <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {review.name}
                      <span className="font-normal text-stone-500"> · {review.location}</span>
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MarketplaceLinks />

      {/* 10. First-order offer — no emoji / less card chrome */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-emerald-900 via-stone-900 to-stone-950 text-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
              ₹100 off your first order
            </h2>
            <p className="text-stone-300 mb-8">
              Share your WhatsApp number — we’ll send your first-order code. No spam.
            </p>
            {!offerSubmitted ? (
              <form onSubmit={handleOfferSubmit} className="space-y-3">
                <div className="flex gap-2 sm:gap-3">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">+91</span>
                    <input
                      type="tel"
                      value={offerPhone}
                      onChange={(e) => setOfferPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="WhatsApp number"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder:text-stone-400 focus:border-emerald-400 focus:outline-none"
                      required
                      pattern="[0-9]{10}"
                      title="Enter 10-digit mobile number"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-white text-stone-900 px-5 sm:px-6 py-3.5 font-bold hover:bg-stone-100 transition-colors flex items-center gap-2"
                  >
                    <Send size={16} />
                    <span className="hidden sm:inline">Claim</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4">
                <CheckCircle2 size={28} className="text-emerald-400" />
                <p className="font-bold text-lg">You&apos;re all set</p>
                <p className="text-sm text-stone-300">Check WhatsApp for your code.</p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Soft newsletter — WhatsApp-first for India mobile conversion */}
      <section className="py-14 sm:py-20 bg-stone-100 dark:bg-stone-950 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              New drops &amp; styling ideas
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mb-6">
              Get first looks on WhatsApp — no spam, just useful updates when we launch something new.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi TheTidbit! I'd like updates on new bag drops.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-7 py-3.5 font-bold hover:bg-brand-green dark:hover:bg-brand-green dark:hover:text-white transition-colors"
            >
              Join on WhatsApp
              <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      <InstagramCTA />
      <IndiaPride />

      <section
        className="py-16 sm:py-24 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800"
        aria-labelledby="smart-faq-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="smart-faq-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 text-center mb-8"
          >
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {SEO_FAQS.map((item) => (
              <details
                key={item.q}
                className="group border-b border-stone-200 dark:border-stone-700 py-4"
              >
                <summary className="cursor-pointer font-semibold text-stone-900 dark:text-stone-100 list-none flex justify-between gap-3">
                  <span>{item.q}</span>
                  <span className="text-brand-green group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-stone-500">
            Explore our{' '}
            <Link to="/collections" className="text-brand-green font-semibold underline underline-offset-2">
              handmade bag collections
            </Link>{' '}
            or read{' '}
            <Link to="/stories" className="text-brand-green font-semibold underline underline-offset-2">
              buying guides
            </Link>
            .
          </p>
        </div>
      </section>

      <SEO schema={faqPageJsonLd()} />
      <MobileShopCTA />
    </>
  );
};

export default SmartPage;
