/**
 * Razorpay Payment Gateway — SERVER ONLY.
 * ------------------------------------------------------------------
 * Credentials (Dashboard → Account & Settings → API Keys):
 *   RAZORPAY_KEY_ID      — public key (rzp_test_… / rzp_live_…)
 *   RAZORPAY_KEY_SECRET  — secret key (never exposed to the client)
 *
 * Optional:
 *   RAZORPAY_WEBHOOK_SECRET — for future webhook verification
 *
 * When KEY_ID + KEY_SECRET are missing → TEST MODE (mock pay screen).
 * ------------------------------------------------------------------
 */
import { createHmac } from 'crypto';

const KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

export const razorpayConfigured = Boolean(KEY_ID && KEY_SECRET);
export const razorpayMode: 'live' | 'mock' = razorpayConfigured ? 'live' : 'mock';

/** Public key id — safe to send to the browser for Checkout.js */
export const razorpayKeyId = KEY_ID;

const API = 'https://api.razorpay.com/v1';

export interface InitiateArgs {
  merchantTransactionId: string;
  amountPaise: number;
  mobile: string;
  redirectUrl: string;
  callbackUrl: string;
  /** Customer name for Checkout prefill */
  name?: string;
  email?: string;
}

export interface InitiateResult {
  success: boolean;
  /** PhonePe / mock full-page redirect */
  redirectUrl?: string;
  /** Razorpay Checkout.js — open modal with these fields */
  razorpayOrderId?: string;
  razorpayKeyId?: string;
  amountPaise?: number;
  currency?: string;
  error?: string;
}

export interface StatusResult {
  state: 'COMPLETED' | 'FAILED' | 'PENDING' | 'UNKNOWN';
  code?: string;
  amountPaise?: number;
}

function authHeader() {
  return 'Basic ' + Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64');
}

async function createOrder(args: InitiateArgs): Promise<InitiateResult> {
  try {
    const res = await fetch(`${API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader(),
      },
      body: JSON.stringify({
        amount: args.amountPaise,
        currency: 'INR',
        receipt: args.merchantTransactionId.slice(0, 40),
        notes: {
          txn: args.merchantTransactionId,
          mobile: args.mobile,
        },
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (data?.id) {
      return {
        success: true,
        razorpayOrderId: data.id,
        razorpayKeyId: KEY_ID,
        amountPaise: args.amountPaise,
        currency: 'INR',
      };
    }
    const detail = data?.error?.description || data?.error?.code || `HTTP ${res.status}`;
    console.error('[Razorpay create order failed]', { detail, data });
    return { success: false, error: `Razorpay order failed: ${detail}` };
  } catch (e: any) {
    return { success: false, error: `Razorpay network error: ${String(e?.message ?? e)}` };
  }
}

/**
 * Look up order by our merchant receipt (txn id).
 * Order statuses: created | attempted | paid
 */
async function statusByReceipt(txn: string): Promise<StatusResult> {
  try {
    const url = `${API}/orders?receipt=${encodeURIComponent(txn)}&count=1`;
    const res = await fetch(url, { headers: { Authorization: authHeader() } });
    const data = await res.json().catch(() => ({}));
    const order = data?.items?.[0];
    if (!order) return { state: 'UNKNOWN' };

    if (order.status === 'paid') {
      return { state: 'COMPLETED', amountPaise: order.amount };
    }
    if (order.status === 'attempted' || order.status === 'created') {
      // Also check payments on the order for captured/failed
      const payRes = await fetch(`${API}/orders/${order.id}/payments`, {
        headers: { Authorization: authHeader() },
      });
      const payData = await payRes.json().catch(() => ({}));
      const payments: any[] = payData?.items || [];
      if (payments.some((p) => p.status === 'captured' || p.status === 'authorized')) {
        return { state: 'COMPLETED', amountPaise: order.amount };
      }
      if (payments.some((p) => p.status === 'failed')) {
        return { state: 'FAILED', amountPaise: order.amount };
      }
      return { state: 'PENDING', amountPaise: order.amount };
    }
    return { state: 'UNKNOWN', amountPaise: order.amount };
  } catch {
    return { state: 'UNKNOWN' };
  }
}

/** HMAC-SHA256(order_id|payment_id) must match razorpay_signature */
export function verifyPaymentSignature(args: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): boolean {
  if (!KEY_SECRET) return false;
  const body = `${args.razorpayOrderId}|${args.razorpayPaymentId}`;
  const expected = createHmac('sha256', KEY_SECRET).update(body).digest('hex');
  return expected === args.razorpaySignature;
}

export function initiatePayment(args: InitiateArgs): Promise<InitiateResult> {
  return createOrder(args);
}

export function checkStatus(txn: string): Promise<StatusResult> {
  return statusByReceipt(txn);
}
