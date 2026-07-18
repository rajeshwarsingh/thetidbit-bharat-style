'use client';
import React from 'react';
import { ArrowRight, MessageCircle, Star } from 'lucide-react';
import { Link } from '@/lib/router';
import { AMAZON_STORE_URL, WHATSAPP_NUMBER } from '../constants';
import { LIFESTYLE_PROOF, PHOTO_REVIEWS } from '../data/customer-proof';
import { cloudinaryTransform } from '../utils/cloudinary';
import { REVIEWS_META } from '../lib/seo-content';
import SEO from './SEO';
import GoogleReviewsBadge from './GoogleReviewsBadge';
import WhatsAppReviewsStrip from './WhatsAppReviewsStrip';
import AmazonReviewsStrip from './AmazonReviewsStrip';
import Reveal from './Reveal';

const SECTIONS = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'amazon', label: 'Amazon' },
  { id: 'styled', label: 'Real life' },
  { id: 'notes', label: 'Notes' },
] as const;

const SectionHeading: React.FC<{
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}> = ({ eyebrow, title, description, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-green mb-2">{eyebrow}</p>
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
        {title}
      </h2>
      <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">{description}</p>
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </div>
);

const ReviewsPage: React.FC = () => {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi TheTidbit! I saw your reviews and I'd like help picking a bag."
  )}`;

  return (
    <div className="bg-white dark:bg-stone-900 min-h-screen">
      <SEO
        title={REVIEWS_META.title}
        description={REVIEWS_META.description}
        canonicalUrl="https://thetidbit.in/reviews"
        type="website"
      />

      <header className="border-b border-stone-100 dark:border-stone-800 bg-gradient-to-b from-stone-50 via-white to-white dark:from-stone-950 dark:via-stone-900 dark:to-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-green mb-3">
              Customer love
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-stone-900 dark:text-stone-100 mb-4 leading-tight">
              Loved by customers
            </h1>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              WhatsApp praise after delivery, verified Amazon reviews, Google ratings, and real photos from
              women across India.
            </p>
            <div className="flex justify-center">
              <GoogleReviewsBadge
                variant="card"
                className="w-full max-w-md text-left"
                placement="reviews_page_hero"
              />
            </div>
          </div>

          <nav
            className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2"
            aria-label="Review sections"
          >
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-brand-green hover:text-brand-green transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section id="whatsapp" className="scroll-mt-28 py-14 sm:py-20 border-b border-stone-100 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="WhatsApp"
              title="Messages after delivery"
              description="Unfiltered praise from real orders. Names and addresses are redacted for privacy."
            />
          </Reveal>
          <WhatsAppReviewsStrip layout="grid" showCaption={false} />
        </div>
      </section>

      <section
        id="amazon"
        className="scroll-mt-28 py-14 sm:py-20 bg-stone-50 dark:bg-stone-950 border-b border-stone-100 dark:border-stone-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Amazon"
              title="Verified purchases"
              description="Quality, packaging, gifting, and support — from Amazon.in verified buyers."
              action={
                <a
                  href={AMAZON_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C45500] hover:underline underline-offset-4"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'amazon_click', {
                        placement: 'reviews_page_amazon',
                        target: 'store',
                      });
                    }
                  }}
                >
                  View store <ArrowRight size={14} />
                </a>
              }
            />
          </Reveal>
          <AmazonReviewsStrip layout="grid" showCaption={false} />
        </div>
      </section>

      <section id="styled" className="scroll-mt-28 py-14 sm:py-20 border-b border-stone-100 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="In real life"
              title="Styled by customers"
              description="How TheTidbit bags show up in everyday Indian routines."
            />
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {LIFESTYLE_PROOF.map((item, index) => (
              <Reveal key={item.name} delayMs={(index % 4) * 50} className="h-full">
                <figure className="group relative h-full aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={cloudinaryTransform(item.image, { w: 600, h: 800, c: 'fill' })}
                    alt={`TheTidbit bag styled by ${item.name}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent">
                    <p className="text-white text-xs sm:text-sm font-medium leading-snug mb-1 line-clamp-3">
                      “{item.quote}”
                    </p>
                    <p className="text-white/65 text-[10px] sm:text-xs">— {item.name}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="notes" className="scroll-mt-28 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Notes"
              title="Customer notes"
              description="Short stories from women who shopped TheTidbit."
            />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {PHOTO_REVIEWS.map((review, i) => (
              <Reveal key={review.id} delayMs={(i % 2) * 60} className="h-full">
                <article className="h-full flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 sm:p-5 border border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/40">
                  <div className="sm:w-32 lg:w-36 shrink-0 aspect-[4/3] sm:aspect-square overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img
                      src={cloudinaryTransform(review.photo, { w: 400, h: 400, c: 'fill' })}
                      alt={`Photo from ${review.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={14}
                          className={j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}
                        />
                      ))}
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed mb-3 flex-1">
                      “{review.text}”
                    </p>
                    <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {review.name}
                      <span className="font-normal text-stone-500"> · {review.location}</span>
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3">Ready to carry yours?</h2>
            <p className="text-stone-300 text-sm sm:text-base mb-8 leading-relaxed">
              Browse handmade bags, or message us on WhatsApp if you want help picking a colour or style.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/collections"
                className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-7 py-3.5 font-bold hover:bg-stone-100 transition-colors"
              >
                Shop the collection <ArrowRight size={16} />
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-green text-white px-7 py-3.5 font-bold hover:opacity-95 transition-opacity"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'whatsapp_click', { placement: 'reviews_page_cta' });
                  }
                }}
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsPage;
