import { NextRequest, NextResponse } from 'next/server';
import { sendOrderEmail, OrderPayload } from '../../../../lib/email';
import { checkStatus, phonePeMode } from '../../../../lib/phonepe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  const { txn, order } = body || {};
  if (!txn || !order?.productName || !order?.name || !order?.address) {
    return NextResponse.json({ ok: false, error: 'invalid_order' }, { status: 400 });
  }

  // In LIVE mode, only email once PhonePe confirms the payment (prevents spoofed
  // order emails). In TEST mode, the simulated flow is trusted.
  if (phonePeMode !== 'mock') {
    const status = await checkStatus(String(txn));
    if (status.state !== 'COMPLETED') {
      return NextResponse.json({ ok: false, error: 'payment_not_confirmed' }, { status: 402 });
    }
  }

  const payload: OrderPayload = {
    productName: String(order.productName),
    qty: Number(order.qty) || 1,
    total: Number(order.total) || 0,
    name: String(order.name),
    phone: String(order.phone || ''),
    email: String(order.email || '').trim() || undefined,
    address: String(order.address),
    pincode: String(order.pincode || ''),
  };

  const result = await sendOrderEmail(payload, String(txn), true);
  return NextResponse.json(result, { status: result.ok ? 200 : 200 });
}
