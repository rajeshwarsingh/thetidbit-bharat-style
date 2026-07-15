'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from '@/lib/router';
import {
  ArrowRight,
  ShoppingBag,
  Star,
  Leaf,
  Feather,
  IndianRupee,
  Briefcase,
  Truck,
  ShieldCheck,
  Quote,
  Send,
  Heart,
  Camera,
  CheckCircle2,
} from 'lucide-react';
import { PRODUCT, HERO_BANNERS, WHATSAPP_NUMBER, CATEGORY_CARD_IMAGES, LOGO_URL, getProductDetailUrl } from '../constants';
import { CATALOGS as ALL_PRODUCTS } from '../data/catalogs';
import { getAllCatalogItems } from '../data/catalog';
import { cloudinaryTransform } from '../utils/cloudinary';
import InstagramCTA from './InstagramCTA';
import IndiaPride from './IndiaPride';
import MobileShopCTA from './MobileShopCTA';
import MarketplaceLinks from './MarketplaceLinks';
import SignatureCollection from './SignatureCollection';
import { stories } from '../data/stories';
import { SEO_FAQS, faqPageJsonLd } from '../lib/seo-content';
import SEO from './SEO';

const HERO_IMAGE_DESKTOP = HERO_BANNERS[0] || PRODUCT.colors[0]?.images[0] || '';
const HERO_IMAGES_MOBILE = [
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433167/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-1_bvml1j.png',
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433168/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-2_buovfd.png',
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433169/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-3_e3aypr.png',
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433171/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-4_uwnrvc.png',
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433169/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-5_ycnxry.png',
];

// Mobile hero quick-links (first 4 catalogs).
const QUICK_LINKS = ALL_PRODUCTS.slice(0, 4);

// Shop-by-category cards. Each occasion is represented by a specific catalog
// product's photo, and links to that filtered collection.
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

const WHY_CHOOSE_ITEMS = [
  {
    icon: Leaf,
    title: 'Eco-Friendly Jute Material',
    description: '100% natural jute — biodegradable, breathable, and kind to the earth.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    icon: Feather,
    title: 'Lightweight & Durable',
    description: 'Sturdy enough for daily use, yet light enough to carry all day long.',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-950/30',
  },
  {
    icon: Briefcase,
    title: 'Designed for Indian Daily Use',
    description: 'From office commutes to weekend outings — made for your real life.',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
  },
  {
    icon: IndianRupee,
    title: 'Affordable Without Compromise',
    description: 'Premium handmade quality starting at just ₹499. Style shouldn\'t cost the earth.',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
  },
];

const LIFESTYLE_TESTIMONIALS = [
  {
    image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771394105/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/customers/customer1_n3htyo.png',
    quote: '"I carry it everywhere — office, market, even temples!"',
    name: 'Sneha R., Mumbai',
  },
  {
    image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771394104/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/customers/customer2_hn1rp3.png',
    quote: '"The quality is amazing for this price. My friends all want one!"',
    name: 'Divya P., Bangalore',
  },
  {
    image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771394375/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/customers/customer3_szdndx.png',
    quote: '"Perfect size for everyday essentials. Love the boho look!"',
    name: 'Kavitha M., Chennai',
  },
  {
    image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771394374/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/customers/customer4_tinjfu.png',
    quote: '"Gifted this to my sister. She absolutely loved it!"',
    name: 'Prachi S., Pune',
  },
];

const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: 'Ananya S.',
    location: 'Mumbai',
    rating: 5,
    text: 'Absolutely in love with this bag! The embroidery is so detailed and it fits my phone, wallet, and keys perfectly. Feels great to use something eco-friendly.',
    date: '2 days ago',
    verified: true,
    photo: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771396787/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/happy%20customer/1_Happy_Customers_m8zhdo.png',
  },
  {
    id: 2,
    name: 'Priya M.',
    location: 'Jaipur',
    rating: 5,
    text: 'Ordered the Pink one for college. It\'s super cute and lightweight. Got so many compliments already! Will definitely buy more colors.',
    date: '1 week ago',
    verified: true,
    photo: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771396784/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/happy%20customer/2_happy_customer_rtiftm.png',
  },
  {
    id: 3,
    name: 'Riya K.',
    location: 'Delhi',
    rating: 5,
    text: 'Good quality jute. The strap length is perfect for crossbody. Delivery was super fast. Highly recommend TheTidbit!',
    date: '2 weeks ago',
    verified: true,
    photo: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771396786/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/happy%20customer/3-_happy_customer_qnlt00.png',
  },
  {
    id: 4,
    name: 'Meera V.',
    location: 'Hyderabad',
    rating: 5,
    text: 'Bought 3 bags for gifting during Diwali. Everyone was so impressed with the quality and the handmade feel. Such a thoughtful gift!',
    date: '3 weeks ago',
    verified: true,
    photo: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771396784/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/happy%20customer/4_happy_customer_cwlwg2.png',
  },
];

const HERO_SLIDE_INTERVAL = 6000;
const HERO_VALUE_POINTS = ['Starting at ₹499', 'Handmade in India', 'Free Shipping'];

const HomePage: React.FC = () => {
  const [offerPhone, setOfferPhone] = useState('');
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const offerInputRef = useRef<HTMLInputElement>(null);

  // Mobile hero slider state
  const [heroSlide, setHeroSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const heroAutoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetHeroAutoplay = useCallback(() => {
    if (heroAutoplayRef.current) clearInterval(heroAutoplayRef.current);
    heroAutoplayRef.current = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_IMAGES_MOBILE.length);
    }, HERO_SLIDE_INTERVAL);
  }, []);

  useEffect(() => {
    resetHeroAutoplay();
    return () => {
      if (heroAutoplayRef.current) clearInterval(heroAutoplayRef.current);
    };
  }, [resetHeroAutoplay]);

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
      setHeroSlide((prev) => (prev + 1) % HERO_IMAGES_MOBILE.length);
      resetHeroAutoplay();
    } else if (touchDeltaX.current > threshold) {
      setHeroSlide((prev) => (prev - 1 + HERO_IMAGES_MOBILE.length) % HERO_IMAGES_MOBILE.length);
      resetHeroAutoplay();
    }
  }, [resetHeroAutoplay]);

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerPhone.trim()) return;
    const message = `Hi TheTidbit! I'd like to claim my ₹100 off first order offer. My number: ${offerPhone}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setOfferSubmitted(true);
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'first_order_offer_submit', { placement: 'homepage_offer_section' });
    }
  };

  return (
    <>
      {/* ============================================ */}
      {/* 1. HERO                                       */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-white dark:bg-stone-900">
        {/* Desktop hero — full cinematic layout */}
        <div className="hidden sm:flex relative min-h-[85vh] max-h-[900px] items-center">
          <div className="absolute inset-0">
            <img
              src={cloudinaryTransform(HERO_IMAGE_DESKTOP, { w: 2400, h: 1600, c: 'fill', q: 'auto:best' })}
              srcSet={`
                ${cloudinaryTransform(HERO_IMAGE_DESKTOP, { w: 1200, h: 800, c: 'fill', q: 'auto:best' })} 1200w,
                ${cloudinaryTransform(HERO_IMAGE_DESKTOP, { w: 1800, h: 1200, c: 'fill', q: 'auto:best' })} 1800w,
                ${cloudinaryTransform(HERO_IMAGE_DESKTOP, { w: 2400, h: 1600, c: 'fill', q: 'auto:best' })} 2400w
              `}
              sizes="100vw"
              alt="Modern Indian woman confidently carrying a handmade jute bag by TheTidbit"
              width={2400}
              height={1600}
              className="w-full h-full object-cover object-[65%_40%]"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
              <div className="max-w-xl lg:max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                  <Leaf size={14} className="text-green-300" />
                  <span className="text-xs font-semibold text-white/90 tracking-wide uppercase">Handcrafted & Sustainable</span>
                </div>
                <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-5">
                  Carry Better. Look Better.
                </h1>
                <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-4 max-w-xl">
                  Premium handmade jute bags for women — eco-friendly sling bags and stylish handbags for office, college, travel and everyday life, made in India.
                </p>
                <p className="text-sm lg:text-base text-emerald-200/95 font-semibold mb-7">Handmade in India · Free shipping · Ready to ship</p>
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {HERO_VALUE_POINTS.map((point) => (
                    <span key={point} className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
                      {point}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Link to="/collections" className="inline-flex items-center gap-2.5 bg-white text-stone-900 px-7 py-3.5 rounded-xl font-bold text-base hover:bg-stone-50 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]">
                    <ShoppingBag size={18} />
                    Shop the Collection
                  </Link>
                  <a
                    href="#collection"
                    onClick={(e) => { e.preventDefault(); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-white/20 transition-all"
                  >
                    Explore Styles
                    <ArrowRight size={16} />
                  </a>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85 font-medium">
                  <span className="flex items-center gap-1.5"><Truck size={15} className="text-emerald-300" /> Free Shipping Across India</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-300" /> Handmade Quality</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-emerald-300" /> Secure Online Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile hero — compact slider */}
        <div className="sm:hidden">
          <div
            className="relative h-[72vh] min-h-[480px] max-h-[640px] overflow-hidden"
            onTouchStart={handleHeroTouchStart}
            onTouchMove={handleHeroTouchMove}
            onTouchEnd={handleHeroTouchEnd}
          >
            <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${heroSlide * 100}%)` }}>
              {HERO_IMAGES_MOBILE.map((img, idx) => (
                <div key={idx} className="relative w-full h-full flex-shrink-0">
                  <img
                    src={cloudinaryTransform(img, { w: 800, h: 1200, c: 'fill', q: 'auto:best' })}
                    srcSet={`
                      ${cloudinaryTransform(img, { w: 480, h: 720, c: 'fill', q: 'auto:good' })} 480w,
                      ${cloudinaryTransform(img, { w: 640, h: 960, c: 'fill', q: 'auto:good' })} 640w,
                      ${cloudinaryTransform(img, { w: 800, h: 1200, c: 'fill', q: 'auto:best' })} 800w
                    `}
                    sizes="100vw"
                    alt="Handmade jute bags by TheTidbit — sustainable fashion for everyday Indian women"
                    className="w-full h-full object-cover object-center"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/5" />
                </div>
              ))}
            </div>

            <div className="absolute bottom-[120px] left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {HERO_IMAGES_MOBILE.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setHeroSlide(idx); resetHeroAutoplay(); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === heroSlide ? 'bg-white w-5' : 'bg-white/50'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-20 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10">
              <p className="font-serif text-[22px] font-bold text-white leading-tight mb-1.5">
                Everyday Bags for <span className="text-emerald-300">Real Life</span>
              </p>
              <p className="text-[13px] text-white/70 tracking-wide mb-2">Office &nbsp;•&nbsp; College &nbsp;•&nbsp; Daily &nbsp;•&nbsp; Gifting</p>
              <p className="text-[17px] font-bold text-white mb-1.5">Starting at <span className="text-emerald-300">₹499</span></p>
              <p className="text-[11px] text-white/60 mb-3.5 tracking-wide">Ready to ship &nbsp;•&nbsp; Ships in 24–48 hrs &nbsp;•&nbsp; Free delivery</p>
              <Link to="/collections" className="flex items-center justify-center gap-2 w-full bg-white text-stone-900 py-3 rounded-xl font-bold text-sm shadow-lg active:scale-[0.98] transition-transform">
                <ShoppingBag size={16} />
                Shop the Collection
              </Link>
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

      {/* ============================================ */}
      {/* 2. TRUST BAR                                  */}
      {/* ============================================ */}
      <section className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {[
              { icon: Truck, label: 'Free Delivery', sub: 'Across India', color: 'text-blue-600 dark:text-blue-400' },
              { icon: ShieldCheck, label: 'Secure Payment', sub: 'Pay online via PhonePe', color: 'text-emerald-600 dark:text-emerald-400' },
              { icon: Heart, label: 'Handmade Quality', sub: 'Artisan crafted', color: 'text-purple-600 dark:text-purple-400' },
              { icon: Leaf, label: 'Eco-Friendly', sub: 'Natural jute', color: 'text-rose-600 dark:text-rose-400' },
            ].map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div key={i} className="flex items-center gap-3 sm:justify-center">
                  <Icon size={20} className={badge.color} />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 leading-tight">{badge.label}</p>
                    <p className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400">{badge.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 3. SHOP BY CATEGORY                           */}
      {/* ============================================ */}
      <section className="py-14 sm:py-20 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Shop by Occasion</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-2">Find your fit</h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2 max-w-xl mx-auto">
              Whether it's the office, campus or a gift — there's a handmade jute bag for every day.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
            {CATEGORY_CARDS.map((cat) => (
              <Link key={cat.id} to={cat.to} className="group relative block aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <img
                  src={cloudinaryTransform(cat.image, { w: 500, h: 660, c: 'fill' })}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <p className="font-serif text-base sm:text-lg font-bold text-white leading-tight">{cat.label}</p>
                  <p className="text-white/80 text-[11px] sm:text-xs mt-0.5 inline-flex items-center gap-1">
                    Shop now <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 4. OUR COLLECTION (the 12 catalogs)           */}
      {/* ============================================ */}
      <SignatureCollection />

      {/* ============================================ */}
      {/* 5. WHY CHOOSE THETIDBIT                        */}
      {/* ============================================ */}
      <section className="py-14 sm:py-20 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">Why Choose TheTidbit?</h2>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Premium handmade quality, everyday practicality, and pricing that makes sustainable fashion easy to choose.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative text-left p-6 sm:p-7 rounded-[22px] bg-gradient-to-b from-white to-stone-50 dark:from-stone-800 dark:to-stone-800/60 hover:shadow-lg dark:hover:shadow-stone-900/50 transition-all duration-300 border border-stone-200/90 dark:border-stone-700 group">
                  <p className="absolute top-3.5 right-4 text-[10px] font-bold tracking-[0.18em] text-stone-300 dark:text-stone-600">0{index + 1}</p>
                  <div className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className={item.color} />
                  </div>
                  <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2 pr-8">{item.title}</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 6. OUR STORY                                  */}
      {/* ============================================ */}
      <section id="our-story" className="py-14 sm:py-20 bg-stone-50 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] max-h-[560px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800 shadow-xl">
                <img
                  src={cloudinaryTransform('https://res.cloudinary.com/thetidbit23024/image/upload/v1771402371/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/customers/ChatGPT_Image_Feb_18_2026_01_41_42_PM_vqjxsc.png', { w: 600, h: 750, c: 'fill', q: 'auto:good' })}
                  alt="Founder of TheTidbit — sustainable jute bags for everyday women"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white dark:border-stone-800 shadow-lg bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
                <Leaf size={40} className="text-emerald-600 dark:text-emerald-400 sm:w-12 sm:h-12" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-full mb-5 text-sm font-semibold">Our Story</div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                How TheTidbit <span className="text-brand-green dark:text-brand-green/80">Started</span>
              </h2>
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                TheTidbit began with a simple idea: what if everyday women could carry bags that were stylish, affordable, and kind to the planet? We wanted to move away from fast fashion and plastic — and bring back the warmth of handmade, natural jute.
              </p>
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                We partner with skilled artisans across India to create bags designed for real life — office, college, travel, and gifting. Every piece is made with care, using sustainable jute that's durable, breathable, and 100% biodegradable.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 bg-white dark:bg-stone-800 px-4 py-2 rounded-full text-sm font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                  <Leaf size={16} className="text-emerald-500" /> Handmade in India
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white dark:bg-stone-800 px-4 py-2 rounded-full text-sm font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                  <Heart size={16} className="text-rose-500" /> For Everyday Women
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 7. STYLED BY REAL WOMEN (lifestyle gallery)   */}
      {/* ============================================ */}
      <section className="py-14 sm:py-20 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-400 px-4 py-2 rounded-full mb-4">
              <Camera size={16} />
              <span className="text-sm font-semibold">Real Women, Real Style</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">Styled by Real Women</h2>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">See how women across India style their TheTidbit bags every day.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {LIFESTYLE_TESTIMONIALS.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-[3/4] rounded-[26px] overflow-hidden border-[6px] border-white dark:border-stone-800 shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{ transform: `rotate(${index % 2 === 0 ? '-0.8deg' : '0.8deg'})` }}
              >
                <img
                  src={cloudinaryTransform(item.image, { w: 600, h: 800, c: 'fill' })}
                  alt={`TheTidbit bag styled by ${item.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                  <p className="text-white text-xs sm:text-sm font-semibold leading-snug mb-1.5 sm:mb-2 line-clamp-3">{item.quote}</p>
                  <p className="text-white/70 text-[10px] sm:text-xs font-semibold">— {item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STORIES / JOURNAL                             */}
      {/* ============================================ */}
      <section className="py-14 sm:py-20 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">
                Stories &amp; guides
              </h2>
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-xl">
                Buying guides, jute craft notes, and styling ideas for handmade handbags — built for real Indian daily life.
              </p>
            </div>
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:underline underline-offset-4"
            >
              View all stories <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.slice(0, 3).map((story) => (
              <Link
                key={story.id}
                to={`/stories/${story.slug}`}
                className="group rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 hover:shadow-lg transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={cloudinaryTransform(story.heroImage, { w: 800, h: 500, c: 'fill' })}
                    alt={story.heroImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-stone-400 mb-2">{story.readTime} min read</p>
                  <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-brand-green transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 line-clamp-2">{story.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 8. CUSTOMER REVIEWS                            */}
      {/* ============================================ */}
      <section id="reviews" className="py-14 sm:py-20 bg-stone-50 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-yellow-500 mb-3">
              {[0, 1, 2, 3, 4].map((i) => (<Star key={i} size={20} className="fill-current" />))}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              What our customers say
            </h2>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Real women across India sharing their everyday carry — also available on Amazon & Flipkart.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {CUSTOMER_REVIEWS.map((review) => (
              <div key={review.id} className="bg-white dark:bg-stone-800 rounded-[24px] p-5 sm:p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg dark:hover:shadow-stone-900/50 transition-all relative border-l-4 border-l-brand-green dark:border-l-emerald-400">
                <div className="absolute top-4 right-4 text-stone-200 dark:text-stone-700"><Quote size={24} /></div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-stone-300 dark:text-stone-600'} />
                  ))}
                </div>
                <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed mb-4 relative z-10">"{review.text}"</p>
                {review.photo && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700">
                    <img src={cloudinaryTransform(review.photo, { w: 400, h: 300, c: 'fill' })} alt={`Photo review by ${review.name}`} className="w-full h-40 sm:h-48 object-cover" loading="lazy" decoding="async" />
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-700">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-green dark:text-brand-green/80">{review.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-stone-900 dark:text-stone-100">{review.name}</p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                        {review.location}
                        {review.verified && (<><span className="mx-0.5">·</span><CheckCircle2 size={11} className="text-emerald-500" /><span className="text-emerald-600 dark:text-emerald-400">Verified</span></>)}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-400 dark:text-stone-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 sm:mt-16 pt-10 border-t border-stone-200 dark:border-stone-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '12+', label: 'Signature Styles' },
                { value: 'India', label: 'Handmade Here' },
                { value: 'Free', label: 'Shipping' },
                { value: 'Amazon', label: '& Flipkart' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 9. SEEN IN / MARKETPLACES                     */}
      {/* ============================================ */}
      <MarketplaceLinks />

      {/* ============================================ */}
      {/* 10. FIRST ORDER OFFER                          */}
      {/* ============================================ */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white dark:bg-stone-800 rounded-3xl shadow-xl dark:shadow-stone-900/50 border border-stone-200 dark:border-stone-700 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-brand-green to-emerald-600" />
            <div className="p-6 sm:p-10 lg:p-12 text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full mb-5 text-sm font-bold">
                <span className="animate-pulse-soft">🎉</span> Limited Time Offer
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">
                Get <span className="text-emerald-600 dark:text-emerald-400">₹100 Off</span> on Your First Order
              </h2>
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 mb-8 max-w-lg mx-auto">
                Join women who chose sustainable style. Enter your WhatsApp number and get your exclusive first-order code instantly.
              </p>
              {!offerSubmitted ? (
                <form onSubmit={handleOfferSubmit} className="max-w-md mx-auto">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">+91</div>
                      <input
                        ref={offerInputRef}
                        type="tel"
                        value={offerPhone}
                        onChange={(e) => setOfferPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="Enter WhatsApp number"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-colors text-base placeholder:text-stone-400"
                        required
                        pattern="[0-9]{10}"
                        title="Enter 10-digit mobile number"
                      />
                    </div>
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50 hover:shadow-xl transition-all active:scale-[0.98] flex items-center gap-2 whitespace-nowrap">
                      <Send size={16} />
                      <span className="hidden sm:inline">Claim Offer</span>
                      <span className="sm:hidden">Claim</span>
                    </button>
                  </div>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-3">We'll send your discount code on WhatsApp. No spam, ever.</p>
                </form>
              ) : (
                <div className="max-w-md mx-auto bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 size={32} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                  <p className="font-bold text-emerald-800 dark:text-emerald-300 text-lg mb-1">You're all set!</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400">Check your WhatsApp for the exclusive discount code. Happy shopping!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 11. INSTAGRAM + PROUDLY INDIAN                 */}
      {/* ============================================ */}
      <InstagramCTA />
      <IndiaPride />

      {/* Visible FAQs — paired with FAQPage JSON-LD (homepage only) */}
      <section className="py-14 sm:py-20 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800" aria-labelledby="home-faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="home-faq-heading" className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {SEO_FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-5 py-4"
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
            <Link to="/collections" className="text-brand-green font-semibold underline underline-offset-2">handmade bag collections</Link>
            {' '}or read{' '}
            <Link to="/stories" className="text-brand-green font-semibold underline underline-offset-2">buying guides</Link>.
          </p>
        </div>
      </section>

      <SEO schema={faqPageJsonLd()} />

      <MobileShopCTA />
    </>
  );
};

export default HomePage;
