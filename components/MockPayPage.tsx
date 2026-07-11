'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from '@/lib/router';
import { ShieldCheck, Smartphone } from 'lucide-react';
import { loadOrder, Order } from '../utils/order';

/**
 * Simulated PhonePe checkout screen (TEST MODE only). Renders when the store
 * has no live PhonePe credentials, so the full purchase flow is demonstrable.
 * Replace with real PhonePe by setting credentials in .env.local.
 */
const MockPayPage: React.FC = () => {
  const [params] = useSearchParams();
  const txn = params.get('txn') || '';
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => { setOrder(loadOrder(txn)); }, [txn]);

  const finish = (result: 'COMPLETED' | 'FAILED') => {
    window.location.href = `/order/status?txn=${encodeURIComponent(txn)}&sim=${result}`;
  };

  const amount = order?.total ?? 0;

  return (
    <div className="min-h-[80vh] bg-stone-100 dark:bg-stone-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="bg-[#5f259f] text-white rounded-t-3xl p-5 text-center">
          <div className="inline-flex items-center gap-2 font-bold text-lg">
            <Smartphone size={20} /> PhonePe
          </div>
          <p className="text-[11px] text-white/70 mt-1 uppercase tracking-wider">Test / Sandbox Mode</p>
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
            This is a simulated payment. No money will be charged. Add live PhonePe credentials to enable real payments.
          </div>

          <button onClick={() => finish('COMPLETED')} className="w-full bg-[#5f259f] text-white font-bold py-3.5 rounded-xl hover:opacity-95 transition-opacity">
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
