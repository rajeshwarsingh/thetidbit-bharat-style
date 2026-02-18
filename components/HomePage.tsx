import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
  RefreshCcw,
  Quote,
  Send,
  Heart,
  Camera,
  CheckCircle2,
  Gift,
} from 'lucide-react';
import SEO from './SEO';
import { ALL_PRODUCTS, PRODUCT, HERO_BANNERS, WHATSAPP_NUMBER, REVIEWS, CATEGORY_CARD_IMAGES, PRODUCT_CATEGORIES, MARKETPLACE_LINKS } from '../constants';
import { cloudinaryTransform } from '../utils/cloudinary';
import InstagramCTA from './InstagramCTA';
import IndiaPride from './IndiaPride';
import MobileShopCTA from './MobileShopCTA';
import MarketplaceLinks from './MarketplaceLinks';

const HERO_IMAGE_DESKTOP = HERO_BANNERS[0] || PRODUCT.colors[0]?.images[0] || '';
const HERO_IMAGES_MOBILE = [
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433167/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-1_bvml1j.png',
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433168/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-2_buovfd.png',
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433169/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-3_e3aypr.png',
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433171/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-4_uwnrvc.png',
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771433169/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/mobile/mobile-hero-5_ycnxry.png',
  // 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771358511/thetidbit-homepage-hero/ChatGPT_Image_Feb_18_2026_01_31_30_AM_gx7bux.png',
  // 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771389271/thetidbit-homepage-hero/mobile_banner1_oavmhg.png',
  // 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771427669/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/home-page/ChatGPT_Image_Feb_18_2026_08_43_52_PM_dhtwzg.png',
  // 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771359882/thetidbit-homepage-hero/ChatGPT_Image_Feb_18_2026_01_54_19_AM_sctriv.png',
  // 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771360272/thetidbit-homepage-hero/ChatGPT_Image_Feb_18_2026_02_00_53_AM_rshrqh.png',
];

const BEST_SELLERS = ALL_PRODUCTS.slice(0, 4);

// Product usage / lifestyle section (Smart for Office, etc.)
const USAGE_FALLBACK = 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771358511/thetidbit-homepage-hero/ChatGPT_Image_Feb_18_2026_01_31_30_AM_gx7bux.png';
const USAGE_CARDS = [
  { title: 'Smart for Office', image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771424522/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/Usage%20pic/ChatGPT_Image_Feb_18_2026_07_51_50_PM_hhzozc.png' },
  { title: 'Perfect for Shopping', image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771424510/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/Usage%20pic/ChatGPT_Image_Feb_18_2026_07_49_31_PM_wzylky.png' },
  { title: 'Ideal for Gifting', image: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771424509/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/Usage%20pic/ChatGPT_Image_Feb_18_2026_07_49_25_PM_laxnfj.png' },
].map((c) => ({ ...c, image: c.image || USAGE_FALLBACK }));

const MARKETPLACE_LOGOS = [
  { name: 'Amazon', url: MARKETPLACE_LINKS.amazon, logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Flipkart', url: MARKETPLACE_LINKS.flipkart, logoSrc: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1768550284/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/logo/2_kr0mbs.svg' },
  { name: 'Meesho', url: MARKETPLACE_LINKS.meesho, logoSrc: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1768550283/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/logo/1_m7ljon.svg' },
];

const BESTSELLER_SECTION_IMAGE =
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771426858/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/Usage%20pic/best_seller_banner_rmv9nz.png';

const LOW_STOCK_MAP: Record<string, number> = {
  [ALL_PRODUCTS[0]?.id || '']: 7,
  [ALL_PRODUCTS[1]?.id || '']: 4,
  [ALL_PRODUCTS[2]?.id || '']: 11,
  [ALL_PRODUCTS[3]?.id || '']: 3,
};

// Get category display name from slug (e.g. "sling-bag-rounded" -> "Sling Bag Rounded")
const slugToCategoryName = (slug: string): string =>
  slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

// Products per category (filter only)
const getProductsByCategory = (categorySlug: string) => {
  const categoryName = slugToCategoryName(categorySlug);
  return ALL_PRODUCTS.filter((p) => {
    const last = p.category[p.category.length - 1];
    return last && last.toLowerCase() === categoryName.toLowerCase();
  });
};

// Show 4–6 cards per category; Handbag: 2 rows only (12 items in 6-col grid). Use color variants; no mixing.
type CategoryDisplayItem = { product: typeof ALL_PRODUCTS[number]; colorIndex: number };

const HANDBAG_TWO_ROWS = 12; // 2 rows × 6 cols on xl

const getCategoryDisplayItems = (categorySlug: string): CategoryDisplayItem[] => {
  const products = getProductsByCategory(categorySlug);
  const items: CategoryDisplayItem[] = [];
  const isHandbag = categorySlug === 'handbag';
  const targetMin = 4;
  const targetMax = isHandbag ? HANDBAG_TWO_ROWS : 6;

  for (const p of products) {
    if (!p.colors?.length) continue;
    const defaultColorOrder = p.colors.map((_, idx) => idx);
    const colorOrder =
      categorySlug === 'sling-bag' && p.id === 'jute-sling-bag-001'
        ? (() => {
            const blockedColorIds = new Set(['mikey-pink', 'mikey-purple']);
            const allowedColorOrder = defaultColorOrder.filter(
              (idx) => !blockedColorIds.has(p.colors[idx]?.id || '')
            );
            const preferredIndex = allowedColorOrder.find(
              (idx) => p.colors[idx]?.id === 'yellow-mate'
            );
            if (preferredIndex == null) return allowedColorOrder;
            return [
              preferredIndex,
              ...allowedColorOrder.filter((idx) => idx !== preferredIndex),
            ];
          })()
        : defaultColorOrder;

    for (const c of colorOrder) {
      if (items.length >= targetMax) break;
      items.push({ product: p, colorIndex: c });
    }
    if (items.length >= targetMax) break;
  }

  return (items.length < targetMin && !isHandbag ? items : items.slice(0, targetMax));
};

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

const EVERYDAY_LIFE_BLOCKS = [
  {
    icon: Briefcase,
    title: 'Smart for Office',
    description: 'Carries your essentials without looking bulky.',
  },
  {
    icon: ShoppingBag,
    title: 'Perfect for Shopping',
    description: 'Lightweight and easy to carry all day.',
  },
  {
    icon: Gift,
    title: 'Ideal for Gifting',
    description: 'Safe, elegant and meaningful.',
  },
  {
    icon: Feather,
    title: 'Everyday Lightweight Companion',
    description: 'Designed for real daily use.',
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

const INDIA_TESTIMONIAL_CARDS = [
  {
    id: 'neha-pune',
    text: 'Lightweight and perfect for daily use.',
    author: 'Neha, Pune',
  },
  {
    id: 'ritu-delhi',
    text: 'Got it as a gift and she loved it!',
    author: 'Ritu, Delhi',
  },
  {
    id: 'sneha-mumbai',
    text: 'Looks simple but very classy.',
    author: 'Sneha, Mumbai',
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
    hasPhoto: true,
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
    hasPhoto: true,
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
    hasPhoto: true,
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
    hasPhoto: true,
    photo: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1771396784/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/happy%20customer/4_happy_customer_cwlwg2.png',
  },
];

const HERO_SLIDE_INTERVAL = 6000;
const HERO_VALUE_POINTS = [
  'Starting at ₹499',
  'Handmade in India',
  'COD + Easy Returns',
];

// Founder / Our Story — replace with your details and image URL
const FOUNDER = {
  name: 'Our Founder',
  image:
    'https://res.cloudinary.com/thetidbit23024/image/upload/v1771394105/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/customers/customer1_n3htyo.png',
  // Optional: short quote to show under the image or in the section
  quote: 'Sustainable style that doesn\'t cost the earth.',
};

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
      window.gtag('event', 'first_order_offer_submit', {
        placement: 'homepage_offer_section',
      });
    }
  };

  return (
    <>
      <SEO
        title="TheTidbit — Handmade Jute Bags | Sustainable Indian Fashion"
        description="Shop handmade jute bags from TheTidbit. Eco-friendly, stylish, and affordable — designed for everyday Indian women. Free shipping over ₹499. COD available."
        canonicalUrl="https://thetidbit.in/"
        type="website"
        image={HERO_IMAGE_DESKTOP}
      />

      {/* ============================================ */}
      {/* 1. HERO SECTION                              */}
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
              className="w-full h-full object-cover object-[65%_40%]"
              loading="eager"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
              <div className="max-w-xl lg:max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                  <Leaf size={14} className="text-green-300" />
                  <span className="text-xs font-semibold text-white/90 tracking-wide uppercase">
                    Handcrafted & Sustainable
                  </span>
                </div>

                <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-5">
                  Carry Better. Look Better.
                </h1>

                <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-4 max-w-xl">
                  Handcrafted jute bags for office, college, gifting, and everyday life - made for women who choose mindful style.
                </p>

                <p className="text-sm lg:text-base text-emerald-200/95 font-semibold mb-7">
                  Trusted by 1000+ women across India
                </p>

                <div className="flex flex-wrap gap-2.5 mb-8">
                  {HERO_VALUE_POINTS.map((point) => (
                    <span
                      key={point}
                      className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm"
                    >
                      {point}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mb-8">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2.5 bg-white text-stone-900 px-7 py-3.5 rounded-xl font-bold text-base hover:bg-stone-50 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ShoppingBag size={18} />
                    Shop Bestsellers
                  </Link>
                  <a
                    href="#best-sellers"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-white/20 transition-all"
                  >
                    Explore Styles
                    <ArrowRight size={16} />
                  </a>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-emerald-300" />
                    Cash on Delivery
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck size={15} className="text-emerald-300" />
                    Free Shipping Over ₹499
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RefreshCcw size={15} className="text-emerald-300" />
                    Easy Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile hero — compact, product-forward layout with slider */}
        <div className="sm:hidden">
          {/* Hero slider — taller but not full screen, lets content peek below */}
          <div
            className="relative h-[72vh] min-h-[480px] max-h-[640px] overflow-hidden"
            onTouchStart={handleHeroTouchStart}
            onTouchMove={handleHeroTouchMove}
            onTouchEnd={handleHeroTouchEnd}
          >
            {/* Slide track */}
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${heroSlide * 100}%)` }}
            >
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
                    alt={
                      idx === 0
                        ? 'Modern Indian woman confidently carrying a handmade jute bag by TheTidbit'
                        : idx === 1
                        ? 'TheTidbit handmade jute bags — sustainable fashion for everyday Indian women'
                        : 'Stylish handmade jute bags by TheTidbit — eco-friendly accessories for Indian women'
                    }
                    className="w-full h-full object-cover object-center"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/5" />
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-[120px] left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {HERO_IMAGES_MOBILE.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setHeroSlide(idx); resetHeroAutoplay(); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === heroSlide
                      ? 'bg-white w-5'
                      : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Overlay CTA — emotional, usage-driven */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-20 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10">
              <h1 className="font-serif text-[22px] font-bold text-white leading-tight mb-1.5">
                Everyday Bags for{' '}
                <span className="text-emerald-300">Real Life</span>
              </h1>
              <p className="text-[13px] text-white/70 tracking-wide mb-2">
                Office &nbsp;•&nbsp; College &nbsp;•&nbsp; Daily Outings &nbsp;•&nbsp; Gifting
              </p>
              <p className="text-[17px] font-bold text-white mb-1.5">
                Starting at <span className="text-emerald-300">₹499</span>
              </p>
              <p className="text-[11px] text-white/60 mb-3.5 tracking-wide">
                Handmade Pieces &nbsp;•&nbsp; Limited Availability
              </p>
              <Link
                to="/products"
                className="flex items-center justify-center gap-2 w-full bg-white text-stone-900 py-3 rounded-xl font-bold text-sm shadow-lg active:scale-[0.98] transition-transform"
              >
                <ShoppingBag size={16} />
                Shop Bestsellers
              </Link>
            </div>
          </div>

          {/* Mobile category quick-links — use CATEGORY_CARD_IMAGES for consistent category card images */}
          <div className="bg-white dark:bg-stone-900 px-3 py-3 border-b border-stone-100 dark:border-stone-800">
            <div className="grid grid-cols-5 gap-1">
              {BEST_SELLERS.map((p) => {
                const cardImage =
                  CATEGORY_CARD_IMAGES[p.id] ||
                  (() => {
                    const preferredColor = p.colors.find((c) => c.id === 'yellow-mate');
                    const colorForThumb = preferredColor || p.colors[0];
                    return colorForThumb?.images[1] || colorForThumb?.images[0] || '';
                  })();
                const thumb = cardImage;
                const displayName = p.name
                  .replace('Handmade Jute ', '')
                  .replace('Embroidered ', '');
                return (
                  <Link
                    key={p.id}
                    to={`/products/${p.id}`}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div className="w-[56px] h-[56px] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 group-active:border-brand-green transition-colors shadow-sm">
                      <img
                        src={cloudinaryTransform(thumb, { w: 128, h: 128, c: 'fill' })}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                    <span className="text-[9px] font-semibold text-stone-600 dark:text-stone-300 text-center leading-tight line-clamp-1">
                      {displayName}
                    </span>
                  </Link>
                );
              })}
              <Link
                to="/products"
                className="flex flex-col items-center gap-1"
              >
                <div className="w-[56px] h-[56px] rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 flex items-center justify-center shadow-sm">
                  <ArrowRight size={18} className="text-stone-500 dark:text-stone-400" />
                </div>
                <span className="text-[9px] font-semibold text-stone-600 dark:text-stone-300 text-center leading-tight">
                  View All
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile trust strip */}
          <div className="bg-stone-50 dark:bg-stone-950 px-4 py-2.5 flex justify-between text-[11px] text-stone-600 dark:text-stone-400 font-semibold border-b border-stone-100 dark:border-stone-800">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-500" />
              Handmade in India
            </span>
            <span className="flex items-center gap-1">
              <Truck size={12} className="text-emerald-500" />
              Free Shipping ₹499+
            </span>
            <span className="flex items-center gap-1">
              <RefreshCcw size={12} className="text-emerald-500" />
              Easy Returns
            </span>
          </div>

          {/* Emotional section */}
          <div className="bg-white dark:bg-stone-900 px-5 py-6 text-center border-b border-stone-100 dark:border-stone-800">
            <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
              Carry Confidence. Carry Comfort.
            </h2>
            <p className="text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs mx-auto">
              Not just a bag —<br />
              a simple everyday companion for women who move, work, travel, and live fully.
            </p>
          </div>

          {/* Use-case section */}
          <div className="bg-stone-50 dark:bg-stone-950 px-5 py-5 border-b border-stone-100 dark:border-stone-800">
            <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200 text-center mb-3">
              One Bag. Every Day.
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {['Office Ready', 'College Friendly', 'Travel Light', 'Perfect for Gifting'].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white dark:bg-stone-800 rounded-lg px-3 py-2.5 border border-stone-100 dark:border-stone-700">
                  <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-[12px] font-semibold text-stone-700 dark:text-stone-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brand authenticity strip */}
          <div className="bg-white dark:bg-stone-900 px-5 py-5 text-center border-b border-stone-100 dark:border-stone-800">
            <p className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1.5">
              Proudly Handmade in India
            </p>
            <p className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs mx-auto">
              Crafted by skilled artisans using sustainable jute — bringing together simplicity, durability, and everyday beauty.
            </p>
          </div>

          {/* Micro urgency strip */}
          <div className="bg-amber-50 dark:bg-amber-950/30 px-4 py-2.5 text-center border-b border-amber-100 dark:border-amber-900/50">
            <p className="text-[11px] font-bold text-amber-700 dark:text-amber-400 tracking-wide">
              Limited Handmade Stock Available
            </p>
          </div>
        </div>
      </section>

      

      {/* ——— Product usage / lifestyle (3 cards) ——— */}
      <section className="py-14 sm:py-20 bg-stone-50 dark:bg-stone-950" aria-labelledby="usage-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 id="usage-heading" className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Made for Your Real Day
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
              From weekday commutes to weekend outings - these are styles you will actually use on repeat.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {USAGE_CARDS.map(({ title, image }, index) => (
              <div
                key={title}
                className={`group relative flex flex-col overflow-hidden border border-stone-200/90 dark:border-stone-700/80 bg-white dark:bg-stone-900 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(15,23,42,0.7)] ${
                  index % 2 === 0
                    ? 'rounded-[28px] sm:rounded-[32px]'
                    : 'rounded-[20px] sm:rounded-[24px]'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={cloudinaryTransform(image, { w: 800 })}
                    alt={title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 dark:bg-stone-900/85 backdrop-blur-sm px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wide text-stone-700 dark:text-stone-200">
                    DAILY USE
                  </span>
                </div>
                <div className="h-14 sm:h-16 flex items-center justify-center bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 dark:from-stone-700 dark:via-stone-600 dark:to-stone-700 shrink-0">
                  <p className="text-white font-semibold text-base sm:text-lg text-center px-3 tracking-wide">
                    {title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Seen In + Our Bestsellers visual section (new) ——— */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#f3e9dc] to-[#efe3d3] dark:from-stone-900 dark:to-stone-950 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl border border-stone-200/90 dark:border-stone-700/80 bg-[#f9f1e6]/95 dark:bg-stone-800/60 shadow-[0_14px_40px_-22px_rgba(20,20,20,0.45)] overflow-hidden">
            <div className="px-4 sm:px-8 lg:px-10 pt-7 sm:pt-9 pb-6 border-b border-stone-300/70 dark:border-stone-700/80">
              <p className="text-center text-[11px] sm:text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-4 font-semibold">
                Seen In
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
                {MARKETPLACE_LOGOS.map(({ name, url, logoSrc }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`The Tidbit on ${name}`}
                    className="group inline-flex items-center justify-center h-12 sm:h-14 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-stone-900/85 border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <img
                      src={logoSrc}
                      alt={name}
                      className="h-5 sm:h-6 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="px-4 sm:px-8 lg:px-10 py-7 sm:py-9">
              <div className="text-center mb-5 sm:mb-7">
                <h3 className="font-serif text-[30px] sm:text-5xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
                  Bestsellers Women Keep Reordering
                </h3>
                <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2">
                  Most-loved handmade picks for everyday Indian women.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-stone-300/80 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 shadow-md">
                <img
                  src={cloudinaryTransform(BESTSELLER_SECTION_IMAGE, { w: 2400, q: 'auto:best' })}
                  alt="TheTidbit bestsellers showcase"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
                <div className="absolute left-4 sm:left-6 bottom-3.5 sm:bottom-5 text-white">
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.15em] text-white/80 font-semibold">
                    Limited Handmade Stock
                  </p>
                  <p className="font-serif text-lg sm:text-2xl font-semibold">Starting at ₹499</p>
                </div>
              </div>

              <div className="flex justify-center mt-6 sm:mt-8">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center min-w-[190px] px-7 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-base sm:text-lg font-semibold shadow-lg transition-colors"
                >
                  Shop Bestsellers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar (desktop only — mobile has inline trust strip in hero flow) */}
      <section className="hidden sm:block bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {[
              { icon: Truck, label: 'Free Delivery', sub: 'Over ₹499', color: 'text-blue-600 dark:text-blue-400' },
              { icon: ShieldCheck, label: 'Cash on Delivery', sub: 'Pay at your door', color: 'text-emerald-600 dark:text-emerald-400' },
              { icon: RefreshCcw, label: 'Easy Returns', sub: '10-day policy', color: 'text-purple-600 dark:text-purple-400' },
              { icon: Heart, label: 'Handmade in India', sub: 'Artisan crafted', color: 'text-rose-600 dark:text-rose-400' },
            ].map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div key={i} className="flex items-center gap-3 sm:justify-center">
                  <Icon size={20} className={badge.color} />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 leading-tight">
                      {badge.label}
                    </p>
                    <p className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400">{badge.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 2. BEST SELLERS SECTION                      */}
      {/* ============================================ */}
      <section id="best-sellers" className="py-14 sm:py-20 bg-gradient-to-b from-stone-50 to-stone-100/70 dark:from-stone-950 dark:to-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="inline-flex items-center gap-2 rounded-full border border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-800/70 px-4 py-1.5 text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300 mb-4">
              Trusted by 1000+ women across India
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Bestselling Styles That Sell Fast <span className="text-red-500">&#10084;&#65039;</span>
            </h2>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Handpicked designs with premium handcrafted detail, practical storage, and everyday comfort.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {BEST_SELLERS.map((product, index) => {
              const preferredColor =
                index === 1
                  ? product.colors.find((color) => color.id === 'yellow-mate') || product.colors[0]
                  : product.colors[0];
              const primaryImage = preferredColor?.images[0] || preferredColor?.images[1] || product.colors[0]?.images[0] || '';
              const productUrl = preferredColor?.id
                ? `/products/${product.id}?color=${encodeURIComponent(preferredColor.id)}`
                : `/products/${product.id}`;
              const displayName = index === 0 ? product.name.replace(/\bHandmade\s*/i, '') : product.name;
              const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
              const lowStock = LOW_STOCK_MAP[product.id];

              return (
                <Link
                  key={product.id}
                  to={productUrl}
                  className="group block bg-white dark:bg-stone-800 rounded-[26px] overflow-hidden shadow-[0_14px_34px_-24px_rgba(120,53,15,0.45)] dark:shadow-stone-900/50 hover:shadow-[0_26px_50px_-26px_rgba(120,53,15,0.55)] transition-all duration-300 border border-amber-100/80 dark:border-stone-700 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-900">
                    <img
                      src={cloudinaryTransform(primaryImage, { w: 600 })}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Bestseller Badge */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-amber-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star size={10} className="fill-white" />
                      Bestseller
                    </div>

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md">
                        {discount}% OFF
                      </div>
                    )}

                    {/* Low Stock Indicator */}
                    {lowStock && lowStock <= 12 && (
                      <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 bg-red-50 dark:bg-red-950/70 text-red-700 dark:text-red-400 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-red-200 dark:border-red-800 animate-pulse-soft">
                        Only {lowStock} Left
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3.5 sm:p-5">
                    <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mb-1 line-clamp-2 group-hover:text-brand-green dark:group-hover:text-brand-green/80 transition-colors leading-snug">
                      {displayName}
                    </h3>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium">
                        4.8 (120+)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 sm:gap-2 mb-2">
                      <span className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                        ₹{product.price}
                      </span>
                      {product.mrp > product.price && (
                        <span className="text-xs sm:text-sm text-stone-400 line-through">₹{product.mrp}</span>
                      )}
                    </div>

                    {/* Color note (cleaner than showing all swatches) */}
                    <p className="mb-3 text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {index === 1
                        ? `Featured shade: ${preferredColor?.name || 'Yellow Mate'}`
                        : `${product.colors.length}+ shades available`}
                    </p>

                    {/* CTA */}
                    <div className="w-full border border-stone-900/15 dark:border-stone-100/20 bg-amber-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 pointer-events-none">
                      <ShoppingBag size={14} />
                      View Details
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold text-base hover:text-brand-green dark:hover:text-brand-green/80 transition-colors underline underline-offset-4 decoration-2 decoration-stone-300 dark:decoration-stone-600 hover:decoration-brand-green"
            >
              View All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SHOP BY CATEGORY — one section per category   */}
      {/* ============================================ */}
      {PRODUCT_CATEGORIES.map((cat) => {
        const displayItems = getCategoryDisplayItems(cat.slug);
        if (displayItems.length === 0) return null;
        return (
          <section
            key={cat.id}
            id={`category-${cat.slug}`}
            className="py-14 sm:py-20 bg-white dark:bg-stone-900"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100">
                    {cat.name}
                  </h2>
                  <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 mt-1">
                    Find your fit in this collection - {displayItems.length} ready-to-ship options
                  </p>
                </div>
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="inline-flex items-center gap-2 text-brand-green dark:text-brand-green/80 font-semibold text-sm hover:underline"
                >
                  View all in {cat.name}
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5">
                {displayItems.map(({ product, colorIndex }) => {
                  const color = product.colors[colorIndex];
                  const primaryImage = color?.images[0] || color?.images[1] || product.colors[0]?.images[0] || '';
                  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
                  const lowStock = LOW_STOCK_MAP[product.id];
                  const colorName = color?.name ?? '';
                  const itemKey = `${product.id}-${colorIndex}`;
                  const productUrl = color?.id ? `/products/${product.id}?color=${encodeURIComponent(color.id)}` : `/products/${product.id}`;
                  return (
                    <Link
                      key={itemKey}
                      to={productUrl}
                      className="group block bg-white dark:bg-stone-800/60 rounded-[18px] overflow-hidden shadow-sm hover:shadow-lg dark:shadow-stone-900/40 dark:hover:shadow-stone-900/65 transition-all duration-300 border border-stone-200 dark:border-stone-700/80 hover:border-brand-green/30"
                    >
                      <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-900">
                        <img
                          src={cloudinaryTransform(primaryImage, { w: 600 })}
                          alt={colorName ? `${product.name} — ${colorName}` : product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                        {discount > 0 && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                            {discount}% OFF
                          </div>
                        )}
                        {colorName && (
                          <div className="absolute top-2 right-2 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm text-stone-800 dark:text-stone-200 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full">
                            {colorName}
                          </div>
                        )}
                        {lowStock != null && lowStock <= 12 && (
                          <div className="absolute bottom-2 left-2 bg-red-50 dark:bg-red-950/70 text-red-700 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200 dark:border-red-800">
                            Only {lowStock} Left
                          </div>
                        )}
                      </div>
                      <div className="p-3 sm:p-4 border-t border-dashed border-stone-200 dark:border-stone-700">
                        <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 line-clamp-2 group-hover:text-brand-green dark:group-hover:text-brand-green/80 transition-colors leading-snug">
                          {product.name}
                        </h3>
                        {colorName && (
                          <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                            {colorName}
                          </p>
                        )}
                        <div className="flex items-baseline gap-1.5 mt-1.5 mb-2">
                          <span className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                            ₹{product.price}
                          </span>
                          {product.mrp > product.price && (
                            <span className="text-xs text-stone-400 line-through">₹{product.mrp}</span>
                          )}
                        </div>
                        <div className="w-full bg-stone-100 dark:bg-stone-700/80 text-stone-800 dark:text-stone-100 py-2 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5">
                          <ShoppingBag size={14} />
                          Quick View
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ============================================ */}
      {/* 3. WHY CHOOSE THETIDBIT SECTION              */}
      {/* ============================================ */}
      <section className="py-14 sm:py-20 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Why Choose TheTidbit?
            </h2>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Premium handmade quality, everyday practicality, and pricing that makes sustainable fashion easy to choose.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="relative text-left p-6 sm:p-7 rounded-[22px] bg-gradient-to-b from-white to-stone-50 dark:from-stone-800 dark:to-stone-800/60 hover:shadow-lg dark:hover:shadow-stone-900/50 transition-all duration-300 border border-stone-200/90 dark:border-stone-700 group"
                >
                  <p className="absolute top-3.5 right-4 text-[10px] font-bold tracking-[0.18em] text-stone-300 dark:text-stone-600">
                    0{index + 1}
                  </p>
                  <div
                    className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
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
      {/* MADE FOR YOUR EVERYDAY LIFE                  */}
      {/* ============================================ */}
      <section className="py-14 sm:py-20 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              Made for Your Everyday Life
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {EVERYDAY_LIFE_BLOCKS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/80"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-600 flex items-center justify-center">
                    <Icon size={20} className="text-stone-600 dark:text-stone-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm sm:text-base mb-1 flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="flex-shrink-0 text-emerald-500" />
                      {item.title}
                    </p>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* OUR STORY — Founder & How It Started          */}
      {/* ============================================ */}
      <section id="our-story" className="py-14 sm:py-20 bg-stone-50 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Founder image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] max-h-[560px] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800 shadow-xl">
                <img
                  src={cloudinaryTransform(
                    'https://res.cloudinary.com/thetidbit23024/image/upload/v1771402371/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/customers/ChatGPT_Image_Feb_18_2026_01_41_42_PM_vqjxsc.png',
                    { w: 600, h: 750, c: 'fill', q: 'auto:good' }
                  )}
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

            {/* Story content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-full mb-5 text-sm font-semibold">
                Our Story
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                How TheTidbit <span className="text-brand-green dark:text-brand-green/80">Started</span>
              </h2>
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                TheTidbit began with a simple idea: what if everyday women could carry bags that were stylish, affordable, and kind to the planet? We wanted to move away from fast fashion and plastic — and bring back the warmth of handmade, natural jute.
              </p>
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                We partnered with skilled artisans across India to create bags designed for real life — office, college, travel, and gifting. Every piece is made with care, using sustainable jute that’s durable, breathable, and 100% biodegradable.
              </p>
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                Today, we’re proud to be part of the daily style of thousands of women. Our mission stays the same: sustainable style that doesn’t cost the earth — or your wallet.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 bg-white dark:bg-stone-800 px-4 py-2 rounded-full text-sm font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                  <Leaf size={16} className="text-emerald-500" />
                  Handmade in India
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white dark:bg-stone-800 px-4 py-2 rounded-full text-sm font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                  <Heart size={16} className="text-rose-500" />
                  For Everyday Women
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 4. LIFESTYLE / SOCIAL PROOF SECTION           */}
      {/* ============================================ */}
      <section className="py-14 sm:py-20 bg-stone-50 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-400 px-4 py-2 rounded-full mb-4">
              <Camera size={16} />
              <span className="text-sm font-semibold">Real Women, Real Style</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Styled by Real Women
            </h2>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              See how women across India are styling their TheTidbit bags every day
            </p>
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
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Testimonial overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                  <p className="text-white text-xs sm:text-sm font-semibold leading-snug mb-1.5 sm:mb-2 line-clamp-3">
                    {item.quote}
                  </p>
                  <p className="text-white/70 text-[10px] sm:text-xs font-semibold">— {item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 5. QUICK TESTIMONIALS                        */}
      {/* ============================================ */}
      <section className="py-14 sm:py-18 bg-[#fdfaf6] dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Loved by Women Across India ❤️
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
              Simple, real feedback from everyday customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {INDIA_TESTIMONIAL_CARDS.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl bg-white/90 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 p-5 sm:p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-amber-500 mb-3">⭐️⭐️⭐️⭐️⭐️</p>
                <p className="text-base text-stone-800 dark:text-stone-200 leading-relaxed mb-4">
                  "{item.text}"
                </p>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400">— {item.author}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 6. CUSTOMER REVIEWS SECTION                  */}
      {/* ============================================ */}
      <section id="reviews" className="py-14 sm:py-20 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-yellow-500 mb-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={20} className="fill-current" />
              ))}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Loved by <span className="text-brand-green dark:text-brand-green/80">1000+</span> Happy Customers
            </h2>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Real reviews from real women who chose sustainable style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {CUSTOMER_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-gradient-to-b from-white to-stone-50 dark:from-stone-800 dark:to-stone-800/70 rounded-[24px] p-5 sm:p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg dark:hover:shadow-stone-900/50 transition-all relative border-l-4 border-l-brand-green dark:border-l-emerald-400"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-stone-200 dark:text-stone-700">
                  <Quote size={24} />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-stone-300 dark:text-stone-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed mb-4 relative z-10">
                  "{review.text}"
                </p>

                {/* Photo Review */}
                {review.hasPhoto && review.photo && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700">
                    <img
                      src={cloudinaryTransform(review.photo, { w: 400, h: 300, c: 'fill' })}
                      alt={`Photo review by ${review.name}`}
                      className="w-full h-40 sm:h-48 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-700">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-green dark:text-brand-green/80">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-stone-900 dark:text-stone-100">{review.name}</p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                        {review.location}
                        {review.verified && (
                          <>
                            <span className="mx-0.5">·</span>
                            <CheckCircle2 size={11} className="text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400">Verified</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-400 dark:text-stone-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Stats */}
          <div className="mt-12 sm:mt-16 pt-10 border-t border-stone-200 dark:border-stone-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '1000+', label: 'Happy Customers' },
                { value: '4.8★', label: 'Average Rating' },
                { value: '98%', label: 'Would Recommend' },
                { value: '5000+', label: 'Bags Sold' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SHOP ON AMAZON, FLIPKART & MEESHO — trust    */}
      {/* ============================================ */}
      <MarketplaceLinks />

      {/* ============================================ */}
      {/* 6. FIRST ORDER OFFER SECTION                 */}
      {/* ============================================ */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white dark:bg-stone-800 rounded-3xl shadow-xl dark:shadow-stone-900/50 border border-stone-200 dark:border-stone-700 overflow-hidden">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-brand-green to-emerald-600" />

            <div className="p-6 sm:p-10 lg:p-12 text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full mb-5 text-sm font-bold">
                <span className="animate-pulse-soft">🎉</span>
                Limited Time Offer
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-3">
                Get <span className="text-emerald-600 dark:text-emerald-400">₹100 Off</span> on Your First Order
              </h2>

              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 mb-8 max-w-lg mx-auto">
                Join 1000+ women who chose sustainable style. Enter your WhatsApp number and get your exclusive first-order code instantly.
              </p>

              {!offerSubmitted ? (
                <form onSubmit={handleOfferSubmit} className="max-w-md mx-auto">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">
                        +91
                      </div>
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
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50 hover:shadow-xl transition-all active:scale-[0.98] flex items-center gap-2 whitespace-nowrap"
                    >
                      <Send size={16} />
                      <span className="hidden sm:inline">Claim Offer</span>
                      <span className="sm:hidden">Claim</span>
                    </button>
                  </div>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-3">
                    We'll send your discount code on WhatsApp. No spam, ever.
                  </p>
                </form>
              ) : (
                <div className="max-w-md mx-auto bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 size={32} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                  <p className="font-bold text-emerald-800 dark:text-emerald-300 text-lg mb-1">
                    You're all set!
                  </p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400">
                    Check your WhatsApp for the exclusive discount code. Happy shopping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 7. INSTAGRAM & COMMUNITY                     */}
      {/* ============================================ */}
      <InstagramCTA />

      {/* ============================================ */}
      {/* 8. PROUDLY INDIAN                            */}
      {/* ============================================ */}
      <IndiaPride />

      {/* ============================================ */}
      {/* MOBILE STICKY SHOP CTA                       */}
      {/* ============================================ */}
      <MobileShopCTA />
    </>
  );
};

export default HomePage;
