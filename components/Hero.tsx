import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Truck, RefreshCcw, Share2, Heart, User, Package, Camera, Tag, X, Check, MessageCircle, ClipboardCheck, Sparkles } from 'lucide-react';
import { PRODUCT, WHATSAPP_NUMBER, VALID_COUPONS } from '../constants';
import { cloudinarySrcSet, cloudinaryTransform } from '../utils/cloudinary';
import { useSlingTry } from './SlingTryContext';
import { ProductDetails } from '../types';

interface HeroProps {
  product?: ProductDetails;
  appliedCoupon: string | null;
  setAppliedCoupon: (code: string | null) => void;
}

const Hero: React.FC<HeroProps> = ({ product = PRODUCT, appliedCoupon, setAppliedCoupon }) => {
  const { openSlingTry } = useSlingTry();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponJustApplied, setCouponJustApplied] = useState(false);

  // Calculate prices
  const currentPrice = appliedCoupon 
    ? Math.round(product.price * 0.95) 
    : product.price;
  
  const savings = product.mrp - currentPrice;

  // Reset to the model shot (index 0) whenever color changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedColor]);

  useEffect(() => {
    if (!appliedCoupon) return;
    setCouponJustApplied(true);
    const t = window.setTimeout(() => setCouponJustApplied(false), 450);
    return () => window.clearTimeout(t);
  }, [appliedCoupon]);

  const handleApplyCoupon = () => {
    if (!couponInput) return;
    
    if (VALID_COUPONS.includes(couponInput.toUpperCase())) {
      const code = couponInput.toUpperCase();
      setAppliedCoupon(code);
      setCouponError('');
      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('event', 'coupon_apply', {
          coupon: code,
        });
      }
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('event', 'coupon_invalid', {
          coupon: couponInput.toUpperCase(),
        });
      }
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'coupon_remove');
    }
  };

  const handleWhatsAppBuy = () => {
    let message = `Hi TheTidbit, I would like to buy the ${product.name} in ${selectedColor.name}.`;
    if (appliedCoupon) {
      message += ` I have applied coupon ${appliedCoupon}. Price: ₹${currentPrice}.`;
    } else {
      message += ` Price: ₹${currentPrice}.`;
    }
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'whatsapp_buy_click', {
        placement: 'hero',
        color: selectedColor.id,
        coupon: appliedCoupon || undefined,
        value: currentPrice,
        currency: 'INR',
      });
    }
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://bharat.style/';
    const shareText = `${product.name} (${selectedColor.name}) — ₹${currentPrice} on TheTidbit`;
    const nav = typeof window !== 'undefined' ? window.navigator : undefined;

    try {
      if (nav && 'share' in nav) {
        await (nav as any).share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        });
        if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
          window.gtag('event', 'share', { method: 'web_share', placement: 'hero' });
        }
        return;
      }

      if (nav?.clipboard?.writeText) {
        await nav.clipboard.writeText(shareUrl);
        if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
          window.gtag('event', 'share', { method: 'copy_link', placement: 'hero' });
        }
        alert('Link copied!');
        return;
      }
    } catch {
      // fall through
    }

    try {
      window.prompt('Copy this link:', shareUrl);
      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('event', 'share', { method: 'prompt_copy', placement: 'hero' });
      }
    } catch {
      // ignore
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getImageLabel = (idx: number) => {
    switch (idx) {
      case 0: return "Model";
      case 1: return "Product";
      case 2: return "Flat Lay";
      default: return `View ${idx + 1}`;
    }
  };

  const getImageIcon = (idx: number) => {
    switch (idx) {
      case 0: return <User size={16} />;
      case 1: return <Package size={16} />;
      case 2: return <Camera size={16} />;
      default: return <Package size={16} />;
    }
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-950 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          
          {/* Image Gallery Section */}
          <div className="lg:col-span-7">
            <div className="flex flex-col-reverse sm:flex-row gap-4">
              
              {/* Vertical Thumbnails (Hidden on small screens, shown on sm+) */}
              <div className="hidden sm:flex flex-col gap-4 w-24">
                 {selectedColor.images.map((img, idx) => (
                   <div 
                     key={idx}
                     onClick={() => setActiveImageIndex(idx)}
                     className={`
                       aspect-square rounded-lg bg-stone-200 dark:bg-stone-800 overflow-hidden cursor-pointer relative
                       transition-all duration-300 border-2
                       ${activeImageIndex === idx 
                         ? 'border-brand-green opacity-100 ring-1 ring-brand-green/50' 
                         : 'border-transparent opacity-70 hover:opacity-100'}
                     `}
                   >
                      <img
                        src={cloudinaryTransform(img, { w: 160 })} 
                        srcSet={cloudinarySrcSet(img, [96, 160, 240])}
                        sizes="96px"
                        className="w-full h-full object-cover" 
                        alt={`${product.name} view ${idx + 1}`}
                        width="96"
                        height="96"
                        loading="lazy"
                      />
                      {/* View Type Label */}
                      <div className="absolute bottom-0 inset-x-0 bg-black/50 text-[10px] text-white text-center py-1 font-medium">
                        {getImageLabel(idx)}
                      </div>
                   </div>
                 ))}
              </div>

              {/* Main Image Area */}
              <div className="flex-1 relative aspect-square sm:aspect-[4/3] lg:aspect-[1/1] overflow-hidden rounded-2xl bg-stone-200 dark:bg-stone-800 shadow-xl dark:shadow-stone-900/50 group">
                <div className="w-full h-full bs-kenburns motion-reduce:transform-none motion-reduce:animate-none">
                  <img
                    src={cloudinaryTransform(selectedColor.images[activeImageIndex], { w: 900 })}
                    srcSet={cloudinarySrcSet(selectedColor.images[activeImageIndex], [480, 768, 900, 1200])}
                    sizes="(min-width: 1024px) 42vw, (min-width: 640px) 65vw, 100vw"
                    alt={`${product.name} - ${selectedColor.name}`}
                    className="object-cover w-full h-full transform transition duration-700 group-hover:scale-[1.02]"
                    width="800"
                    height="800"
                    // Main product image is critical, so we use eager loading
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                  />
                </div>
                
                {/* Image Overlays */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-md">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Add to wishlist"
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-stone-800/80 hover:bg-white dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-red-500 dark:hover:text-red-400 transition shadow-sm"
                >
                  <Heart size={20} />
                </button>

                {/* Mobile Thumbnail Overlay (Dots) */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 sm:hidden z-10">
                  {selectedColor.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className="h-11 w-11 -m-1 rounded-full flex items-center justify-center transition active:scale-95"
                      aria-label={`View image ${idx + 1}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2.5 rounded-full transition-all shadow-sm ${activeImageIndex === idx ? 'bg-brand-green w-7' : 'bg-white/80 w-2.5'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Horizontal Buttons (Visible only on small screens) */}
            <div className="mt-4 grid grid-cols-3 gap-3 sm:hidden">
                {selectedColor.images.map((img, idx) => (
                   <button 
                     key={idx}
                     onClick={() => setActiveImageIndex(idx)}
                     className={`
                       flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium border
                       ${activeImageIndex === idx 
                         ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100' 
                         : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'}
                     `}
                   >
                      {getImageIcon(idx)}
                      {getImageLabel(idx)}
                   </button>
                 ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:col-span-5 mt-10 lg:mt-0">
            {/* Breadcrumbs */}
            <nav className="flex text-sm text-stone-500 dark:text-stone-400 mb-4">
              <ol className="flex items-center space-x-2">
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="hover:text-stone-900 dark:hover:text-stone-100 transition font-serif font-bold">
                    TheTidbit
                  </a>
                </li>
                <li>/</li>
                <li>
                  <span className="text-stone-500 dark:text-stone-400 cursor-default">Women</span>
                </li>
                <li>/</li>
                <li className="text-stone-900 dark:text-stone-100 font-medium">Sling Bags</li>
              </ol>
            </nav>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-stone-600 dark:text-stone-400 font-medium">{product.tagline}</p>

            {/* Ratings */}
            <div className="mt-3 flex items-center bs-rating-shimmer">
              <div className="flex items-center text-yellow-500">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star key={rating} className="flex-shrink-0 h-5 w-5 fill-current" />
                ))}
              </div>
              <p 
                onClick={() => scrollToSection('reviews')}
                className="ml-3 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 cursor-pointer underline decoration-stone-300 dark:decoration-stone-600 hover:decoration-stone-500 dark:hover:decoration-stone-400 underline-offset-2 transition"
              >
                48 reviews
              </p>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                    window.gtag('event', 'slingtry_open_modal', { placement: 'hero' });
                  }
                  openSlingTry();
                }}
                className="ml-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:text-indigo-800 underline decoration-indigo-300 hover:decoration-indigo-400 underline-offset-2 transition"
              >
                <Sparkles size={16} className="text-indigo-600" />
                See how it looks on you
              </button>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-end flex-wrap gap-2">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium text-stone-600 dark:text-stone-400">Only</span>
                <p className="text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">₹{currentPrice}</p>
              </div>
              
              {appliedCoupon ? (
                <div className="flex flex-col mb-1 ml-2">
                    <p className="text-sm text-stone-500 dark:text-stone-500 line-through">₹{product.price}</p>
                    <p className="text-sm text-stone-500 dark:text-stone-500 line-through">MRP ₹{product.mrp}</p>
                </div>
              ) : (
                <p className="ml-1 text-lg text-stone-500 dark:text-stone-500 line-through mb-1">₹{product.mrp}</p>
              )}
              
              <p className="ml-2 text-sm font-semibold text-red-600 mb-2">
                (Save ₹{savings})
              </p>
            </div>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Inclusive of all taxes</p>

            <hr className="my-6 border-stone-200 dark:border-stone-700/50" />

            {/* Color Selector */}
            <div className="mt-6">
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">Colour:</p>
              <div className="mt-3 flex flex-wrap items-start gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className="flex flex-col items-center gap-2 focus:outline-none"
                    aria-label={`Select colour: ${color.name}`}
                    title={color.name}
                  >
                    <span
                      aria-hidden="true"
                      className={`
                        relative h-12 w-12 rounded-full overflow-hidden border shadow-sm ring-offset-2 transition
                        ${selectedColor.name === color.name ? 'ring-2 ring-stone-900 dark:ring-stone-100 border-stone-900/20 dark:border-stone-100/20' : 'border-stone-200 dark:border-stone-700 hover:ring-1 hover:ring-stone-300 dark:hover:ring-stone-600'}
                      `}
                      style={{ backgroundColor: color.hex }}
                    >
                      <img
                        src={cloudinaryTransform((color.images?.[1] || color.images?.[0]) as string, { w: 120 })}
                        srcSet={cloudinarySrcSet((color.images?.[1] || color.images?.[0]) as string, [64, 96, 120])}
                        sizes="48px"
                        className="absolute inset-0 w-full h-full object-cover"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width="48"
                        height="48"
                      />
                    </span>
                    <span className={`text-xs font-semibold ${selectedColor.name === color.name ? 'text-stone-900 dark:text-stone-100' : 'text-stone-600 dark:text-stone-400'}`}>
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Coupon Section */}
            <div className="mt-6 bg-stone-100/50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-200 dark:border-stone-700/50">
               <div className="flex items-center gap-2 mb-2">
                 <Tag size={16} className="text-stone-500 dark:text-stone-400" />
                 <span className="text-sm font-bold text-stone-800 dark:text-stone-200">Have a coupon?</span>
               </div>
               
               {appliedCoupon ? (
                 <div className={`flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3 ${couponJustApplied ? 'bs-coupon-pop' : ''}`}>
                    <div className="flex items-center gap-2">
                       <div className="bg-green-100 p-1 rounded-full">
                         <Check size={14} className="text-green-600" />
                       </div>
                       <div>
                         <p className="text-sm font-bold text-green-800">Code {appliedCoupon} applied!</p>
                         <p className="text-xs text-green-600">You saved extra 5%</p>
                       </div>
                    </div>
                    <button 
                      onClick={handleRemoveCoupon} 
                      className="text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-400 p-1"
                      title="Remove coupon"
                    >
                      <X size={18} />
                    </button>
                 </div>
               ) : (
                 <div className="flex gap-2">
                    <div className="flex-1 relative">
                       <input 
                         type="text" 
                         value={couponInput}
                         onChange={(e) => {
                           setCouponInput(e.target.value);
                           setCouponError('');
                         }}
                         placeholder="Enter code" 
                         className={`w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-500 uppercase bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 ${couponError ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30' : 'border-stone-300 dark:border-stone-700'}`}
                       />
                       {couponError && <p className="absolute -bottom-5 left-0 text-xs text-red-500">{couponError}</p>}
                    </div>
                    <button 
                      onClick={handleApplyCoupon}
                      className="bg-stone-800 dark:bg-stone-100 text-white dark:text-stone-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-stone-900 dark:hover:bg-stone-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!couponInput}
                    >
                      Apply
                    </button>
                 </div>
               )}
            </div>

            {/* Main CTAs */}
            <div id="buy-now" className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleWhatsAppBuy}
                className="flex-1 bg-green-600 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-base font-bold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg shadow-green-200 transition-all transform hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <span>Buy Now on WhatsApp</span>
              </button>
              <button
                type="button"
                aria-label="Share this product"
                onClick={handleShare}
                className="flex-0.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl py-4 px-4 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 dark:focus:ring-stone-400 transition"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* WhatsApp Order Steps */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-3 bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 rounded-xl px-4 py-3 shadow-sm dark:shadow-stone-900/50">
                <div className="h-9 w-9 rounded-full bg-green-50 flex items-center justify-center text-green-700">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100 leading-tight">Message us</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Tap WhatsApp to start</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 rounded-xl px-4 py-3 shadow-sm dark:shadow-stone-900/50">
                <div className="h-9 w-9 rounded-full bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300">
                  <ClipboardCheck size={18} />
                </div>
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100 leading-tight">Confirm details</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Address + color</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 rounded-xl px-4 py-3 shadow-sm dark:shadow-stone-900/50">
                <div className="h-9 w-9 rounded-full bg-jute-100 dark:bg-jute-800 flex items-center justify-center text-stone-800 dark:text-stone-200">
                  <Truck size={18} />
                </div>
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100 leading-tight">Delivered</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Fast & tracked</p>
                </div>
              </div>
            </div>

            {/* Features / Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                <Truck size={18} className="text-brand-green" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                <RefreshCcw size={18} className="text-brand-green" />
                <span>10-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                <ShieldCheck size={18} className="text-brand-green" />
                <span>Secure Payment</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;