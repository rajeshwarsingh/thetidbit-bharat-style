'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_PROOF } from '../data/customer-proof';
import { cloudinaryTransform } from '../utils/cloudinary';

type Props = {
  className?: string;
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
        <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C7E]">
            <MessageCircle size={16} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100 leading-tight">
              Real WhatsApp messages after delivery
            </p>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              Names &amp; addresses redacted for privacy
            </p>
          </div>
        </div>
      )}

      <div
        className={
          isGrid
            ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'
            : 'flex gap-3 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-hide'
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
                ? 'flex flex-col min-w-0'
                : 'shrink-0 w-[200px] sm:w-[220px] snap-start flex flex-col'
            }
          >
            <div className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700 bg-[#0b141a]">
              <img
                src={cloudinaryTransform(item.src, { w: 440, q: 'auto:good' })}
                srcSet={`${cloudinaryTransform(item.src, { w: 320, q: 'auto:good' })} 320w, ${cloudinaryTransform(item.src, { w: 440, q: 'auto:good' })} 440w`}
                sizes={isGrid ? '(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw' : '220px'}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover object-top"
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

export default WhatsAppReviewsStrip;
