'use client';
import React from 'react';
import { AMAZON_STORE_URL } from '../constants';
import { AMAZON_PROOF } from '../data/customer-proof';
import { cloudinaryTransform } from '../utils/cloudinary';

type Props = {
  className?: string;
  layout?: 'strip' | 'grid';
  limit?: number;
  showCaption?: boolean;
};

const AmazonReviewsStrip: React.FC<Props> = ({
  className = '',
  layout = 'strip',
  limit,
  showCaption = true,
}) => {
  const items = limit ? AMAZON_PROOF.slice(0, limit) : AMAZON_PROOF;
  const isGrid = layout === 'grid';

  return (
    <div className={className}>
      {showCaption && (
        <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex h-8 px-2.5 shrink-0 items-center justify-center rounded-md bg-[#FF9900]/15 text-[#C45500] text-xs font-bold tracking-wide">
              amazon
            </span>
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100 leading-tight">
                Verified Amazon reviews
              </p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                Screenshots from Amazon.in verified purchases
              </p>
            </div>
          </div>
          <a
            href={AMAZON_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs sm:text-sm font-semibold text-[#C45500] hover:underline underline-offset-4"
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'amazon_click', { placement: 'amazon_reviews_strip', target: 'store' });
              }
            }}
          >
            Store →
          </a>
        </div>
      )}

      <div
        className={
          isGrid
            ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5'
            : 'flex gap-3 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-hide'
        }
        role="list"
        aria-label="Amazon customer reviews"
      >
        {items.map((item) => (
          <figure
            key={item.src}
            role="listitem"
            className={
              isGrid
                ? 'flex flex-col min-w-0'
                : 'shrink-0 w-[280px] sm:w-[320px] snap-start flex flex-col'
            }
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900">
              <img
                src={cloudinaryTransform(item.src, { w: 720, q: 'auto:good' })}
                srcSet={`${cloudinaryTransform(item.src, { w: 480, q: 'auto:good' })} 480w, ${cloudinaryTransform(item.src, { w: 720, q: 'auto:good' })} 720w`}
                sizes={isGrid ? '(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw' : '320px'}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-contain object-top p-1"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-2.5 text-center text-xs font-medium text-stone-500 dark:text-stone-400 leading-snug line-clamp-2 min-h-[2rem]">
              {item.highlight}
            </figcaption>
          </figure>
        ))}
      </div>
      {!isGrid && (
        <p className="mt-3 text-center sm:text-left text-[11px] text-stone-400 dark:text-stone-500">
          Swipe to see more
        </p>
      )}
    </div>
  );
};

export default AmazonReviewsStrip;
