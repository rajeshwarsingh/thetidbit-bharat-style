import { NextRequest, NextResponse } from 'next/server';
import { paymentProvider, verifyRazorpayPayment, checkStatus } from '../../../../lib/payments';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Verify Razorpay Checkout.js payment signature after the modal succeeds.
 * Client then redirects to /order/status?txn=…
 */
export async function POST(req: NextRequest) {
  if (paymentProvider !== 'razorpay') {
    return NextResponse.json({ ok: false, error: 'not_razorpay' }, { status: 400 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_request' }, { status: 400 });
  }

  const txn = String(body?.txn || '');
  const razorpayOrderId = String(body?.razorpay_order_id || '');
  const razorpayPaymentId = String(body?.razorpay_payment_id || '');
  const razorpaySignature = String(body?.razorpay_signature || '');

  if (!txn || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  const valid = verifyRazorpayPayment({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  });

  if (!valid) {
    console.error('[payment/verify] bad signature', { txn, razorpayOrderId });
    return NextResponse.json({ ok: false, error: 'invalid_signature' }, { status: 400 });
  }

  // Best-effort status check (signature alone is proof of payment).
  const status = await checkStatus(txn).catch(() => ({ state: 'UNKNOWN' as const }));

  return NextResponse.json({
    ok: true,
    txn,
    paymentId: razorpayPaymentId,
    state: status.state === 'FAILED' ? 'FAILED' : 'COMPLETED',
  });
}
