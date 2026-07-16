'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from '@/lib/router';
import { ShieldCheck, CreditCard } from 'lucide-react';
import { loadOrder, Order } from '../utils/order';

/**
 * Simulated payment screen (TEST MODE only). Renders when the active gateway
 * has no live credentials, so the full purchase flow is demonstrable.
 * Add Razorpay or PhonePe credentials in .env.local to enable real payments.
 */
const MockPayPage: React.FC = () => {
  const [params] = useSearchParams();
  const txn = params.get('txn') || '';
  const [order, setOrder] = useState<Order | null>(null);
  const [label, setLabel] = useState('Razorpay');

  useEffect(() => {
    setOrder(loadOrder(txn));
    fetch('/api/payment/config')
      .then((r) => r.json())
      .then((d) => {
        if (d?.label) setLabel(String(d.label));
      })
      .catch(() => {});
  }, [txn]);

  const finish = (result: 'COMPLETED' | 'FAILED') => {
    window.location.href = `/order/status?txn=${encodeURIComponent(txn)}&sim=${result}`;
  };

  const amount = order?.total ?? 0;
  const isPhonePe = label === 'PhonePe';
  const accent = isPhonePe ? 'bg-[#5f259f]' : 'bg-stone-900 dark:bg-stone-100 dark:text-stone-900';

  return (
    <div className="min-h-[80vh] bg-stone-100 dark:bg-stone-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className={`${isPhonePe ? 'bg-[#5f259f] text-white' : 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'} rounded-t-3xl p-5 text-center`}>
          <div className="inline-flex items-center gap-2 font-bold text-lg">
            <CreditCard size={20} /> {label}
          </div>
          <p className={`text-[11px] mt-1 uppercase tracking-wider ${isPhonePe ? 'text-white/70' : 'text-white/70 dark:text-stone-500'}`}>
            Test / Sandbox Mode
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 rounded-b-3xl shadow-xl p-6">
          <p className="text-center text-sm text-stone-500 dark:text-stone-400">Paying to</p>
          <p className="text-center font-bold text-stone-900 dark:text-stone-100">TheTidbit</p>

          <div className="my-5 text-center">
            <p className="text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">₹{amount}</p>
            {order && <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">{order.productName}</p>}
            <p className="text-[11px] text-stone-400 mt-1">Txn: {txn}</p>
          </div>

          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 px-3 py-2 text-[11px] text-amber-700 dark:text-amber-400 text-center mb-5">
            This is a simulated payment. No money will be charged. Add live {label} credentials to enable real payments.
          </div>

          <button onClick={() => finish('COMPLETED')} className={`w-full text-white font-bold py-3.5 rounded-xl hover:opacity-95 transition-opacity ${accent}`}>
            Pay ₹{amount} (Success)
          </button>
          <button onClick={() => finish('FAILED')} className="w-full mt-3 border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 font-semibold py-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
            Simulate failure / cancel
          </button>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
            <ShieldCheck size={13} /> 100% Secure Payments (simulated)
          </p>
        </div>
      </div>
    </div>
  );
};

export default MockPayPage;
