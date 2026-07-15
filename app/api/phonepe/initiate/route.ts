import { NextRequest, NextResponse } from 'next/server';
import { initiatePayment, phonePeMode } from '../../../../lib/phonepe';
import { getCatalogById } from '../../../../data/catalogs';
import { orderGrandTotal } from '../../../../utils/pricing';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function txnId() {
  const rand = Math.random().toString(36).slice(2, 8);
  return `TT${Date.now().toString(36)}${rand}`.slice(0, 34).toUpperCase();
}

/** Temporary deploy probe — remove once Vercel env is confirmed. */
function envProbe() {
  const mask = (v: string | undefined) => {
    if (!v) return '(missing)';
    if (v.length <= 6) return `${v} (len=${v.length})`;
    return `${v.slice(0, 4)}…${v.slice(-4)} (len=${v.length})`;
  };
  return {
    PHONEPE_ENV: process.env.PHONEPE_ENV ?? '(missing → defaults to sandbox)',
    PHONEPE_CLIENT_ID: mask(process.env.PHONEPE_CLIENT_ID),
    PHONEPE_CLIENT_SECRET: mask(process.env.PHONEPE_CLIENT_SECRET),
    PHONEPE_CLIENT_VERSION: process.env.PHONEPE_CLIENT_VERSION ?? '(missing)',
    PHONEPE_MERCHANT_ID: mask(process.env.PHONEPE_MERCHANT_ID),
    RESEND_API_KEY: mask(process.env.RESEND_API_KEY),
    ORDER_NOTIFY_EMAIL: process.env.ORDER_NOTIFY_EMAIL ?? '(missing)',
    ORDER_FROM_EMAIL: process.env.ORDER_FROM_EMAIL ?? '(missing)',
    phonePeMode,
  };
}

export async function POST(req: NextRequest) {
  const probe = envProbe();
  console.log('[phonepe/initiate] env probe', probe);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.', envProbe: probe }, { status: 400 });
  }

  const { productId, qty, phone } = body || {};
  const product = productId ? getCatalogById(String(productId)) : undefined;
  const quantity = Math.max(1, Math.min(20, parseInt(String(qty), 10) || 1));
  const mobile = String(phone || '').replace(/\D/g, '').slice(-10);

  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found.', envProbe: probe }, { status: 400 });
  }
  if (mobile.length !== 10) {
    return NextResponse.json({ success: false, error: 'A valid 10-digit phone number is required.', envProbe: probe }, { status: 400 });
  }

  // SECURITY: price + shipping + GST from server catalog, never from the client.
  const { subtotal, shipping, gst, gstPercent, total } = orderGrandTotal(product.price, quantity);
  const amountPaise = total * 100;
  const txn = txnId();
  const origin = req.nextUrl.origin;

  if (phonePeMode === 'mock') {
    return NextResponse.json({
      success: true,
      txn,
      mock: true,
      redirectUrl: `${origin}/order/pay?txn=${txn}`,
      amount: total,
      subtotal,
      shipping,
      gst,
      gstPercent,
      envProbe: probe,
    });
  }

  const result = await initiatePayment({
    merchantTransactionId: txn,
    amountPaise,
    mobile,
    redirectUrl: `${origin}/order/status?txn=${txn}`,
    callbackUrl: `${origin}/api/phonepe/status?txn=${txn}`,
  });

  if (!result.success || !result.redirectUrl) {
    console.error('[phonepe/initiate] failed', { productId, quantity, amountPaise, error: result.error, envProbe: probe });
    return NextResponse.json(
      {
        success: false,
        error: 'Could not start online payment. Please try WhatsApp instead.',
        detail: result.error,
        envProbe: probe,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    txn,
    redirectUrl: result.redirectUrl,
    amount: total,
    subtotal,
    shipping,
    gst,
    gstPercent,
    envProbe: probe,
  });
}
