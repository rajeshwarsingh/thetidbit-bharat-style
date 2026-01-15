import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from './SEO';
import ProductCard from './ProductCard';
import { PRODUCT, ALL_PRODUCTS, PRODUCT_CATEGORIES, SOCIAL_LINKS, HERO_BANNERS, getProductByCategory, CATEGORY_IMAGES } from '../constants';
import { cloudinaryTransform } from '../utils/cloudinary';
import InstagramCTA from './InstagramCTA';
import IndiaPride from './IndiaPride';
import MarketplaceLinks from './MarketplaceLinks';

const HomePage: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Auto-rotate banners - first banner stays longer (8s vs 5s)
  useEffect(() => {
    // First banner (index 0) stays for 8 seconds, others for 5 seconds
    const delay = currentBannerIndex === 0 ? 8000 : 5000;
    
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % HERO_BANNERS.length);
    }, delay);

    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  const goToNextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  const goToPrevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
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

  const heroImage = HERO_BANNERS[currentBannerIndex] || PRODUCT.colors[0]?.images[0] || '';

  return (
    <>
      <SEO 
        title="TheTidbit - Handmade Jute Bags | Sustainable Fashion"
        description="Shop beautiful handmade jute bags from TheTidbit. Eco-friendly, artistic, and sustainable fashion. Sling bags, rounded sling bags, and handbags. Free delivery across India."
        canonicalUrl="https://bharat.style/"
        type="website"
        image={heroImage}
      />

      {/* Hero Section with Banner Carousel */}
      <section className="relative overflow-hidden sm:-mt-[100px]">
        <div className="relative w-full aspect-[3/2] min-h-[480px] max-h-[900px]">
          {/* Banner Carousel */}
          <div className="relative w-full h-full">
            {HERO_BANNERS.map((banner, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
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
                  className="w-full h-full object-cover sm:object-contain object-[75%_50%] sm:object-right bg-transparent sm:bg-white dark:sm:bg-stone-900"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchpriority={index === 0 ? 'high' : 'low'}
                />
              </div>
            ))}

            {/* Content Overlay - Mobile: Bottom positioned, Desktop: Center left */}
            <div className="absolute inset-0 z-20 hidden sm:flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Mobile: Compact floating card (keeps image clear) */}
                <div className="w-full sm:hidden pb-5">
                  <div className="inline-block max-w-[92%] bg-black/35 backdrop-blur-md rounded-2xl px-4 py-4 border border-white/15 shadow-2xl">
                    {/* Badge - Mobile */}
                    <div className="inline-flex items-center gap-1 text-[10px] text-white/90 mb-2 font-medium">
                      <Sparkles size={10} className="text-yellow-300" />
                      <span>Handmade in India 🇮🇳</span>
                    </div>
                    
                    {/* Headline - Mobile: Smaller */}
                    <h1 className="font-serif text-lg font-bold text-white mb-3 leading-tight drop-shadow-2xl">
                      Sustainable Jute Bags<br />
                      <span className="text-white drop-shadow-2xl">Handcrafted with Love</span>
                    </h1>
                    
                    {/* CTA - Mobile: Single primary button */}
                    <Link
                      to="/products"
                      className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-4 py-2.5 rounded-lg font-bold shadow-xl text-sm w-full"
                    >
                      <ShoppingBag size={16} />
                      Shop Jute Bags
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Desktop: Full content with backdrop card */}
                <div className="hidden sm:block w-full max-w-[42%] md:max-w-[38%] lg:max-w-[35%]">
                  <div className="backdrop-blur-md bg-black/30 dark:bg-black/40 rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
                    {/* Handmade in India Badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs text-white/90 mb-3 font-medium">
                      <Sparkles size={12} className="text-yellow-300" />
                      <span>Handmade in India 🇮🇳</span>
                    </div>
                    
                    {/* Primary Headline */}
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
                      Sustainable Jute Bags<br />
                      <span className="text-yellow-100 drop-shadow-2xl">Handcrafted with Love</span>
                    </h1>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                      <Link
                        to="/products"
                        className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-stone-50 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] text-sm sm:text-base"
                      >
                        <ShoppingBag size={18} />
                        Shop Jute Bags
                        <ArrowRight size={16} />
                      </Link>
                      <Link
                        to={`/products/${PRODUCT.id}`}
                        className="inline-flex items-center justify-center gap-2 bg-transparent backdrop-blur-sm border-2 border-white/60 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all shadow-lg text-sm sm:text-base"
                      >
                        Explore Collection
                        <ArrowRight size={16} />
                      </Link>
                    </div>

                    {/* Stats - Desktop only */}
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        <div className="flex flex-col items-center text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-white mb-1 leading-none">20+</div>
                          <div className="text-[9px] sm:text-[10px] text-white/85 font-medium">Bags</div>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-white mb-1 leading-none">100%</div>
                          <div className="text-[9px] sm:text-[10px] text-white/85 font-medium">Handmade</div>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="flex items-baseline gap-0.5 justify-center mb-1">
                            <div className="text-2xl sm:text-3xl font-bold text-white leading-none">4.8</div>
                            <span className="text-lg sm:text-xl text-yellow-300 leading-none">★</span>
                          </div>
                          <div className="text-[9px] sm:text-[10px] text-white/85 font-medium">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls - Mobile: Top right, Desktop: Bottom center */}
            <div className="absolute top-2 right-4 sm:top-auto sm:right-auto sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 z-40 flex items-center gap-3 sm:gap-4 bg-black/30 dark:bg-stone-900/30 backdrop-blur-md px-3 py-2 rounded-full shadow-lg">
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
                {HERO_BANNERS.map((_, index) => (
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
              {HERO_BANNERS.map((_, index) => (
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

              return (
                <Link
                  key={category.id}
                  to={`/products/${categoryProduct.id}`}
                  className="group relative overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800 aspect-[4/3] hover:shadow-xl dark:hover:shadow-stone-900/50 transition-all"
                >
                  <img
                    src={cloudinaryTransform(categoryImage, { w: 800 })}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm mb-3">
                      {categoryProduct.colors.length} {categoryProduct.colors.length === 1 ? 'color' : 'colors'} available
                    </p>
                    <div className="inline-flex items-center gap-2 text-white font-semibold text-sm">
                      Explore
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
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

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Why Choose TheTidbit?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
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

            <div className="text-center">
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

            <div className="text-center">
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
