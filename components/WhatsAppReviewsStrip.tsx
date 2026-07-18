'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_PROOF } from '../data/customer-proof';
import { cloudinaryTransform } from '../utils/cloudinary';

type Props = {
  className?: string;
  /** Home: horizontal strip. Reviews page: wrap grid. */
  layout?: 'strip' | 'grid';
  limit?: number;
  showCaption?: boolean;
};

const WhatsAppReviewsStrip: React.FC<Props> = ({
  className = '',
  layout = 'strip',
  limit,
  showCaption = true,
}) => {
  const items = limit ? WHATSAPP_PROOF.slice(0, limit) : WHATSAPP_PROOF;
  const isGrid = layout === 'grid';

  return (
    <div className={className}>
      {showCaption && (
        <div className="flex items-center justify-center gap-2 mb-5 sm:mb-6">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C7E]">
            <MessageCircle size={16} aria-hidden />
          </span>
          <p className="text-sm sm:text-base font-semibold text-stone-800 dark:text-stone-200">
            Real WhatsApp messages after delivery
          </p>
        </div>
      )}

      <div
        className={
          isGrid
            ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 items-stretch'
            : 'flex gap-3 sm:gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory scrollbar-hide'
        }
        role="list"
        aria-label="Customer WhatsApp reviews"
      >
        {items.map((item) => (
          <figure
            key={item.src}
            role="listitem"
            className={
              isGrid
                ? 'flex flex-col h-full min-w-0'
                : 'shrink-0 w-[210px] sm:w-[240px] snap-center'
            }
          >
            <div className="overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700 bg-[#0b141a] shadow-sm flex-1">
              <img
                src={cloudinaryTransform(item.src, { w: 480, q: 'auto:good' })}
                srcSet={`${cloudinaryTransform(item.src, { w: 360, q: 'auto:good' })} 360w, ${cloudinaryTransform(item.src, { w: 480, q: 'auto:good' })} 480w`}
                sizes={isGrid ? '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw' : '240px'}
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
          Swipe to see more · Names &amp; addresses redacted for privacy
        </p>
      )}
    </div>
  );
};

export default WhatsAppReviewsStrip;
