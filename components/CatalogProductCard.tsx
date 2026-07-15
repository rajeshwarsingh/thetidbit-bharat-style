'use client';
import React from 'react';
import { Link } from '@/lib/router';
import { Star, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { CatalogItem } from '../types';
import { getProductDetailUrl } from '../constants';
import { cloudinaryTransform, cloudinarySrcSet } from '../utils/cloudinary';
import { useIsWished, toggleWishlist } from '../utils/wishlist';
import { requestQuoteUrl, openWhatsApp } from '../utils/whatsapp';

interface Props {
  item: CatalogItem;
  /** Show the lifestyle collection chip. */
  showCollection?: boolean;
  /** Bulk browse mode: no detail-page links, no colour swatches (Request Quote only). */
  hideLink?: boolean;
  className?: string;
}

/** Small colour-coded badge. */
const Badge: React.FC<{ tone: 'gold' | 'green' | 'amber' | 'stone'; children: React.ReactNode }> = ({ tone, children }) => {
  const tones: Record<string, string> = {
    gold: 'bg-amber-900 text-amber-50',
    green: 'bg-brand-green text-white',
    amber: 'bg-amber-500 text-white',
    stone: 'bg-stone-800/90 text-stone-100 dark:bg-stone-200 dark:text-stone-900',
  };
  return (
    <span className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full shadow-sm ${tones[tone]}`}>
      {children}
    </span>
  );
};

const badgeTone = (label: string): 'gold' | 'green' | 'amber' | 'stone' => {
  if (label === 'Best Seller') return 'gold';
  if (label === 'Ready to Ship') return 'green';
  if (label.startsWith('Only')) return 'amber';
  return 'stone';
};

const CatalogProductCard: React.FC<Props> = ({ item, showCollection = false, hideLink = false, className = '' }) => {
  const wished = useIsWished(item.key);
  const hoverImage = item.images[1] || item.images[0];
  const linkable = !hideLink && !!item.url;
  const altText = item.product.displayName || item.shortName || item.name;

  const onWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(item.key);
  };

  const onRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openWhatsApp(requestQuoteUrl(item), 'whatsapp_quote_click', { placement: 'card', key: item.key });
  };

  return (
    <div
      className={`group relative flex flex-col bg-white dark:bg-stone-800/60 rounded-2xl overflow-hidden border border-stone-100 dark:border-stone-700/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      {/* Image */}
      {(() => {
        const cls = 'relative block aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-900';
        const inner = (
          <>
            <img
              src={cloudinaryTransform(item.image, { w: 600 })}
              srcSet={cloudinarySrcSet(item.image, [400, 600, 800])}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              alt={altText}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
              loading="lazy"
              decoding="async"
            />
            {hoverImage && (
              <img
                src={cloudinaryTransform(hoverImage, { w: 600 })}
                alt={`${altText} alternate view`}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
                loading="lazy"
                decoding="async"
              />
            )}
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 z-10">
              {item.badges.map((b) => (
                <Badge key={b} tone={badgeTone(b)}>{b}</Badge>
              ))}
            </div>
            {/* Discount */}
            {item.discountPercentage > 0 && (
              <div className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                {item.discountPercentage}% OFF
              </div>
            )}
          </>
        );
        return linkable ? (
          <Link to={item.url} className={cls} aria-label={altText}>{inner}</Link>
        ) : (
          <div className={cls}>{inner}</div>
        );
      })()}

      {/* Wishlist */}
      <button
        type="button"
        onClick={onWishlist}
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={wished}
        className="absolute top-3 right-3 z-20 h-9 w-9 rounded-full bg-white/90 dark:bg-stone-900/80 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-brand-green"
      >
        <Heart size={18} className={wished ? 'fill-red-500 text-red-500' : 'text-stone-600 dark:text-stone-300'} />
      </button>

      {/* Info */}
      <div className="flex flex-col flex-grow p-4">
        {showCollection && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-green mb-1">
            {item.collection}
          </span>
        )}
        {linkable ? (
          <Link to={item.url} className="focus:outline-none">
            <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug line-clamp-2 group-hover:text-brand-green transition-colors">
              {item.shortName}
            </h3>
          </Link>
        ) : (
          <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug line-clamp-2">
            {item.shortName}
          </h3>
        )}
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 mb-2">{item.product.tagline || 'Made to order'}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-amber-500">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={13} className="fill-current" />
            ))}
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">4.8</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">₹{item.price}</span>
          {item.mrp > item.price && (
            <span className="text-sm text-stone-400 line-through">₹{item.mrp}</span>
          )}
        </div>

        {/* Colour swatches */}
        {linkable && item.product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 mb-3">
            {item.product.colors.slice(0, 5).map((c) => (
              <Link
                key={c.id}
                to={getProductDetailUrl(item.productId, c.id)}
                title={c.name}
                aria-label={c.name}
                className={`w-5 h-5 rounded-full border transition-transform hover:scale-110 ${c.id === item.colorId ? 'border-brand-green ring-2 ring-brand-green/30' : 'border-stone-200 dark:border-stone-600'}`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {item.product.colors.length > 5 && (
              <span className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold">
                +{item.product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* MOQ / lead-time note for made-on-demand */}
        {!item.featured && (
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-3">
            Made to order · Min {item.moq} pcs · Bulk & corporate available
          </p>
        )}

        {/* CTA */}
        <div className="mt-auto">
          {item.featured ? (
            <Link
              to={`/checkout?product=${item.productId}`}
              className="w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-green dark:hover:bg-brand-green dark:hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} /> Buy Now
            </Link>
          ) : (
            <button
              type="button"
              onClick={onRequestQuote}
              className="w-full border-2 border-brand-green text-brand-green dark:text-brand-green py-2.5 rounded-xl font-bold text-sm hover:bg-brand-green hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} /> Request Quote
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogProductCard;