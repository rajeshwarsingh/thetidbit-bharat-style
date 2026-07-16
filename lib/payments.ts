/**
 * Payment provider dispatcher — SERVER ONLY.
 * ------------------------------------------------------------------
 * PAYMENT_PROVIDER=razorpay | phonepe  (default: razorpay)
 *
 * Razorpay is the default gateway. Set PAYMENT_PROVIDER=phonepe to use
 * the existing PhonePe integration instead.
 *
 * Both providers fall back to built-in TEST MODE (mock pay screen) when
 * live credentials are missing.
 * ------------------------------------------------------------------
 */
import * as phonepe from './phonepe';
import * as razorpay from './razorpay';

export type PaymentProvider = 'razorpay' | 'phonepe';

const raw = (process.env.PAYMENT_PROVIDER || 'razorpay').toLowerCase().trim();
export const paymentProvider: PaymentProvider = raw === 'phonepe' ? 'phonepe' : 'razorpay';

export type { InitiateArgs, InitiateResult, StatusResult } from './razorpay';

export interface PaymentMeta {
  provider: PaymentProvider;
  /** 'live' | 'mock' — whether real gateway credentials are active */
  mode: 'live' | 'mock';
  label: string;
}

export function getPaymentMeta(): PaymentMeta {
  if (paymentProvider === 'phonepe') {
    return {
      provider: 'phonepe',
      mode: phonepe.phonePeMode === 'mock' ? 'mock' : 'live',
      label: 'PhonePe',
    };
  }
  return {
    provider: 'razorpay',
    mode: razorpay.razorpayMode === 'mock' ? 'mock' : 'live',
    label: 'Razorpay',
  };
}

/** True when payments run against the simulated pay screen (no live creds). */
export function isMockPayment(): boolean {
  return getPaymentMeta().mode === 'mock';
}

export function initiatePayment(args: razorpay.InitiateArgs): Promise<razorpay.InitiateResult> {
  return paymentProvider === 'phonepe' ? phonepe.initiatePayment(args) : razorpay.initiatePayment(args);
}

export function checkStatus(txn: string): Promise<razorpay.StatusResult> {
  return paymentProvider === 'phonepe' ? phonepe.checkStatus(txn) : razorpay.checkStatus(txn);
}

export function verifyRazorpayPayment(args: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): boolean {
  return razorpay.verifyPaymentSignature(args);
}
