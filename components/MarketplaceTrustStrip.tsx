'use client';
import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { MARKETPLACE_LINKS, GOOGLE_REVIEWS_URL } from '../constants';
import GoogleReviewsBadge from './GoogleReviewsBadge';

/** Compact marketplace + Google reviews trust for PDP / checkout. */
const MarketplaceTrustStrip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    <GoogleReviewsBadge variant="card" placement="pdp_marketplace_trust" />
    <div className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 px-4 py-3.5">
      <div className="flex items-start gap-2.5">
        <ShieldCheck size={18} className="text-brand-green shrink-0 mt-0.5" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Prefer a marketplace you already trust?
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            TheTidbit is also on Amazon & Flipkart — same handmade quality.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            <a
              href={MARKETPLACE_LINKS.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#232F3E] dark:text-amber-200 hover:underline underline-offset-2"
            >
              Shop on Amazon <ExternalLink size={12} />
            </a>
            <a
              href={MARKETPLACE_LINKS.flipkart}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 dark:text-sky-300 hover:underline underline-offset-2"
            >
              Shop on Flipkart <ExternalLink size={12} />
            </a>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#4285F4] hover:underline underline-offset-2"
            >
              Google reviews <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MarketplaceTrustStrip;
