'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from '@/lib/router';
import { CheckCircle2, XCircle, Loader2, MessageCircle } from 'lucide-react';
import { loadOrder, orderWhatsAppUrl, Order } from '../utils/order';

type State = 'loading' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'UNKNOWN';

const OrderStatusPage: React.FC = () => {
  const [params] = useSearchParams();
  const txn = params.get('txn') || '';
  const [state, setState] = useState<State>('loading');
  const [order, setOrder] = useState<Order | null>(null);

  const sim = params.get('sim');

  useEffect(() => {
    setOrder(loadOrder(txn));
    if (!txn) { setState('UNKNOWN'); return; }
    // TEST MODE: honour the simulated result from the mock pay screen.
    if (sim === 'COMPLETED' || sim === 'FAILED') { setState(sim); return; }
    let active = true;
    fetch(`/api/payment/status?txn=${encodeURIComponent(txn)}`)
      .then((r) => r.json())
      .then((d) => { if (active) setState((d.state as State) || 'UNKNOWN'); })
      .catch(() => { if (active) setState('UNKNOWN'); });
    return () => { active = false; };
  }, [txn, sim]);

  // Auto-email the order to the merchant once, on confirmed payment.
  const notifiedRef = useRef(false);
  useEffect(() => {
    if (state === 'COMPLETED' && order && txn && !notifiedRef.current) {
      notifiedRef.current = true;
      fetch('/api/order/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txn, order }),
      }).catch(() => {});
    }
  }, [state, order, txn]);

  const paid = state === 'COMPLETED';
  const failed = state === 'FAILED';

  return (
    <div className="max-w-lg mx-auto px-4 py-16 sm:py-24 text-center">
      {state === 'loading' && (
        <>
          <Loader2 size={40} className="mx-auto text-brand-green animate-spin mb-5" />
          <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">Confirming your payment…</h1>
        </>
      )}

      {paid && (
        <>
          <CheckCircle2 size={56} className="mx-auto text-emerald-500 mb-5" />
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">Payment successful 🎉</h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Thank you{order ? `, ${order.name.split(' ')[0]}` : ''}! Your order is confirmed.
            {txn && <> Payment ref: <span className="font-mono text-sm">{txn}</span>.</>}
            {order?.email ? <> Tax invoice sent to <span className="font-medium">{order.email}</span>.</> : <> Add an email on checkout next time to receive your tax invoice.</>}
          </p>
          {order && (
            <div className="mt-6 text-left rounded-2xl border border-stone-200 dark:border-stone-700 p-5 space-y-2">
              <p className="font-semibold text-stone-900 dark:text-stone-100">{order.productName}</p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Qty {order.qty}</p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-700 space-y-1.5 text-sm">
                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                  <span>Taxable value</span>
                  <span>₹{order.subtotal ?? Math.max(0, order.total - (order.gst ?? 0))}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                  <span>GST ({order.gstPercent ?? 5}%)</span>
                  <span>₹{order.gst ?? 0}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                  <span>Shipping</span>
                  <span className="text-brand-green font-medium">Free</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 dark:text-stone-100 pt-1">
                  <span>Total paid</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400 pt-2">{order.address}, PIN {order.pincode}</p>
            </div>
          )}
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            {order && (
              <a href={orderWhatsAppUrl(order, { paid: true, txn })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-brand-green text-white font-bold px-6 py-3 rounded-full hover:opacity-95">
                <MessageCircle size={18} /> Share order on WhatsApp
              </a>
            )}
            <Link to="/collections" className="inline-flex items-center justify-center gap-2 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 font-bold px-6 py-3 rounded-full hover:border-brand-green">
              Continue shopping
            </Link>
          </div>
          <p className="mt-4 text-xs text-stone-400">Sharing your order on WhatsApp helps us dispatch faster.</p>
        </>
      )}

      {(failed || state === 'UNKNOWN') && (
        <>
          <XCircle size={56} className="mx-auto text-red-500 mb-5" />
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">Payment not completed</h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400">Your payment didn't go through. You can try again or order on WhatsApp.</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            {order && (
              <a href={orderWhatsAppUrl(order, { txn })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-brand-green text-white font-bold px-6 py-3 rounded-full hover:opacity-95">
                <MessageCircle size={18} /> Order on WhatsApp
              </a>
            )}
            <Link to={order ? `/checkout?product=${order.productId}` : '/collections'} className="inline-flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold px-6 py-3 rounded-full">
              Try again
            </Link>
          </div>
        </>
      )}

      {state === 'PENDING' && (
        <>
          <Loader2 size={40} className="mx-auto text-amber-500 animate-spin mb-5" />
          <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">Payment pending</h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400">This can take a moment. Refresh this page shortly, or order on WhatsApp.</p>
          {order && (
            <a href={orderWhatsAppUrl(order, { txn })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 mt-6 bg-brand-green text-white font-bold px-6 py-3 rounded-full">
              <MessageCircle size={18} /> Order on WhatsApp
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default OrderStatusPage;
