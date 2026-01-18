import React from 'react';
import { PRODUCT, WHATSAPP_NUMBER, COUPON_DISCOUNTS } from '../constants';

interface StickyCTAProps {
  appliedCoupon: string | null;
}

const StickyCTA: React.FC<StickyCTAProps> = ({ appliedCoupon }) => {
  const getDiscountMultiplier = (coupon: string | null): number => {
    if (!coupon) return 1;
    const discountPercent = COUPON_DISCOUNTS[coupon] || 0;
    return 1 - (discountPercent / 100);
  };

  const currentPrice = appliedCoupon 
    ? Math.round(PRODUCT.price * getDiscountMultiplier(appliedCoupon))
    : PRODUCT.price;

  const handleBuy = () => {
     let message = `Hi TheTidbit, I want to buy the ${PRODUCT.name}.`;
     if (appliedCoupon) {
       message += ` with coupon ${appliedCoupon} at ₹${currentPrice}`;
     } else {
       message += ` Price: ₹${currentPrice}`;
     }
     const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
     window.open(url, '_blank', 'noopener,noreferrer');
     if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
       window.gtag('event', 'whatsapp_buy_click', {
         placement: 'sticky_cta',
         coupon: appliedCoupon || undefined,
         value: currentPrice,
         currency: 'INR',
       });
     }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] z-50 sm:hidden transition-colors duration-300">
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-stone-900 dark:text-stone-100">
              <span className="text-xs font-medium text-stone-600 dark:text-stone-400 mr-1">Only</span>₹{currentPrice}
            </p>
            {appliedCoupon && <span className="text-xs bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 px-1.5 rounded font-medium">{COUPON_DISCOUNTS[appliedCoupon] || 0}% OFF</span>}
          </div>
          {appliedCoupon ? (
            <p className="text-xs text-stone-500 dark:text-stone-400 line-through">₹{PRODUCT.price}</p>
          ) : (
            <p className="text-xs text-stone-500 dark:text-stone-400 line-through">₹{PRODUCT.mrp}</p>
          )}
        </div>
        <button 
          type="button"
          onClick={handleBuy}
          className="flex-1 bg-brand-green dark:bg-brand-green/80 text-white py-3 px-6 rounded-xl font-bold shadow-lg shadow-green-100 dark:shadow-green-900/50 active:scale-[0.99] transition-transform"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;