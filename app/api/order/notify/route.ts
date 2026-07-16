import { NextRequest, NextResponse } from 'next/server';
import { sendOrderEmail, OrderPayload } from '../../../../lib/email';
import { checkStatus, isMockPayment } from '../../../../lib/payments';
import { getCatalogById } from '../../../../data/catalogs';
import { orderGrandTotal, GST_PERCENT } from '../../../../utils/pricing';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  const { txn, order } = body || {};
  if (!txn || !order?.productName || !order?.name || !order?.address) {
    return NextResponse.json({ ok: false, error: 'invalid_order' }, { status: 400 });
  }

  // In LIVE mode, only email once the gateway confirms payment (prevents spoofed
  // order emails). In TEST mode, the simulated flow is trusted.
  if (!isMockPayment()) {
    const status = await checkStatus(String(txn));
    if (status.state !== 'COMPLETED') {
      return NextResponse.json({ ok: false, error: 'payment_not_confirmed' }, { status: 402 });
    }
  }

  const qty = Number(order.qty) || 1;
  const product = order.productId ? getCatalogById(String(order.productId)) : undefined;
  const unitPrice = product?.price ?? (Number(order.unitPrice) || 0);
  const pricing = unitPrice > 0
    ? orderGrandTotal(unitPrice, qty)
    : {
        subtotal: Number(order.subtotal) || 0,
        shipping: Number(order.shipping) || 0,
        gst: Number(order.gst) || 0,
        gstPercent: Number(order.gstPercent) || GST_PERCENT,
        total: Number(order.total) || 0,
        taxable: 0,
      };

  const payload: OrderPayload = {
    productId: String(order.productId || ''),
    productName: String(order.productName),
    unitPrice,
    qty,
    subtotal: pricing.subtotal,
    shipping: pricing.shipping,
    gst: pricing.gst,
    gstPercent: pricing.gstPercent,
    total: pricing.total,
    name: String(order.name),
    phone: String(order.phone || ''),
    email: String(order.email || '').trim() || undefined,
    address: String(order.address),
    pincode: String(order.pincode || ''),
  };

  const result = await sendOrderEmail(payload, String(txn), true);
  return NextResponse.json(result, { status: 200 });
}
