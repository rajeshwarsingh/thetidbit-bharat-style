/**
 * Central WhatsApp message builders.
 * The store has no cart/checkout — every purchase, quote and bulk enquiry
 * is routed through WhatsApp. Keep all message copy here so tone stays consistent.
 */
import { WHATSAPP_NUMBER } from '../constants';
import { CatalogItem } from '../types';

const BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

function toUrl(message: string): string {
  return `${BASE}?text=${encodeURIComponent(message)}`;
}

function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('event', event, data);
  }
}

/** Standard "Buy Now" for an in-stock retail item. */
export function buyNowUrl(item: Pick<CatalogItem, 'shortName' | 'price'>): string {
  const message =
    `Hi TheTidbit, I'd like to order:\n${item.shortName}` +
    `\n\nPrice: ₹${item.price}` +
    `\n\nPlease help me place the order.`;
  return toUrl(message);
}

/** Request Quote for a made-on-demand / bulk item. */
export function requestQuoteUrl(item: Pick<CatalogItem, 'shortName' | 'moq'>): string {
  const message =
    `Hi TheTidbit, I'd like a bulk quote for:\n${item.shortName}` +
    `\n\nApprox quantity: ${item.moq ?? 5}+ pcs` +
    `\nPlease share pricing, lead time and customisation options.`;
  return toUrl(message);
}

/** General bulk / corporate enquiry (from the Bulk Orders section). */
export function bulkInquiryUrl(context?: string): string {
  const message =
    `Hi TheTidbit, I'm interested in a bulk / corporate order.` +
    (context ? `\n\nRegarding: ${context}` : '') +
    `\n\nPlease share MOQ, bulk pricing, branding options and lead time.`;
  return toUrl(message);
}

/** General enquiry / contact. */
export function contactUrl(context?: string): string {
  const message = `Hi TheTidbit,` + (context ? ` ${context}` : ' I have a question.');
  return toUrl(message);
}

/** Open a WhatsApp link in a new tab and fire an analytics event. */
export function openWhatsApp(url: string, event = 'whatsapp_click', data: Record<string, unknown> = {}) {
  track(event, data);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
