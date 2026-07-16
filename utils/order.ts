/**
 * Client-side order helpers. The store has no cart/DB — orders are placed via
 * online payment (Razorpay / PhonePe) or WhatsApp. This builds the order
 * summary, the WhatsApp message, and stashes the order in localStorage so the
 * post-payment status page can show a summary and let the customer confirm.
 */
import { WHATSAPP_NUMBER } from '../constants';
import { GST_PERCENT } from './pricing';

export interface Order {
  productId: string;
  productName: string;
  unitPrice: number;
  qty: number;
  subtotal: number;
  shipping: number;
  gst: number;
  gstPercent: number;
  total: number;
  name: string;
  phone: string;
  /** Optional — if set, customer also gets the tax invoice email after payment. */
  email?: string;
  address: string;
  pincode: string;
}

const STORAGE_PREFIX = 'tidbit_order_';

export function saveOrder(txn: string, order: Order) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_PREFIX + txn, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function loadOrder(txn: string): Order | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + txn);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

/** WhatsApp message for placing/confirming an order. */
export function orderWhatsAppUrl(order: Order, opts?: { paid?: boolean; txn?: string }): string {
  const gstPct = order.gstPercent ?? GST_PERCENT;
  const lines = [
    opts?.paid
      ? `Hi TheTidbit! I've *paid online* for my order. Please confirm & dispatch.`
      : `Hi TheTidbit! I'd like to place this order:`,
    ``,
    `*${order.productName}*`,
    `Qty: ${order.qty}`,
    `Taxable value: ₹${order.subtotal ?? Math.max(0, order.total - (order.gst ?? 0))}`,
    `GST (${gstPct}%): ₹${order.gst ?? 0}`,
    `Shipping: Free`,
    `*Total: ₹${order.total}*`,
    opts?.txn ? `Payment Ref: ${opts.txn}` : '',
    opts?.paid ? `Status: PAID ✅` : '',
    ``,
    `*Deliver to:*`,
    `${order.name}`,
    `${order.phone}`,
    order.email ? `${order.email}` : '',
    `${order.address}`,
    `PIN: ${order.pincode}`,
  ].filter(Boolean);
  const message = lines.join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
