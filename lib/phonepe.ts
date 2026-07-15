/**
 * PhonePe Payment Gateway — SERVER ONLY.
 * ------------------------------------------------------------------
 * Supports BOTH PhonePe integrations, chosen automatically by which
 * credentials you provide (see .env.local.example):
 *
 *   • Standard Checkout v2 (OAuth)  ← current PhonePe Business default
 *       PHONEPE_CLIENT_ID, PHONEPE_CLIENT_SECRET, PHONEPE_CLIENT_VERSION
 *
 *   • Legacy PG v1 (X-VERIFY salt)  ← older salt-key merchants
 *       PHONEPE_MERCHANT_ID, PHONEPE_SALT_KEY, PHONEPE_SALT_INDEX
 *
 * PHONEPE_ENV=sandbox | production (default sandbox).
 * The salt key / client secret NEVER leaves the server (this module is
 * imported only by route handlers).
 * ------------------------------------------------------------------
 */
import { createHash } from 'crypto';

const ENV = process.env.PHONEPE_ENV || 'sandbox';
const IS_PROD = ENV === 'production';

// v2 credentials take priority when present.
const CLIENT_ID = process.env.PHONEPE_CLIENT_ID || '';
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || '';
const CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || '1';
const USE_V2 = Boolean(CLIENT_ID && CLIENT_SECRET);

// v1 (salt) — sandbox defaults to PhonePe's public UAT merchant.
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT';
const SALT_KEY = process.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';

const V1_HOST = IS_PROD
  ? 'https://api.phonepe.com/apis/hermes'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox';
const V2_BASE = IS_PROD ? 'https://api.phonepe.com/apis/pg' : 'https://api-preprod.phonepe.com/apis/pg-sandbox';
const V2_AUTH = IS_PROD
  ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

const HAS_V1_CREDS = Boolean(process.env.PHONEPE_MERCHANT_ID && process.env.PHONEPE_SALT_KEY);

/**
 * Active payment mode:
 *   'v2'   → real PhonePe Standard Checkout (client id/secret configured)
 *   'v1'   → real PhonePe legacy PG (merchant id + salt configured)
 *   'mock' → built-in TEST mode: simulates the PhonePe pay screen so the whole
 *            checkout flow works without live credentials. Auto-disabled the
 *            moment real credentials are provided.
 */
export const phonePeMode: 'v2' | 'v1' | 'mock' = USE_V2 ? 'v2' : HAS_V1_CREDS ? 'v1' : 'mock';

/** Always true now — mock mode is always usable. */
export const phonePeConfigured = true;

export interface InitiateArgs {
  merchantTransactionId: string;
  amountPaise: number;
  mobile: string;
  redirectUrl: string;
  callbackUrl: string;
}
export interface InitiateResult {
  success: boolean;
  redirectUrl?: string;
  error?: string;
}
export interface StatusResult {
  state: 'COMPLETED' | 'FAILED' | 'PENDING' | 'UNKNOWN';
  code?: string;
  amountPaise?: number;
}

/* ───────────────────────── v2 (OAuth) ───────────────────────── */

let cachedToken: { token: string; expiresAt: number } | null = null;

async function v2Token(): Promise<{ token: string } | { error: string }> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt - 60 > now) return { token: cachedToken.token };
  try {
    const res = await fetch(V2_AUTH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_version: CLIENT_VERSION,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (data?.access_token) {
      cachedToken = { token: data.access_token, expiresAt: data.expires_at || now + 3000 };
      return { token: data.access_token };
    }
    const detail = data?.message || data?.code || `HTTP ${res.status}`;
    console.error('[PhonePe OAuth failed]', { env: ENV, url: V2_AUTH, detail, code: data?.code });
    return {
      error: `PhonePe auth failed (${ENV}): ${detail}. If this is a UAT client, set PHONEPE_ENV=sandbox.`,
    };
  } catch (e: any) {
    return { error: `PhonePe auth network error: ${String(e?.message ?? e)}` };
  }
}

async function v2Initiate(args: InitiateArgs): Promise<InitiateResult> {
  const auth = await v2Token();
  if ('error' in auth) return { success: false, error: auth.error };
  const token = auth.token;
  try {
    const res = await fetch(`${V2_BASE}/checkout/v2/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `O-Bearer ${token}` },
      body: JSON.stringify({
        merchantOrderId: args.merchantTransactionId,
        amount: args.amountPaise,
        expireAfter: 1200,
        paymentFlow: {
          type: 'PG_CHECKOUT',
          message: 'TheTidbit order',
          merchantUrls: { redirectUrl: args.redirectUrl },
        },
      }),
    });
    const data = await res.json();
    if (data?.redirectUrl) return { success: true, redirectUrl: data.redirectUrl };
    return { success: false, error: data?.message || data?.code || 'Payment could not be initiated.' };
  } catch (e: any) {
    return { success: false, error: String(e?.message ?? e) };
  }
}

async function v2Status(orderId: string): Promise<StatusResult> {
  const auth = await v2Token();
  if ('error' in auth) return { state: 'UNKNOWN' };
  try {
    const res = await fetch(`${V2_BASE}/checkout/v2/order/${orderId}/status`, {
      headers: { Authorization: `O-Bearer ${auth.token}` },
    });
    const data = await res.json();
    return { state: (data?.state as StatusResult['state']) || 'UNKNOWN', amountPaise: data?.amount };
  } catch {
    return { state: 'UNKNOWN' };
  }
}

/* ───────────────────────── v1 (X-VERIFY) ───────────────────────── */

function sha256(input: string) {
  return createHash('sha256').update(input).digest('hex');
}
function xVerify(payloadBase64: string, path: string) {
  return `${sha256(payloadBase64 + path + SALT_KEY)}###${SALT_INDEX}`;
}

async function v1Initiate(args: InitiateArgs): Promise<InitiateResult> {
  const payload = {
    merchantId: MERCHANT_ID,
    merchantTransactionId: args.merchantTransactionId,
    merchantUserId: `USER_${args.merchantTransactionId}`.slice(0, 36),
    amount: args.amountPaise,
    redirectUrl: args.redirectUrl,
    redirectMode: 'REDIRECT',
    callbackUrl: args.callbackUrl,
    mobileNumber: args.mobile,
    paymentInstrument: { type: 'PAY_PAGE' },
  };
  const base64 = Buffer.from(JSON.stringify(payload)).toString('base64');
  const checksum = xVerify(base64, '/pg/v1/pay');
  try {
    const res = await fetch(`${V1_HOST}/pg/v1/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', accept: 'application/json', 'X-VERIFY': checksum },
      body: JSON.stringify({ request: base64 }),
    });
    const data = await res.json();
    const url = data?.data?.instrumentResponse?.redirectInfo?.url;
    if (data?.success && url) return { success: true, redirectUrl: url };
    return { success: false, error: data?.message || 'Payment could not be initiated.' };
  } catch (e: any) {
    return { success: false, error: String(e?.message ?? e) };
  }
}

async function v1Status(txn: string): Promise<StatusResult> {
  const path = `/pg/v1/status/${MERCHANT_ID}/${txn}`;
  const checksum = xVerify('', path);
  try {
    const res = await fetch(`${V1_HOST}${path}`, {
      headers: { 'Content-Type': 'application/json', accept: 'application/json', 'X-VERIFY': checksum, 'X-MERCHANT-ID': MERCHANT_ID },
    });
    const data = await res.json();
    return { state: (data?.data?.state as StatusResult['state']) || 'UNKNOWN', code: data?.code, amountPaise: data?.data?.amount };
  } catch {
    return { state: 'UNKNOWN' };
  }
}

/* ───────────────────────── dispatch ───────────────────────── */

export function initiatePayment(args: InitiateArgs): Promise<InitiateResult> {
  return USE_V2 ? v2Initiate(args) : v1Initiate(args);
}
export function checkStatus(txn: string): Promise<StatusResult> {
  return USE_V2 ? v2Status(txn) : v1Status(txn);
}
