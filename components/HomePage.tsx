import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Sparkles, ChevronLeft, ChevronRight, Star, Users, Leaf, Hand, PackageCheck, ShieldCheck } from 'lucide-react';
import SEO from './SEO';
import ProductCard from './ProductCard';
import { PRODUCT, HANDBAG_PRODUCT, ALL_PRODUCTS, PRODUCT_CATEGORIES, SOCIAL_LINKS, HERO_BANNERS, getProductByCategory, CATEGORY_IMAGES, AMAZON_PRODUCT_URL, SLING_BAG_PRODUCT_1 } from '../constants';
import { cloudinaryTransform } from '../utils/cloudinary';
import InstagramCTA from './InstagramCTA';
import IndiaPride from './IndiaPride';
import MarketplaceLinks from './MarketplaceLinks';
import GiftingSection from './GiftingSection';
import TrustBadges from './TrustBadges';
import HomeTestimonials from './HomeTestimonials';

// Limit to 3 slides only
const SLIDER_BANNERS = HERO_BANNERS.slice(0, 3);

// Slide content configuration
const SLIDE_CONTENT = [
  {
    // Slide 1: Core Brand Promise
    h1: "Eco-Friendly Handmade Jute Bags for Everyday Indian Women",
    subtext: "Lightweight, durable & affordable — perfect for office, travel & gifting.",
    primaryCTA: "Shop Best Sellers",
    primaryCTALink: "/products",
    secondaryCTA: "View Real Customer Photos",
    secondaryCTALink: "/stories",
    trustLine: "COD Available • Free Shipping Across India • Easy Returns",
    badge: null,
  },
  {
    // Slide 2: Social Proof & Trust
    h1: "Loved by Real Women Across India",
    subtext: "Thousands of customers trust TheTidbit for stylish, sustainable bags.",
    primaryCTA: "See Customer Reviews",
    primaryCTALink: "#reviews",
    secondaryCTA: "Explore Collection",
    secondaryCTALink: "/products",
    trustLine: "Handcrafted in India 🇮🇳 | Eco-Friendly Materials",
    badge: null,
  },
  {
    // Slide 3: Use Case / Lifestyle
    h1: "Perfect Bags for Office, Travel & Gifting",
    subtext: "Designed for daily use — stylish, practical, and planet-friendly.",
    primaryCTA: "Browse Handbags & Sling Bags",
    primaryCTALink: "/products",
    secondaryCTA: "Find Your Perfect Bag",
    secondaryCTALink: "/products",
    trustLine: null,
    badge: "Great for Daily Use & Gifting 🎁",
  },
];

const HomePage: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Auto-rotate banners - 6-7 seconds interval
  useEffect(() => {
    if (isPaused) return;
    
    const delay = 6500; // 6.5 seconds
    
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % SLIDER_BANNERS.length);
    }, delay);

    return () => clearInterval(interval);
  }, [currentBannerIndex, isPaused]);

  const goToNextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % SLIDER_BANNERS.length);
  };

  const goToPrevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + SLIDER_BANNERS.length) % SLIDER_BANNERS.length);
  };

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNextBanner();
    } else if (distance < -minSwipeDistance) {
      goToPrevBanner();
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Featured products (first 6 products, or use PRODUCT if ALL_PRODUCTS is empty)
  const featuredProducts = ALL_PRODUCTS.length > 1 ? ALL_PRODUCTS.slice(0, 6) : [PRODUCT];
  
  // Get products by category
  const slingBagProducts = ALL_PRODUCTS.filter(p => 
    p.category.some(c => c.toLowerCase().includes('sling bag') && !c.toLowerCase().includes('rounded'))
  ).slice(0, 4);
  
  const roundedSlingProducts = ALL_PRODUCTS.filter(p => 
    p.category.some(c => c.toLowerCase().includes('sling bag rounded'))
  ).slice(0, 4);
  
  const handbagProducts = ALL_PRODUCTS.filter(p => 
    p.category.some(c => c.toLowerCase().includes('handbag'))
  ).slice(0, 4);

  const heroImage = SLIDER_BANNERS[currentBannerIndex] || PRODUCT.colors[0]?.images[0] || '';
  const craftedFeatureImage =
    'https://res.cloudinary.com/thetidbit23024/image/upload/v1768548513/yello_mate_rf99sg.png';

  return (
    <>
      <SEO 
        title="TheTidbit - Handmade Jute Bags | Sustainable Fashion"
        description="Shop beautiful handmade jute bags from TheTidbit. Eco-friendly, artistic, and sustainable fashion. Sling bags, rounded sling bags, and handbags. Free delivery across India."
        canonicalUrl="https://bharat.style/"
        type="website"
        image={heroImage}
      />

      {/* Hero Section with CRO-Focused Slider */}
      <section 
        className="relative overflow-hidden h-[100dvh] min-h-[100dvh] sm:h-auto sm:min-h-0 sm:-mt-[100px] bg-white dark:bg-stone-900"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full h-full min-h-[100dvh] sm:aspect-[3/2] sm:min-h-[480px] sm:max-h-[900px] bg-white dark:bg-stone-900">
          {/* Banner Carousel */}
          <div 
            ref={sliderRef}
            className="relative w-full h-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {SLIDER_BANNERS.map((banner, index) => {
              const content = SLIDE_CONTENT[index];
              const isActive = index === currentBannerIndex;
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {/* Background Image */}
                  <img
                    src={cloudinaryTransform(banner, { w: 3000, h: 2000, c: 'fit', q: 'auto:best' })}
                    srcSet={`
                      ${cloudinaryTransform(banner, { w: 1200, h: 800, c: 'fit', q: 'auto:best' })} 1200w,
                      ${cloudinaryTransform(banner, { w: 1800, h: 1200, c: 'fit', q: 'auto:best' })} 1800w,
                      ${cloudinaryTransform(banner, { w: 2400, h: 1600, c: 'fit', q: 'auto:best' })} 2400w,
                      ${cloudinaryTransform(banner, { w: 3000, h: 2000, c: 'fit', q: 'auto:best' })} 3000w
                    `}
                    sizes="100vw"
                    alt={`TheTidbit Hero Banner ${index + 1}`}
                    className="w-full h-full object-cover object-[75%_50%] sm:object-[70%_50%] bg-white dark:bg-stone-900"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchpriority={index === 0 ? 'high' : 'low'}
                  />
                  
                  {/* Desktop: Semi-transparent Dark Overlay (8-12%) */}
                  <div className="hidden sm:block absolute inset-0 bg-black/10 z-10" />
                  
                  {/* Mobile: Light gradient overlay from bottom (so product is visible) */}
                  <div className="sm:hidden absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/60 via-black/15 to-transparent z-10" />
                  
                  {/* Content Overlay - Desktop */}
                  {isActive && (
                    <div className="hidden sm:flex absolute inset-0 z-20 items-center">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        {/* Desktop: Left-aligned */}
                        <div className={`w-full ${index === 1 ? 'sm:max-w-[45%]' : 'sm:max-w-[42%]'} md:max-w-[38%] lg:max-w-[35%] text-left`}>
                          <div className="backdrop-blur-md bg-black/30 dark:bg-black/40 rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
                            {/* Badge (if exists) */}
                            {content.badge && (
                              <div className="inline-flex items-center gap-1.5 text-xs text-white/90 mb-3 font-medium">
                                <span>{content.badge}</span>
                              </div>
                            )}
                            
                            {/* Primary Headline */}
                            <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
                              {content.h1}
                            </h1>
                            
                            {/* Subtext */}
                            <p className="text-base text-white/95 mb-6 leading-relaxed drop-shadow-lg max-w-2xl">
                              {content.subtext}
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className="flex flex-row gap-3 mb-6">
                              <Link
                                to={content.primaryCTALink}
                                onClick={(e) => {
                                  if (content.primaryCTALink.startsWith('#')) {
                                    e.preventDefault();
                                    const element = document.querySelector(content.primaryCTALink);
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }}
                                className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-stone-50 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] text-base"
                              >
                                <ShoppingBag size={18} />
                                {content.primaryCTA}
                                <ArrowRight size={16} />
                              </Link>
                              <Link
                                to={content.secondaryCTALink}
                                className="inline-flex items-center justify-center gap-2 bg-transparent backdrop-blur-sm border-2 border-white/60 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all shadow-lg text-base"
                              >
                                {content.secondaryCTA}
                                <ArrowRight size={16} />
                              </Link>
                            </div>

                            {/* Trust Line */}
                            {content.trustLine && (
                              <div className="text-sm text-white/90 font-medium drop-shadow-md">
                                {content.trustLine}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content Overlay - Mobile */}
                  {isActive && (
                    <div className="sm:hidden absolute bottom-6 left-0 right-0 z-20 px-4">
                      <div className="bg-black/15 rounded-lg p-3.5 border border-white/20 shadow-2xl">
                        {/* Mobile: Compact Headline */}
                        <h1 className="font-serif text-base font-bold text-white mb-1.5 leading-tight drop-shadow-2xl line-clamp-2">
                          {content.h1}
                        </h1>
                        
                        {/* Mobile: Compact Subtext */}
                        <p className="text-[11px] text-white/95 mb-2.5 leading-relaxed line-clamp-2">
                          {content.subtext}
                        </p>
                        
                        {/* Mobile: Single Primary CTA Button (Full Width) */}
                        <Link
                          to={content.primaryCTALink}
                          onClick={(e) => {
                            if (content.primaryCTALink.startsWith('#')) {
                              e.preventDefault();
                              const element = document.querySelector(content.primaryCTALink);
                              element?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-white text-stone-900 px-3 py-2 rounded-lg font-bold hover:bg-stone-50 transition-all shadow-lg text-xs"
                        >
                          <ShoppingBag size={14} />
                          {content.primaryCTA}
                          <ArrowRight size={12} />
                        </Link>

                        {/* Mobile: Trust Line (Compact) */}
                        {content.trustLine && (
                          <div className="text-[9px] text-white/85 font-medium drop-shadow-md mt-1.5 text-center leading-tight">
                            {content.trustLine}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Carousel Controls - Desktop only */}
            <div className="absolute sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 z-40 hidden sm:flex items-center gap-4 bg-black/30 dark:bg-stone-900/30 backdrop-blur-md px-3 py-2 rounded-full shadow-lg">
              {/* Previous Button */}
              <button
                onClick={goToPrevBanner}
                className="p-2 sm:p-2 rounded-full bg-black/40 dark:bg-stone-900/40 backdrop-blur-md border border-white/40 dark:border-stone-700/40 text-white hover:bg-black/60 dark:hover:bg-stone-900/60 transition-all shadow-lg"
                aria-label="Previous banner"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>

              {/* Dots Indicator - Hidden on mobile, shown on desktop */}
              <div className="hidden sm:flex gap-2">
                {SLIDER_BANNERS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBannerIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentBannerIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to banner ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextBanner}
                className="p-2 sm:p-2 rounded-full bg-black/40 dark:bg-stone-900/40 backdrop-blur-md border border-white/40 dark:border-stone-700/40 text-white hover:bg-black/60 dark:hover:bg-stone-900/60 transition-all shadow-lg"
                aria-label="Next banner"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Mobile: Dots indicator at top center */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:hidden z-30 flex gap-2">
              {SLIDER_BANNERS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentBannerIndex
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/50'
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Hidden on mobile */}
      <div className="hidden sm:block">
        <TrustBadges />
      </div>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-400">
              Explore our collection of handmade jute bags
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCT_CATEGORIES.map((category) => {
              const categoryProduct = getProductByCategory(category.slug);
              const categoryImage = CATEGORY_IMAGES[category.slug] || categoryProduct.colors[0]?.images[0] || heroImage;
              const categoryCount = ALL_PRODUCTS.filter(p => {
                const lastCategory = p.category[p.category.length - 1];
                return lastCategory.toLowerCase() === category.name.toLowerCase();
              }).length;

              return (
                <Link
                  key={category.id}
                  to={`/products/${categoryProduct.id}`}
                  className="group relative overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800 aspect-[4/3] hover:shadow-xl dark:hover:shadow-stone-900/50 transition-all border-2 border-transparent hover:border-brand-green/30"
                >
                  <img
                    src={cloudinaryTransform(categoryImage, { w: 800 })}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      {categoryCount} {categoryCount === 1 ? 'Product' : 'Products'}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2 drop-shadow-lg">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm mb-3 drop-shadow-md">
                      {categoryProduct.colors.length} {categoryProduct.colors.length === 1 ? 'color' : 'colors'} available
                    </p>
                    <div className="inline-flex items-center gap-2 text-white font-semibold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg group-hover:bg-white/30 transition-all">
                      Explore Collection
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Amazon Feature Section */}
      <section className="py-12 sm:py-16 bg-stone-50 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-bold mb-4">
                Amazon Favorite
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                Red Rounded Jute Bag — Now on Amazon
              </h2>
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 mb-6">
                The bestselling red rounded sling bag loved by our customers. Shop it directly on Amazon for quick delivery and trusted checkout.
              </p>
              <a
                href={AMAZON_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-stone-800 dark:hover:bg-stone-200 transition-all shadow-lg"
              >
                Buy on Amazon
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-stone-900 shadow-xl border border-stone-200 dark:border-stone-700">
                <img
                  src={cloudinaryTransform(PRODUCT.colors[0]?.images[1] || PRODUCT.colors[0]?.images[0] || '', { w: 900 })}
                  alt="TheTidbit red rounded jute bag"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-stone-900 dark:text-stone-100">
                  Bestseller on Amazon
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft & Impact Section (Homepage-only) */}
      <section className="py-14 sm:py-20 bg-jute-900 text-stone-100 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest mb-4">
                Yellow Sling Highlight
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Yellow Sling — Bright. Light. Ready for Every Day.
              </h2>
              <p className="text-base sm:text-lg text-stone-200 mb-6">
                Our yellow sling bag is lightweight, durable, and easy to carry from morning to evening. 
                Crafted for comfort with a cheerful pop of color that elevates any outfit.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
                  <Leaf className="w-5 h-5 text-green-300 mt-0.5" />
                  <div>
                    <p className="font-semibold">Natural Jute</p>
                    <p className="text-sm text-stone-200">Biodegradable, breathable, and planet-friendly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
                  <Hand className="w-5 h-5 text-amber-300 mt-0.5" />
                  <div>
                    <p className="font-semibold">Handmade Finish</p>
                    <p className="text-sm text-stone-200">Artisan-crafted details you can feel.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
                  <PackageCheck className="w-5 h-5 text-blue-300 mt-0.5" />
                  <div>
                    <p className="font-semibold">Plastic-Free Packaging</p>
                    <p className="text-sm text-stone-200">Delivered in eco-conscious wraps.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
                  <ShieldCheck className="w-5 h-5 text-purple-300 mt-0.5" />
                  <div>
                    <p className="font-semibold">Built to Last</p>
                    <p className="text-sm text-stone-200">Durable stitching for daily use.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={cloudinaryTransform(craftedFeatureImage, { w: 1000 })}
                  alt="TheTidbit yellow sling jute bag"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-black/40 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  Yellow Sling Variant
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-stone-50 dark:bg-stone-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                  Featured Products
                </h2>
                <p className="text-lg text-stone-600 dark:text-stone-400">
                  Handpicked favorites from our collection
                </p>
              </div>
              <Link
                to="/products"
                className="hidden sm:flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold hover:text-brand-green dark:hover:text-brand-green/80 transition-colors"
              >
                View All
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} showTag />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold hover:text-brand-green dark:hover:text-brand-green/80 transition-colors"
              >
                View All Products
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Social Proof - Testimonials */}
      <HomeTestimonials />

      {/* Gifting Section */}
      <GiftingSection />

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Why Choose TheTidbit?
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              We're committed to bringing you the finest handmade jute bags with exceptional quality and service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:shadow-lg transition-all border border-stone-100 dark:border-stone-700">
              <div className="w-16 h-16 bg-brand-green/10 dark:bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
                100% Eco-Friendly
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Made from natural jute, completely biodegradable and sustainable
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:shadow-lg transition-all border border-stone-100 dark:border-stone-700">
              <div className="w-16 h-16 bg-brand-green/10 dark:bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👩‍🎨</span>
              </div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
                Handcrafted by Artisans
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Each piece is unique, made with love by skilled artisans in India
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:shadow-lg transition-all border border-stone-100 dark:border-stone-700">
              <div className="w-16 h-16 bg-brand-green/10 dark:bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
                Free Delivery
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Free shipping on all prepaid orders across India
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:shadow-lg transition-all border border-stone-100 dark:border-stone-700">
              <div className="w-16 h-16 bg-brand-green/10 dark:bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
                Premium Quality
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Durable materials and expert craftsmanship ensure long-lasting beauty
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:shadow-lg transition-all border border-stone-100 dark:border-stone-700">
              <div className="w-16 h-16 bg-brand-green/10 dark:bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
                Perfect Gift
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Beautifully packaged and ready to gift to your loved ones
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:shadow-lg transition-all border border-stone-100 dark:border-stone-700">
              <div className="w-16 h-16 bg-brand-green/10 dark:bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
                Easy Returns
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                10-day hassle-free return and exchange policy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Links */}
      <MarketplaceLinks />

      {/* Instagram CTA */}
      <InstagramCTA />

      {/* India Pride */}
      <IndiaPride />
    </>
  );
};

export default HomePage;
