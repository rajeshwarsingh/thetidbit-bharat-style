'use client';
import React, { useState, useEffect } from 'react';
import { Link } from '@/lib/router';
import { ShoppingBag } from 'lucide-react';

const MobileShopCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden animate-fade-in">
      <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <Link
          to="/products"
          className="flex items-center justify-center gap-2 w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 py-3.5 rounded-xl font-bold text-base shadow-lg active:scale-[0.98] transition-transform"
          onClick={() => {
            if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
              window.gtag('event', 'mobile_sticky_shop_click', { placement: 'sticky_bottom' });
            }
          }}
        >
          <ShoppingBag size={18} />
          Shop Now — Starting ₹499
        </Link>
      </div>
    </div>
  );
};

export default MobileShopCTA;