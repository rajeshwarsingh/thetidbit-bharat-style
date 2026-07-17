'use client';
import React from 'react';
import { ExternalLink, MapPin, Star } from 'lucide-react';
import { CONTACT_INFO, GOOGLE_MAPS_URL, GOOGLE_REVIEWS_URL } from '../constants';

type Variant = 'pill' | 'card' | 'inline';

/** Official multicolor Google “G” mark (SVG). */
const GoogleGLogo: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    aria-hidden
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

function track(event: string, placement: string) {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', event, { placement });
  }
}

/** Compact Maps location chip — pairs with reviews badge. */
export const GoogleLocationBadge: React.FC<{
  className?: string;
  placement?: string;
}> = ({ className = '', placement = 'google_location_badge' }) => (
  <a
    href={GOOGLE_MAPS_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => track('google_maps_click', placement)}
    className={`inline-flex items-center gap-2 rounded-full border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-900 pl-2.5 pr-3 py-1.5 shadow-sm hover:border-brand-green/60 transition-colors ${className}`}
    aria-label="Open TheTidbit location on Google Maps"
  >
    <MapPin size={15} className="text-[#EA4335] shrink-0" aria-hidden />
    <span className="text-xs font-bold text-stone-900 dark:text-stone-100">Mumbai</span>
    <span className="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:inline">on Maps</span>
    <ExternalLink size={11} className="text-stone-400" />
  </a>
);

/**
 * Verifiable Google 5★ trust badge (+ location on card variant).
 * Links out to public Google reviews / Maps — proof, not fake schema.
 */
const GoogleReviewsBadge: React.FC<{
  variant?: Variant;
  className?: string;
  placement?: string;
}> = ({
  variant = 'pill',
  className = '',
  placement = 'google_reviews_badge',
}) => {
  const onReviewsClick = () => track('google_reviews_click', placement);

  const stars = (
    <span className="inline-flex items-center gap-0.5 text-amber-500" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={variant === 'card' ? 16 : 13} className="fill-current" />
      ))}
    </span>
  );

  if (variant === 'card') {
    return (
      <div
        className={`rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 px-5 py-4 ${className}`}
      >
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onReviewsClick}
          className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:opacity-95 transition-opacity"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 h-11 w-11 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-600 flex items-center justify-center">
              <GoogleGLogo size={22} />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100 flex flex-wrap items-center gap-2">
                5.0 on Google {stars}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Real customer ratings — tap to verify on Google
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-green sm:ml-auto group-hover:underline underline-offset-2">
            View reviews <ExternalLink size={12} />
          </span>
        </a>

        <div className="mt-3 pt-3 border-t border-stone-200/80 dark:border-stone-700">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('google_maps_click', placement)}
            className="flex items-start gap-2.5 group"
          >
            <MapPin size={16} className="text-[#EA4335] shrink-0 mt-0.5" aria-hidden />
            <div className="min-w-0 flex-1 text-left">
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Find us on Google Maps</p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                {CONTACT_INFO.addressLines.join(', ')}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#4285F4] shrink-0 group-hover:underline underline-offset-2">
              Open <ExternalLink size={12} />
            </span>
          </a>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <span className={`inline-flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onReviewsClick}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-brand-green transition-colors"
        >
          <GoogleGLogo size={16} />
          {stars}
          <span>5.0 on Google</span>
          <ExternalLink size={12} className="opacity-70" />
        </a>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('google_maps_click', placement)}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-brand-green transition-colors"
        >
          <MapPin size={14} className="text-[#EA4335]" />
          <span>Mumbai</span>
          <ExternalLink size={12} className="opacity-70" />
        </a>
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onReviewsClick}
        className="inline-flex items-center gap-2 rounded-full border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-900 pl-2 pr-3 py-1.5 shadow-sm hover:border-brand-green/60 transition-colors"
        aria-label="TheTidbit rated 5 stars on Google — view reviews"
      >
        <GoogleGLogo size={18} />
        {stars}
        <span className="text-xs font-bold text-stone-900 dark:text-stone-100">5.0</span>
        <span className="text-[11px] text-stone-500 dark:text-stone-400 sm:inline">on Google</span>
        <ExternalLink size={11} className="text-stone-400" />
      </a>
      <GoogleLocationBadge placement={placement} />
    </span>
  );
};

export default GoogleReviewsBadge;
