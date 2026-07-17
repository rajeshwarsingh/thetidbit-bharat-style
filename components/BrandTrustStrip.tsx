'use client';
import React from 'react';
import {
  ShieldCheck,
  Truck,
  Leaf,
  MessageCircle,
  BadgeCheck,
  CreditCard,
} from 'lucide-react';
import { WHATSAPP_NUMBER, GOOGLE_REVIEWS_URL } from '../constants';
import GoogleReviewsBadge from './GoogleReviewsBadge';

const ITEMS = [
  { icon: CreditCard, title: 'Secure payments', sub: 'UPI · Cards · Wallets' },
  { icon: Truck, title: 'Free & fast shipping', sub: 'Ships in 24–48 hrs' },
  { icon: Leaf, title: 'Premium jute', sub: 'Handmade in India' },
  { icon: BadgeCheck, title: 'Genuine TheTidbit', sub: 'Official brand store' },
  { icon: MessageCircle, title: 'WhatsApp support', sub: 'Quick human help' },
  { icon: ShieldCheck, title: 'Trusted checkout', sub: 'Also on Amazon & Flipkart' },
] as const;

/**
 * Compact trust grid — reuse on home, collections, PDP.
 * Intentionally omits returns promises (brand policy).
 */
const BrandTrustStrip: React.FC<{ className?: string; dense?: boolean }> = ({
  className = '',
  dense = false,
}) => {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi TheTidbit! I need help with an order.')}`;

  return (
    <section
      className={`border-y border-stone-200 dark:border-stone-800 bg-gradient-to-r from-stone-50 via-white to-emerald-50/40 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 ${className}`}
      aria-label="Why shop with TheTidbit"
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${dense ? 'py-5' : 'py-8 sm:py-10'}`}>
        <div className={`flex justify-center mb-5 ${dense ? 'mb-4' : 'mb-6'}`}>
          <GoogleReviewsBadge variant="pill" placement="brand_trust_strip" />
        </div>
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 ${dense ? 'sm:gap-5' : 'sm:gap-6'}`}>
          {ITEMS.map((item) => {
            const Icon = item.icon;
            const isWhatsApp = item.title === 'WhatsApp support';
            const body = (
              <>
                <Icon size={dense ? 18 : 20} className="text-brand-green shrink-0 mt-0.5" aria-hidden />
                <div className="min-w-0">
                  <p className={`font-semibold text-stone-900 dark:text-stone-100 leading-tight ${dense ? 'text-xs' : 'text-sm'}`}>
                    {item.title}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">{item.sub}</p>
                </div>
              </>
            );
            return isWhatsApp ? (
              <a
                key={item.title}
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:opacity-90 transition-opacity"
              >
                {body}
              </a>
            ) : (
              <div key={item.title} className="flex items-start gap-2.5">
                {body}
              </div>
            );
          })}
        </div>
        <p className="sr-only">
          See TheTidbit Google reviews at {GOOGLE_REVIEWS_URL}
        </p>
      </div>
    </section>
  );
};

export default BrandTrustStrip;
