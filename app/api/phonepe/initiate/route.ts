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

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }

  const { productId, qty, phone } = body || {};
  const product = productId ? getCatalogById(String(productId)) : undefined;
  const quantity = Math.max(1, Math.min(20, parseInt(String(qty), 10) || 1));
  const mobile = String(phone || '').replace(/\D/g, '').slice(-10);

  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found.' }, { status: 400 });
  }
  if (mobile.length !== 10) {
    return NextResponse.json({ success: false, error: 'A valid 10-digit phone number is required.' }, { status: 400 });
  }

  // SECURITY: price + shipping from server catalog, never from the client.
  const { subtotal, shipping, total } = orderGrandTotal(product.price, quantity);
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
    console.error('[phonepe/initiate] failed', { productId, quantity, amountPaise, error: result.error });
    return NextResponse.json(
      {
        success: false,
        error: 'Could not start online payment. Please try WhatsApp instead.',
        detail: result.error,
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
  });
}
