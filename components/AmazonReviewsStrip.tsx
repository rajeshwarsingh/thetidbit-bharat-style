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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex h-8 px-2.5 items-center justify-center rounded-md bg-[#FF9900]/15 text-[#C45500] text-xs font-bold tracking-wide">
              amazon
            </span>
            <p className="text-sm sm:text-base font-semibold text-stone-800 dark:text-stone-200">
              Verified Amazon reviews
            </p>
          </div>
          <a
            href={AMAZON_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center sm:text-right text-xs sm:text-sm font-semibold text-[#C45500] hover:underline underline-offset-4"
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'amazon_click', { placement: 'amazon_reviews_strip', target: 'store' });
              }
            }}
          >
            View store on Amazon →
          </a>
        </div>
      )}

      <div
        className={
          isGrid
            ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 items-stretch'
            : 'flex gap-3 sm:gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory scrollbar-hide'
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
                ? 'flex flex-col h-full min-w-0'
                : `shrink-0 snap-center ${item.wide ? 'w-[280px] sm:w-[340px]' : 'w-[220px]'}`
            }
          >
            <div className="overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700 bg-white shadow-sm flex-1">
              <img
                src={cloudinaryTransform(item.src, { w: 680, q: 'auto:good' })}
                srcSet={`${cloudinaryTransform(item.src, { w: 480, q: 'auto:good' })} 480w, ${cloudinaryTransform(item.src, { w: 680, q: 'auto:good' })} 680w`}
                sizes={isGrid ? '(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw' : '340px'}
                alt={item.alt}
                className="w-full h-auto block"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-2.5 text-center text-xs font-medium text-stone-500 dark:text-stone-400 leading-snug min-h-[2.5rem] flex items-start justify-center">
              {item.highlight}
            </figcaption>
          </figure>
        ))}
      </div>
      {!isGrid && (
        <p className="mt-3 text-center text-[11px] text-stone-400 dark:text-stone-500">
          Swipe to see more · Screenshots from Amazon.in verified purchases
        </p>
      )}
    </div>
  );
};

export default AmazonReviewsStrip;
