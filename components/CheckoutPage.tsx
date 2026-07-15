'use client';
import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from '@/lib/router';
import { MessageCircle, CreditCard, ShieldCheck, Truck, ArrowLeft, Loader2 } from 'lucide-react';
import SEO from './SEO';
import { getCatalogItem } from '../data/catalog';
import { cloudinaryTransform } from '../utils/cloudinary';
import { Order, saveOrder, orderWhatsAppUrl } from '../utils/order';
import { orderGrandTotal } from '../utils/pricing';

const CheckoutPage: React.FC = () => {
  const [params] = useSearchParams();
  const productId = params.get('product') || '';
  const item = useMemo(() => getCatalogItem(productId), [productId]);

  const [qty, setQty] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!item) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-stone-600 dark:text-stone-400 mb-6">We couldn't find that product.</p>
        <Link to="/collections" className="inline-flex items-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold px-6 py-3 rounded-full">
          Browse the collection
        </Link>
      </div>
    );
  }

  const { subtotal, shipping, gst, gstPercent, total } = orderGrandTotal(item.price, qty);
  const emailTrimmed = email.trim();

  const buildOrder = (): Order => ({
    productId: item.productId,
    productName: item.name,
    unitPrice: item.price,
    qty,
    subtotal,
    shipping,
    gst,
    gstPercent,
    total,
    name: name.trim(),
    phone: phone.trim(),
    ...(emailTrimmed ? { email: emailTrimmed } : {}),
    address: address.trim(),
    pincode: pincode.trim(),
  });

  const validate = (): string | null => {
    if (name.trim().length < 2) return 'Please enter your name.';
    if (phone.replace(/\D/g, '').length !== 10) return 'Please enter a valid 10-digit phone number.';
    if (emailTrimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      return 'Please enter a valid email, or leave it blank.';
    }
    if (address.trim().length < 8) return 'Please enter your full delivery address.';
    if (pincode.replace(/\D/g, '').length !== 6) return 'Please enter a valid 6-digit PIN code.';
    return null;
  };

  const payOnline = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/phonepe/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: item.productId,
          qty,
          name: name.trim(),
          phone: phone.trim(),
          email: emailTrimmed || undefined,
          address: address.trim(),
          pincode: pincode.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success && data.redirectUrl && data.txn) {
        saveOrder(data.txn, buildOrder());
        window.location.assign(data.redirectUrl);
        return;
      }
      console.error('[checkout] PhonePe initiate failed', res.status, data);
      // Never surface internal API messages (e.g. courier tracking) to shoppers.
      const friendly =
        typeof data.error === 'string' &&
        /phone|payment|product|phonepe|whatsapp|valid/i.test(data.error) &&
        !/docIds|trackcourier|oauth|HTTP \d/i.test(data.error)
          ? data.error
          : 'Could not start online payment. Please try WhatsApp instead.';
      setError(friendly);
    } catch (e) {
      console.error('[checkout] PhonePe initiate network error', e);
      setError('Something went wrong. Please try WhatsApp instead.');
    } finally {
      setLoading(false);
    }
  };

  const orderOnWhatsApp = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    window.open(orderWhatsAppUrl(buildOrder()), '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEO />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link to={item.url} className="inline-flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 hover:text-brand-green mb-6">
          <ArrowLeft size={16} /> Back to product
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <div className="rounded-2xl border border-stone-200 dark:border-stone-700 p-5 sm:p-6">
              <h2 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">Delivery details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Full name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    placeholder="e.g. Priya Sharma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Phone (WhatsApp)</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    inputMode="numeric"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    placeholder="10-digit number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">
                    Email <span className="font-normal text-stone-400">(optional — for invoice)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    placeholder="you@email.com"
                  />
                  <p className="mt-1 text-xs text-stone-400">We’ll email your tax invoice here after payment.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">PIN code</label>
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    inputMode="numeric"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    placeholder="6-digit PIN"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Full address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                    placeholder="House / flat, street, area, city, state"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={payOnline}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-[#5f259f] text-white font-bold py-3.5 rounded-2xl hover:opacity-95 transition-opacity disabled:opacity-60"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
                Pay Online (PhonePe)
              </button>
              <button
                type="button"
                onClick={orderOnWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-brand-green text-white font-bold py-3.5 rounded-2xl hover:opacity-95 transition-opacity"
              >
                <MessageCircle size={18} /> Order on WhatsApp
              </button>
            </div>
            <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
              Pay securely online via PhonePe (UPI, cards, wallets), or place your order on WhatsApp and we&apos;ll confirm delivery &amp; payment (COD available) with you directly.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-stone-500 dark:text-stone-400">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-brand-green" /> Secure payment
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck size={14} className="text-brand-green" /> Free shipping across India
              </span>
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-stone-200 dark:border-stone-700 p-5 sm:p-6 lg:sticky lg:top-28">
              <h2 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">Order summary</h2>
              <div className="flex gap-4">
                <img
                  src={cloudinaryTransform(item.image, { w: 160 })}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover bg-stone-100 dark:bg-stone-800"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-stone-900 dark:text-stone-100 leading-snug line-clamp-2">{item.name}</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">₹{item.price}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-stone-600 dark:text-stone-300">Quantity</span>
                <div className="inline-flex items-center rounded-full border border-stone-300 dark:border-stone-600 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-4 text-sm font-semibold text-stone-900 dark:text-stone-100">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    className="px-3 py-1.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700 space-y-2 text-sm">
                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                  <span>Taxable value</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                  <span>GST ({gstPercent}%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                  <span>Shipping</span>
                  <span className="text-brand-green font-medium">Free</span>
                </div>
                <div className="flex justify-between font-bold text-base text-stone-900 dark:text-stone-100 pt-2 border-t border-stone-100 dark:border-stone-700">
                  <span>Total payable</span>
                  <span>₹{total}</span>
                </div>
                <p className="text-[11px] text-stone-400 pt-1">
                  Prices are inclusive of GST @ {gstPercent}%. Free shipping. Tax invoice emailed after payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
